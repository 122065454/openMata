import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { AppState } from '../index'
import { updateLoading, updateNav, updateAccount } from './actions'
import { connect } from 'utils/publicErc20'
// 链接钱包
export function useConnect () {
  const dispatch = useDispatch()
  connect().then(address => {
    console.log(address)
    dispatch(updateAccount({account: address[0]}))
  }).catch((err: any) => {
    dispatch(updateAccount({account: ''}))
  })
}
// 获取钱包账户
export function useAccount(): string | undefined {
  const account = useSelector((state: AppState) => state.global.account)
  return account
}
// 获取链id
export function useChain(): number | null {
  const chainid = useSelector((state: AppState) => state.global.chainid)
  // console.log(chainid)
  return chainid
}
// 全局loading
export function useLoading(): [boolean, (loading: boolean) => void] {
  const dispatch = useDispatch()

  const loading = useSelector((state: AppState) => state.global.loading)
  const update = useCallback(
    (loading: boolean) => {
      dispatch(updateLoading({ loading }))
    },[dispatch])
  return [loading, update]
}

// 获取nav展示状态
export function useShowNav(): [boolean, (loading: boolean) => void] {
  const dispatch = useDispatch()

  const showNav = useSelector((state: AppState) => state.global.showNav)
  const update = useCallback(
    (showNav: boolean) => {
      dispatch(updateNav({ showNav }))
    },[dispatch])
  return [showNav, update]

}
