/*
 * @Author: Aaron
 * @Date: 2022-04-18 09:05:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-23 15:00:25
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\index.tsx
 */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import Banner from './components/Banner'
import Tab from './components/Tab'
import CardList from './components/CardList'
import Expand from './components/Expand'
import { Box } from 'rebass'
import { getPublicBannerList, getTreasureHuntListApi } from 'api/treasureHunt'
import { useChain, useLoading, useAccount } from 'state/global/hooks'
import { useTranslation } from 'react-i18next'
import picBanner from '../../assets/images/farm-banner.png'
const Wapper = styled.div`
  margin-top: 88px;
  position: relative;
  width: 100%;
  ${isMobile && `margin-top:77pxx`}
`
export default function TreasureHunt() {
  const history = useHistory()
  const chain_id = useChain()
  const [, setLoading] = useLoading()
  const { i18n }: { i18n: any } = useTranslation()
  const account = useAccount()
  let params = {
    chain_id,
    page: 1,
    pageSize: 10,
    sortBy: 'createdTime',
    sortDirection: 'DESC',
    queryType: "started",
    keyword: '',
    address: ''
  }

  // 获取寻宝列表
  const [treasureList, setTreasureList] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const getgetTreasureHuntList = async () => {
    setLoading(true)
    try {
      params.keyword = keyword
      params.queryType = activeIndex
      params.address = account ?? ''
      let res: any = await getTreasureHuntListApi(params)
      if (!res.hasOwnProperty('status')) {
        setTreasureList(res.result)
        setTotal(res.total)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  // 激活tab
  const [activeIndex, setActiveIndex] = useState<string>('started')
  const tabClickHandler = (e: string) => {
    setActiveIndex(e)
  }

  // 点击卡片
  const cardItemClick = (e: any) => {
    history.push(`/treasureHunt/detail/${e}`)
  }

  // 搜索框
  const [keyword, setKeyword] = useState<string>('')
  const inputChnage = (e: string) => {
    setKeyword(e)
  }

  // 获取列表数据
  useEffect(() => {
    getgetTreasureHuntList()
    document.documentElement.scrollTop = 0
  }, [activeIndex])

  // 输入框回车
  const inputKeyDown = (e: any) => {
    if (e.keyCode == 13) {
      getgetTreasureHuntList()
    }
  }

  // 点击页码
  const changePage = (e: number) => {
    params.page = e
    getgetTreasureHuntList()
  }

  // 点击搜索按钮
  const searchClick = () => {
    getgetTreasureHuntList()
  }

  // 初始化默认轮播图数据
  const initBannerList = [
    {
      imagePath: picBanner,
      title: {
        ch: '虚拟标题',
        en: '虚拟标题',
      },
      description: {
        ch: '虚拟说明',
        en: '虚拟说明',
      },
    },
  ]

  // 获取轮播图
  const [bannerList, setBannerList] = useState<any>([])
  useEffect(() => {
    ;(async () => {
      let agentMode = isMobile ? 'phone' : 'pc'
      let languageType = i18n.language == 'en' ? 'en' : 'ch'
      let res: any = await getPublicBannerList({
        chain_id,
        agentMode,
        languageType,
      })
      if (res.result.length > 0) {
        setBannerList(res.result)
      } else {
        setBannerList(initBannerList)
      }
    })()
  }, [])

  // 点击轮播
  const bannerClick = (e: string) => {
    window.open(e)
  }

  // 渲染
  return (
    <Wapper>
      <Banner bannerList={bannerList} bannerClick={bannerClick}></Banner>
      <Box width="100%" backgroundColor="#ECF1F9" padding={isMobile ? '30px 0' : '60px 0'}>
        <div style={{ paddingBottom: '23px' }}>
          <Tab
            tabClickHandler={tabClickHandler}
            active={activeIndex}
            inputChnage={inputChnage}
            inputKeyDown={inputKeyDown}
            searchClick={searchClick}
          ></Tab>
        </div>
        <CardList data={treasureList} cardItemClick={cardItemClick}></CardList>
        <Expand></Expand>
      </Box>
    </Wapper>
  )
}
