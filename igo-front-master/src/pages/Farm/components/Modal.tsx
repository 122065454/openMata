import React, { useEffect, useState } from 'react'
import { Text, Flex, Link } from 'rebass'
import styled, { keyframes } from 'styled-components'
// import { request } from 'utils/request'
import  service  from 'utils/request'

import Select from './Select'

import { getNftArray, getUserNftAmount, onDeposit, onWithdrawNft } from 'utils/contractNftMining'
import { useAccount, useChain } from 'state/global/hooks'
import { getApproveAll, getNftInfo, onApproveAll } from 'utils/contractNft'
import { GET_NFT_INFO_ACTION } from 'data/api'
import { useTranslation } from 'react-i18next'
import notifiy from 'components/Notification'
import { HASH_URL } from '../../../constants'
import NftInfo from './NftInfo'
import Numbers from './Numbers'
import CheckAll from './CheckAll'

export const fadeBigInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`
const Wrapper = styled.div`
  padding: 0 30px;
`
const Button = styled.div<{color?: string, border?: boolean, disabled?: boolean}>`
  width: 100%;
  height: 60px;
  display: flex;
  color: ${({color}) => color ? color : '#fff'};
  background-color: ${({disabled}) => disabled ? '#B8BFCC' : '#566FFE'};
  border-radius: 30px;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 30px;
  align-items: center;
  border: ${({border}) => border && '1px solid #EDEFF2'};
  cursor: pointer;
`
const rotate = keyframes`
  0%{ transform: rotate(0deg) }
  100%{ transform: rotate(360deg) }
`
const Loading = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 8px;
  border-right-color: transparent;
  margin-left: 10px;
  animation: ${rotate} 1000ms linear infinite;
`

export default function ModalDeposit ({
  reset,
  isActive,
  modalType,
  nftPoolCode,
  CONTRACT_ADDRESS
} : {
  reset: () => void
  /**
   * modalType: 0---取消质押nft  1---质押nft   2-----查看
   */
  isActive: boolean
  modalType: number
  nftPoolCode: string
  CONTRACT_ADDRESS: string
}) {
  const account = useAccount()
  const { t } = useTranslation()
  const chainid = useChain()

  const [loading, setLoading] = useState(false)
  const [isApprove, setApprove] = useState(false)
  // 全选
  const [checked, setChecked] = useState(false)
  // 选择的nft id
  const [tokens, setTokens] = useState<string []>([])
  // 选中的nft类型等级
  const [nftType, setNftType] = useState('n')
  const [list, setList] = useState<any>({
    n: [],
    r: [],
    sr: [],
    ssr: []
  })
  const [{ probability, rarity, efficiency }, setNftInfo] = useState({
    rarity: '--',
    efficiency: 0,
    probability: 0
  })

  // 初始化
  const init = async() => {
    if (!account) return
    // 查询是否授权
    getApproveAll(account, CONTRACT_ADDRESS).then((isApprove: boolean) => {
      setApprove(isApprove)
    })

    let nftList: any = []
    const depositedList =  await getUserNftAmount(account, CONTRACT_ADDRESS)
    const userAllNftList = await getNftArray(account, CONTRACT_ADDRESS)

    if (modalType === 0 || modalType === 2) {
      nftList = depositedList
    } else if(modalType === 1) {
      userAllNftList.map((id: any) => {
        let isRepeat = false
        depositedList.map((tokenId: any) => {
          if (id.eq(tokenId)) {
            isRepeat = true
          }
        })
        if (!isRepeat) {
          nftList.push(id)
        }
      })
    }
    console.log('nftList-----', nftList)

    const promiseList = nftList.map(async (tokenid: any) => {
      const result = await getNftInfo(tokenid)
      console.log(result)
      // const nftJson: any = await request(result,'','get')
      const nftJson: any = await service(result)
      const nftInfo = {
        id: tokenid,
        images: nftJson.image,
        name: nftJson?.properties?.name.description,
        level: nftJson?.properties?.attributes.description,
      }
      return nftInfo

    })
    Promise.all(promiseList).then((data: any) => {
      console.log('data---', data)
      const nList: any = []
      const rList: any = []
      const srList: any = []
      const ssrList: any = []

      data.map((item: any) => {
        if (item.level === 'N') {
          nList.push(item)
        }
        if(item.level === 'R') {
          rList.push(item)
        }
        if(item.level === 'SR') {
          srList.push(item)
        }
        if(item.level === 'SSR') {
          ssrList.push(item)
        }
      })

      setList({
        n: nList,
        r: rList,
        sr: srList,
        ssr: ssrList
      })
    }).catch((err: any) => {
      console.log('err---', err)
    })
  }
  // 质押
  const handleDeposit = () => {
    onDeposit(tokens, CONTRACT_ADDRESS).then((data: any) => {
      setLoading(true)
      // 质押回调
      data.wait().then((result: any) => {
        setLoading(false)
        notifiy({
          type: 'success',
          message: t('depositSuccess'),
          description: <Link href={HASH_URL + result.transactionHash} target='_blank'>{t('checkHash')}</Link>
        })
        reset()
      }).catch((err: any) => {
        setLoading(false)
        notifiy({
          type: 'fail',
          message: t('depositFail'),
          description: <Link href={HASH_URL + err.transactionHash} target='_blank'>{t('checkHash')}</Link>
        })
        console.log('err----', err)
      })
    }).catch((err: any) => {
      setLoading(false)
      console.log('err---', err)
    })
  }
  // 发起授权
  const handleApprove = () => {
    onApproveAll(CONTRACT_ADDRESS).then((data: any) => {
      console.log('appreov----', data)
      setLoading(true)
      // 授权回调
      data.wait().then((data: any) => {
        setLoading(false)
        setApprove(true)
      }).catch((err: any) => {
        setLoading(false)
        console.log('err----', err)
      })
    }).catch((err: any) => {
      setLoading(false)
      console.log('err----', err)
    })
  }

  const handleConfirm = () => {
    if(isApprove) {
      if(tokens.length <= 0) return
      handleDeposit()
    } else {
      handleApprove()
    }
  }
  // 取消质押
  const handleCancel = () => {
    if(tokens.length <= 0) return
    onWithdrawNft(tokens, CONTRACT_ADDRESS).then((data: any) => {
      setLoading(true)
      // 取消质押回调
      data.wait().then((data: any) => {
        setLoading(false)
        notifiy({
          type: 'success',
          message: t('extractSuccess'),
          description: <Link href={HASH_URL + data.transactionHash} target='_blank'>{t('checkHash')}</Link>
        })
        reset()
      }).catch((err: any) => {
        setLoading(false)
        notifiy({
          type: 'fail',
          message: t('extractFail'),
          description: <Link href={HASH_URL + err.transactionHash} target='_blank'>{t('checkHash')}</Link>
        })
        console.log('err----', err)
      })
    }).catch((err: any) => {
      setLoading(false)
      console.log('err----', err)
    })
  }
  const handleType = () => {
    console.log('tokens------', tokens)
    if(loading) return

    if(modalType === 0) {
      handleCancel()
    } else {
      handleConfirm()
    }
  }
  const ajaxNftInfo = () => {
    GET_NFT_INFO_ACTION({
      chain_id: chainid || 56,
      nftPoolCode,
      tokenIds: list[nftType][0]?.id?.toString(),
      accountAddress: account || ''
    }).then((data: any) => {
      const { probability, rarity, efficiency } = data.result[0]
      setNftInfo({
        probability,
        rarity,
        efficiency
      })
    })
  }

  useEffect(() => {
    nftPoolCode && list[nftType][0] && ajaxNftInfo()
  }, [nftPoolCode, list, chainid, nftType])

  useEffect(() => {
    account && init()
  }, [account])

  return (
    <Wrapper>
      <Text marginY='20px' color='#183B56' fontSize='18px' textAlign='center' fontWeight='bold'>{modalType === 0 ? t('modalHead2') : t('modalHead1')}</Text>
      <Select list={list} nftType={nftType} setNftType={setNftType}></Select>
      <NftInfo list={list} rarity={rarity} probability={probability} efficiency={efficiency} nftType={nftType}></NftInfo>
      <Numbers modalType={modalType} checked={checked} list={list} nftType={nftType} setTokens={setTokens}></Numbers>

      <CheckAll list={list} checked={checked} setChecked={setChecked} nftPoolCode={nftPoolCode} setTokens={setTokens}></CheckAll>

      {(isActive || modalType === 0) && <Flex mt={'24px'} justifyContent='center'>
        <Button onClick={handleType} disabled={isApprove && tokens.length ===0 }>
          <Text>{isApprove ? t('confirm') : t('approve')}</Text>
          {loading && <Loading />}
        </Button>
      </Flex>}
      {/* <Text margin='20px 0' textAlign='center'>{t('noNft')}</Text> */}
    </Wrapper>
  )
}