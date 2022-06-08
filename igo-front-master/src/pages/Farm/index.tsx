import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from 'rebass'
import { isMobile } from 'react-device-detect'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Selection from './components/Selection'
import Card from './components/Card'
import { useAccount, useChain, useLoading, useShowNav } from 'state/global/hooks'
import { GET_POOL_LIST_ACTION } from 'data/api'
import banner from '../../assets/images/farm-banner.png'
import H5banner from '../../assets/images/farm-banner-h5.png'
import Empty from 'components/Empty'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ECF1F9;
`
const Banner = styled.div`
  position: relative;
  margin-top: 88px;
  width: 100%;
  height: 400px;
  background-color: #000;
  >img{
    width: 100%;
    height: 100%;
  }
  ${isMobile && `
    margin-top: 77px;
    height: 240px;
  `}
`
const Container = styled.div`
  width: 1200px;
  margin: auto;
  ${isMobile && `
    width: 100%;
    padding: 0 16px;
  `}
`
const Content = styled.div`
  position: absolute;
  top: 67px;
  left: 35%;
  font-size: 56px;
  color: #fff;
  font-weight: bold;
  ${isMobile && `
    top: 30px;
    left: 15%;
    font-size: 28px;
  `}
`

export default function Farm() {
  const { t } = useTranslation()
  const account = useAccount()
  const chainid = useChain()

  const [, updateLoading] = useLoading()
  const [, setShowNav] = useShowNav()

  const [list, setList] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)
  const [keyword, setKeyword] = useState('')

  const init = () => {
    updateLoading(true)
    console.log(isActive)
    console.log(chainid)
    GET_POOL_LIST_ACTION({
      chain_id: chainid || 56,
      isActive,
      keyword,
      isPrivate,
      accountAddress: account
    }).then((data: any) => {
      console.log(data)
      updateLoading(false)
      setList(data.result)
    }).catch((err: any) => {
      console.log('err----', err)
      updateLoading(false)
    })
  }
  
  const item = list.map((item: any, index: number) => {
    return (
      <Card key={index} data={item} initList={init} isActive={isActive}></Card>
    )
  })
  useEffect(() => {
    setShowNav(true)
  }, [])

  useEffect(() => {
    init()
  }, [account, isActive, keyword, isPrivate, chainid])
  return (
    <Wrapper>
      <Banner>
        <Content>
          <Text>{t('farmTitle1')}</Text>
          <Text>{t('farmTitle2')}</Text>
        </Content>
        <Image src={isMobile ? H5banner : banner}></Image>
      </Banner>
      <Container>
        <Selection setIsPrivate={setIsPrivate} isActive={isActive} setIsActive={setIsActive} setKeyword={setKeyword}></Selection>
        <Flex flexWrap='wrap' mr='-30px'>
          {item}
          {list.length === 0 && <Empty></Empty>}
        </Flex>
      </Container>
    </Wrapper>
  )
}