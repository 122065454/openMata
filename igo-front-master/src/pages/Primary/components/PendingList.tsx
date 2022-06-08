import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from 'rebass'
import styled from 'styled-components'
import { Statistic } from 'antd'
import { isMobile } from 'react-device-detect'

import checkIcon from '../images/check.svg'
import whiteListIcon from '../images/whitelist.svg'
import timeIcon from '../images/time.svg'
import { GET_PRIMARY_LIST_ACTION, GET_USER_WHITELIST_ACTION } from 'data/api'
import { useAccount, useChain } from 'state/global/hooks'

import listData from '../pending.mock.json'
import { useTranslation } from 'react-i18next'
import { OPENMETA_RL, TOKEN_ICON } from 'constants/index'
import Empty from 'components/Empty'

const Wrapper = styled.div`
  width: 1215px;
  margin: 0 auto;
  ${isMobile && `
    width: 100%;
    padding: 0 16px;
  `}
`

const Card = styled.div`
  position: relative;
  padding: 12px;
  margin-right: 15px;
  margin-bottom: 25px;
  background-color: #fff;
  box-shadow: 0px 5px 30px 0px rgba(86, 111, 254, 0.2);
  border-radius: 20px;
  cursor: pointer;
  ${isMobile && `
    margin: 0 auto 25px auto;
    box-shadow: none;
  `}
`
const Tips = styled.div`
  display: flex;
  align-items: center;
`

export default function PendingList() {
  const chainid = useChain()
  const { t } = useTranslation()
  const [list, setList] = useState<any>([])
  const [whitelist, setWhitelist] = useState([])
  const account = useAccount()

  // const init = async() => {
  //   GET_USER_WHITELIST_ACTION({
  //     account,
  //     chain_id: chainid
  //   }).then((data: any) => {
  //     if(data.code === 0) {
  //       setWhitelist(data.result)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   account && init()
  // }, [account])

  useEffect(() => {
    chainid && GET_PRIMARY_LIST_ACTION({
      chain_id: chainid,
      queryType: 'started'
    }).then((data: any) => {
      setList(data.result)
      // setList(listData.result)
    })
  }, [chainid])
  // 匹配购买盲盒合约
  const datalist = list.filter((dataItem: { contractAddress: string })  => dataItem.contractAddress.toLowerCase() != '0x08c17d1ed58e3aae7277d0273f59f17e08e508f2')
  console.log({datalist, list})
  return(
    <React.Fragment>
      {
        datalist?.length > 0 && <Wrapper>
        <Text mt={isMobile ? '30px' : '60px'} mb={isMobile ? '16px' : '45px'} fontSize={isMobile ? '20px' : '26px'} fontWeight='bold' color='#183B56'>{t('inProgress')}</Text>
        <Flex flexWrap='wrap'>
          {datalist.map((item: any, index: number) => <ItemList key={index} data={item} hasWhitelist={whitelist[item.contractAddress] > 0 || !item.isWhiteList }></ItemList>)}
          {datalist.length <=0 && <Empty></Empty>}
        </Flex>
      </Wrapper>
      }
    </React.Fragment>
    
  )
}

const ItemList = ({
  data,
  hasWhitelist
} : {
  data: any
  hasWhitelist: boolean
}) => {
  const { Countdown } = Statistic
  const chainid = useChain()

  const { t, i18n } = useTranslation()
  // @ts-ignore
  const lang = i18n.language === 'zh-CN' ? 'ch' : 'en'

  const isStart = Date.now() > data.startTime ? true : false

  const handleClick = (address: string) => {
    // if (!hasWhitelist) return
    // @ts-ignore
    window.open(OPENMETA_RL + `#/blind-detail/${chainid}/${address}` + `?lang=${i18n.language}`)
  }
  const handleRule = (ch: string, en: string, event: any) => {
    event.stopPropagation()
    if (lang === 'ch') {
      window.open(ch)
    } else {
      window.open(en)
    }
  }
  return (
    <Card onClick={() => handleClick(data.contractAddress)}>
      <Image src={data.cardImage.replace('storageapi', 'storageapi2')} width={isMobile ? '311px' : '264px'} height={isMobile ? '311px' : '264px'} style={{borderRadius: '10px'}}/>
      <Flex width='264px' mt='15px' alignItems='center'>
        <Image src={data.blindBoxLogoImage.replace('storageapi', 'storageapi2')} size='30px' style={{borderRadius: '15px'}}></Image>
        <Text flex='1' ml='8px' mr='5px' color='#183B56' fontWeight='bold' fontSize='16px'>{data.title[lang]}</Text>
        <Image src={checkIcon} size='20px'></Image>
      </Flex>
      {
        data.whiteListDescription[lang] && <Text width='264px' fontSize='12px' mt='5px'>{data.whiteListDescription[lang]}</Text>
      }
      <Flex mt='10px' alignItems='center' justifyContent='space-between'>
        <Tips className='Tips'>
          <Image src={timeIcon} mr='5px' size='14px'/>
          <Flex>
            {!isStart ? <Text mr='4px' fontWeight='bold' color="#566FFE" fontSize='14px'>{t('startSelling')}</Text> : <Text mr='4px' color='#566FFE' fontSize='14px'>{t('sellEnding')}</Text>}
            <Countdown valueStyle={{fontSize: '14px', color:"#566FFE", fontWeight: 'bold', whiteSpace: 'pre'}} value={isStart ? data.endTime : data.startTime} format="HH : mm : ss"></Countdown>
          </Flex>
        </Tips>
        <Tips>
          <Text fontSize='16px' mr='6px' color='#183B56' fontWeight='bold'>{data.salePrice} {data.tokenName}</Text>
          <Image src={TOKEN_ICON + data.tokenAddress + '.png'} size='20px'></Image>
        </Tips>
      </Flex>
      <Flex alignItems='center' justifyContent='space-between' flexDirection='row-reverse'>
        <Text fontWeight="bold">≈$ {(data.tokenPrice * data.salePrice).toFixed(2)}</Text>
        <Flex alignItems='center'>
          <Image src={whiteListIcon} size='20px'></Image>
          {hasWhitelist && <Text fontSize='12px' ml='5px'>{t('userPass')}</Text>}
          {!hasWhitelist && <Text onClick={(event: any) => handleRule(data.whiteListChLinkUrl, data.whiteListEnLinkUrl, event)} color='#ff6871' fontSize='12px' ml='5px'>{t('userNotPass')}</Text>}
        </Flex>
      </Flex>
    </Card>
  )
}