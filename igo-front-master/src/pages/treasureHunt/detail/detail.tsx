/*
 * @Author: Aaron
 * @Date: 2022-04-18 15:28:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-23 15:21:36
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\detail\detail.tsx
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Button, Box, Image, Text, Flex, Link } from 'rebass'
import { useTranslation } from 'react-i18next'
import CheckLogo from '../images/Check@2x.png'
import arrow from '../images/指向icon@2x.png'
import link from '../images/link@2x.png'
import desc from '../images/desc@2x.png'
import { useHistory } from 'react-router-dom'
import { getNftAirdropIdApi, receiveNftAirdropApi } from 'api/treasureHunt'
import { useAccount, useChain, useLoading } from 'state/global/hooks'
import {
  isConnect,
  getSign,
  getContract,
  connect,
  onAccountChange,
} from 'utils/publicErc20'
import { formatTimeStamp, formatTextEllipsis } from 'utils/format'
import { updateAccount, updateSelectChain } from 'state/global/actions'
import { useDispatch } from 'react-redux'
import ActivityFactory from '../../../constants/abis/ActivityFactory .json'
import { BSCURL, HecoContractAddr, BscContractAddr, HECOURL } from '../../../constants/'
import { message } from 'antd'
import Empty from '../../../components/Empty/index'
import Banner from './components/Banner'

const Wapper = styled.div`
  margin-top: 88px;
  position: relative;
  width: 100%;
  background-color: #ecf1f9;
  padding: 40px 0 60px 0;
  min-height: 55vh;
  ${isMobile &&
  `margin-top:77px;
    padding:unset;
  `};
`

const ContainerStyle = styled.div`
  margin: 0 auto;
  @media screen and (min-width: 576px) {
    max-width: 540px;
  }
  @media screen and (min-width: 768px) {
    max-width: 720px;
  }
  @media screen and (min-width: 992px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
  @media screen and (min-width: 1400px) {
    max-width: 1320px;
  }
  @media screen and (min-width: 1480px) {
    max-width: 1400px;
  }

  ${isMobile &&
  `margin:unset;
`};
`

const FlexBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 0;
  @media screen and (max-width: 900px) {
    display: block;
    .change {
      width: 100% !important;
    }
  }
  ${isMobile &&
  `display:block;
  margin:unset;
  `};
`

const BaseBox = styled.div`
  ${isMobile &&
  `
  display:flex;
  `}
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

interface Ibtn {
  text?: string
  zh?: string
  id?: string
  bgColor?: string
  color?: string
}

const ChainIdMapping = [
  {
    name: 'BSC',
    chainId: 56,
    url: BSCURL,
  },
  {
    name: 'HECO',
    chainId: 128,
    url: HECOURL,
  },
]

const colorBtnList = {
  switchNetwork: {
    text: 'switchNetwork',
    zh: '切换网络',
    id: '1',
    bgColor: '#566FFE',
    color: '#fff',
  },
  connectWallet: {
    text: 'connectWallet',
    zh: '连接钱包',
    id: '2',
    bgColor: '#566FFE',
    color: '#fff',
  },
  claimEnded: {
    text: 'claimEnded',
    zh: '領取已結束',
    id: '3',
    bgColor: '#B8BFCC',
    color: '#fff',
  },
  uneligible: {
    text: 'uneligible',
    zh: '无领取资格',
    id: '4',
    bgColor: '#B8BFCC',
    color: '#fff',
  },
  claimed: {
    text: 'claimed',
    zh: '已领取',
    id: '5',
    bgColor: '#B8BFCC',
    color: '#fff',
  },
  claim: {
    text: 'claim',
    zh: '领取',
    id: '6',
    bgColor: 'linear-gradient(180deg, #3FB6FD 0%, #4381FE 41%, #DB74FF 100%)',
    color: '#fff',
  },
  noStart: {
    text: 'nonClaimable',
    zh: '未開啟領取',
    id: '7',
    bgColor: '#B8BFCC',
    color: '#fff',
  },
  claiming: {
    text: 'claiming',
    zh: '领取中',
    id: '8',
    bgColor: '#B8BFCC',
    color: '#fff',
  },
}

export default function Detail(props: any) {
  const [, setLoading] = useLoading()
  const history = useHistory()
  const [detailStatus, setDetailStatus] = useState<boolean>(false)
  const { id } = props.match.params
  const [detail, setDetail] = useState<any>({})
  const chainId: any = useChain()
  const { t }: { t: Function } = useTranslation()
  const dispatch = useDispatch()
  const contractAddr = chainId == 56 ? BscContractAddr : HecoContractAddr
  const account = useAccount()

  // 监听切换账户重新获取数据
  useEffect(() => {
    onAccountChange((account: string) => {
      if (account) {
        getTreasureDetail()
      }
    })
  }, [])

  useEffect(() => {
    getTreasureDetail()
  },[account])

  // 获取空投详情
  const getTreasureDetail = async () => {
    try {
      setLoading(true)
      let res: any = await getNftAirdropIdApi({
        id,
        chain_id: chainId,
        address: account
      })
        setLoading(false)

      if (res.chainId) {
        setCurrentAddrHandler()
        setDetail(res)
        if (res.linkUrl) {
          let linkArr = splitStrToList(res.linkUrl)
          setLinkList(linkArr)
        }
        if (account) {
          let isClaimed = await isGetClaimed(res.activitySN)
          // 判断是否已领取
          if (isClaimed) {
            setCurrentStatus(colorBtnList.claimed)
          } else {
            currentButton(res)
          }
        } else {
          setCurrentStatus(colorBtnList.connectWallet)
        }
      }
    } catch (error) {
      console.log('解析错误', error)
      setLoading(false)
      setDetailStatus(true)
    }
    document.documentElement.scrollTop = 0
  }

  // 切割字符串
  const [linkList, setLinkList] = useState<string[]>([])
  const splitStrToList = (str: string): any => {
    const reg = /\n/g
    const result = str.replace(reg, 'split')
    let arr = result.split('split')
    let list: string[] = []
    arr.forEach(item => {
      list.push(item.trim())
    })
    return list
  }

  // 获取用户是否已经领取过活动
  const isGetClaimed = async (_activitySN: string) => {
    let contract = await getContract(contractAddr, ActivityFactory)
    return await contract.claimedUsers(_activitySN, account)
  }

  // 领取空投
  const receiveNftAirdrop = async () => {
    try {
      setLoading(true)
      let time = new Date().getTime().toString()
      let signInfo = {
        chainId,
        organizerId: detail.organizerId,
        nftAirdropId: id,
        nonce: time,
      }
      // 签名
      let sign = await getSign(JSON.stringify(signInfo))
      let params = {
        chain_id: chainId as number,
        sign,
        nftAirdropId: id,
        nonce: time,
        address: account
      }
      let res = await receiveNftAirdropApi(params)
      let contract = await getContract(contractAddr, ActivityFactory)
      let _activitySN = res.data.activitySN
      let _signature = res.data.signature
      let result = await contract.claim(_activitySN, _signature)
      await result.wait(1)
      if (result.hash) {
        let isClaimed = await isGetClaimed(_activitySN)
        if (isClaimed) {
          setLoading(false)
          message.success(t('ReceivedSuccessfully'))
          setCurrentStatus(colorBtnList.claimed)
        }
      }
    } catch (error) {
      setLoading(false)
      console.log('报错了', error)
    }
  }

  // 初始化数据
  useEffect(() => {
    getTreasureDetail()
  }, [])

  // 按钮点击
  const btnClickHandler = async (e: any) => {
    // 切换网络
    if (e.text == 'switchNetwork') {
      dispatch(updateSelectChain({ showSelectChaind: true }))
    }
    // 连接钱包
    else if (e.text == 'connectWallet') {
      try {
        let address = await connect()
        await dispatch(updateAccount({ account: address[0] }))
        // getTreasureDetail()
      } catch (error) {
        dispatch(updateAccount({ account: '' }))
      }
    }
    // 领取
    else if (e.text == 'claim') {
      receiveNftAirdrop()
    }
  }

  // 设置当前地址
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const setCurrentAddrHandler = async () => {
    ChainIdMapping.forEach(item => {
      if (item.chainId == chainId) {
        setCurrentUrl(item.url)
      }
    })
  }

  // 设置当前按钮状态
  const [currentStatus, setCurrentStatus] = useState<Ibtn>({})
  const currentButton = async (e: any) => {
    const isConn = await isConnect()
    const currentTime = new Date().getTime()
    let contract = await getContract(contractAddr, ActivityFactory)
    let activeData = await contract.activites(e.activitySN)
    let max = activeData.maximum.toNumber()
    let min = activeData.claimed.toNumber()
    let startTime: number = 0
    let endTime: number = 0
    if (e.receiveStartTime) {
      startTime = new Date(e.receiveStartTime).getTime()
      endTime = new Date(e.receiveEndTime).getTime()
    } else {
      startTime = new Date(e.startTime).getTime()
      endTime = new Date(e.endTime).getTime()
    }

    // 网络错误
    if (chainId && chainId !== ChainIdMapping[0].chainId && chainId !== ChainIdMapping[1].chainId) {
      setCurrentStatus(colorBtnList.switchNetwork)
    }
    // 网络正确
    else {
      // 钱包已经连接
      if (isConn) {
        // 领取已结束
        if (currentTime > endTime || (max > 0 && min == max)) {
          setCurrentStatus(colorBtnList.claimEnded)
        } else {
          // 无资格领取
          if (e.userStatus == 'noPermission') {
            setCurrentStatus(colorBtnList.uneligible)
          }
          // 有资格未领取
          else if (
            (e.userStatus == 'unReceive' &&
              max == 0 &&
              e.chainStatus == 2 &&
              currentTime > startTime &&
              currentTime < endTime) ||
            (e.userStatus == 'unReceive' &&
              e.chainStatus == 2 &&
              max > 0 &&
              min <= max &&
              currentTime > startTime &&
              currentTime < endTime)
          ) {
            setCurrentStatus(colorBtnList.claim)
          }
          // 有资格未领取但是未到时间
          else if (e.userStatus == 'unReceive' && e.chainStatus == 2 && currentTime < startTime) {
            setCurrentStatus(colorBtnList.noStart)
          } else if (e.userStatus == 'receiving') {
            setCurrentStatus(colorBtnList.claim)
          } else {
            setCurrentStatus(colorBtnList.uneligible)
          }
        }
      }
      // 钱包未连接
      else {
        setCurrentStatus(colorBtnList.connectWallet)
      }
    }
  }

  // 点击地址跳转对应的官网
  const navigaToUrl = (e: string) => {
    let url = currentUrl + e
    window.open(url)
  }

  // 跳转参考链接
  const navigaToRefLink = (e: string) => {
    window.open(e)
  }

  // 渲染
  return (
    <Wapper>
      {!detailStatus ? (
        <ContainerStyle>
          {!isMobile && (
            <Button
              onClick={() => {
                history.goBack()
              }}
              color="#183B56"
              backgroundColor="#fff"
              style={{ borderRadius: '17px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {t('back')}
            </Button>
          )}
          <FlexBoxStyle>
            <Box style={{ marginRight: !isMobile ? '80px' : '' }}>
              <Banner bannerList={detail.showImages}></Banner>
            </Box>
            <Box
              className="change"
              style={{
                flex: 2,
                width: isMobile ? '100%' : '700px',
                padding: isMobile ? '16px' : '',
              }}
            >
              <Text
                style={{
                  fontSize: isMobile ? '22px' : '40px',
                  color: '#183B56',
                  fontWeight: 'bold',
                }}
              >
                {detail.title}
              </Text>
              <Text style={{ fontSize: '14px', color: '#6F7D95' }}>{detail.description}</Text>
              <Box
                style={{
                  display: isMobile ? 'block' : 'flex',
                  padding: isMobile ? '16px' : '30px 50px',
                  margin: isMobile ? '20px 0' : '50px 0',
                  justifyContent: 'space-between',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  fontSize: isMobile ? '12px' : '',
                }}
              >
                <BaseBox>
                  <Text style={{ padding: '10px' }}>{t('organizer')}</Text>
                  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div
                      style={{
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <img width="100%" height="100%" src={detail.logoImage}></img>
                    </div>
                    <div style={{ margin: '0 3px' }}>{detail.organizerName}</div>
                    <div style={{ width: '16px', height: '16px', display: 'flex' }}>
                      <Image width="100%" height="100%" src={CheckLogo}></Image>
                    </div>
                  </Box>
                </BaseBox>
                <BaseBox>
                  <Text style={{ padding: '10px' }}>{t('claimTime')}</Text>
                  {detail.receiveMode == 1 && (
                    <Box>
                      {formatTimeStamp(detail.startTime)} - {formatTimeStamp(detail.endTime)}
                    </Box>
                  )}
                  {detail.receiveMode == 0 && (
                    <Box>
                      {formatTimeStamp(detail.receiveStartTime)} -{' '}
                      {formatTimeStamp(detail.receiveEndTime)}
                    </Box>
                  )}
                </BaseBox>
                <BaseBox>
                  <Text style={{ padding: '10px' }}>{t('contractAddr')}</Text>
                  {detail.seriesContractAddress ? (
                    <Box
                      color="#566FFE"
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigaToUrl(detail.seriesContractAddress)}
                    >
                      {detail.seriesContractAddress &&
                        formatTextEllipsis(detail.seriesContractAddress)}{' '}
                      <Image style={{ width: '14px' }} src={arrow}></Image>
                    </Box>
                  ) : (
                    t('toBeUpdated')
                  )}
                </BaseBox>
              </Box>
              <Box>
                <Text
                  style={{
                    color: '#183B56',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    marginBottom: '12px',
                  }}
                >
                  {t('claimInstructions')}
                </Text>
                <Text style={{ marginBottom: '50px', color: '#6F7D95' }}>
                  {detail.receiveDescription && detail.receiveDescription}
                </Text>
              </Box>
              <Box style={{ display: 'unset' }}>
                <Box>
                  <Button
                    onClick={() => btnClickHandler(currentStatus)}
                    style={{
                      margin: isMobile ? '0 auto' : 'unset',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      width: '280px',
                      height: '60px',
                      background: currentStatus.bgColor,
                      color: currentStatus.color,
                      display: isMobile ? 'block' : 'unset',
                    }}
                  >
                    {t(currentStatus.text)}
                  </Button>
                </Box>
                <Box
                  style={{
                    width: '280px',
                    textAlign: 'center',
                    margin: isMobile ? '0 auto' : 'unset',
                  }}
                >
                  {currentStatus.zh == '已领取' && (
                    <div
                      style={{
                        color: '#566580',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      onClick={() => navigaToRefLink(`https://nft.openmeta.finance/#/importnft/${id}`)}
                    >
                      {t('receivedNFT')}
                    </div>
                  )}
                </Box>
              </Box>
            </Box>
          </FlexBoxStyle>
          <Box
            style={{
              padding: isMobile ? '16px' : 'unset',
            }}
          >
            <Box style={{ marginBottom: '30px' }}>
              <Flex>
                <Image
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={desc}
                ></Image>
                <Text style={{ color: '#183B56', fontSize: '18px' }}>{t('briefOfTasks')}</Text>
              </Flex>
              <Box style={{ color: '#6F7D95', fontSize: '14px' }}>
                <div dangerouslySetInnerHTML={{ __html: detail.taskDescription }}></div>
              </Box>
            </Box>
            {linkList.length > 0 && (
              <Box>
                <Flex>
                  <Image
                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
                    src={link}
                  ></Image>
                  <Text style={{ color: '#183B56', fontSize: '18px' }}>{t('referenceURL')}</Text>
                </Flex>
                {linkList.length &&
                  linkList.map((item: string) => {
                    return (
                      <div
                        key={item}
                        style={{
                          fontSize: '15px',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          color: '#1890ff'
                        }}
                        onClick={() => navigaToRefLink(item)}
                      >
                        {item}
                      </div>
                    )
                  })}
              </Box>
            )}
          </Box>
        </ContainerStyle>
      ) : (
        <Empty></Empty>
      )}
    </Wapper>
  )
}
