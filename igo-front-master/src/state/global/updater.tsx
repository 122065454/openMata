import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { connect, getChainId, onAccountChange, onChainChanged } from 'utils/publicErc20'
import { AppDispatch } from '../index'
import { updateAccount, updateChainId } from './actions'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const pathName = history.location.pathname

  useEffect(() => {

    if (pathName !== '/primary') {
      connect().then(address => {
        // 连接上钱包之后会拿到一个地址
        dispatch(updateAccount({ account: address[0] }))
      }).catch((err: any) => {
        dispatch(updateAccount({account: ''}))
      })
    }
    getChainId().then((chainid: any) => {
      const chain = parseInt(chainid, 16)
      dispatch(updateChainId({chainid: chain}))
    })
    // 切换账户
    onAccountChange((account: string) => {
      dispatch(updateAccount({account: account[0]}))
    })
    // 切换链事件
    onChainChanged((chainId: string) => {
      const chain = parseInt(chainId, 16)
      dispatch(updateChainId({chainid: chain}))
      window.location.reload()
    })
  }, [dispatch])

  return null
}
