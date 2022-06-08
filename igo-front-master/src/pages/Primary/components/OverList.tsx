import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from 'rebass'
import styled from 'styled-components'
import moment from 'moment'
import { isMobile } from 'react-device-detect'

import overIcon from '../images/over.svg'
import { useChain } from 'state/global/hooks'
import { useTranslation } from 'react-i18next'
import { GET_PRIMARY_LIST_ACTION } from 'data/api'

import listData from '../pending.mock.json'
import { OPENMETA_RL } from 'constants/index'
import Empty from 'components/Empty'

const Wrapper = styled.div`
  width: 1215px;
  margin: 0 auto;
  margin-top: -25px;
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
  position: absolute;
  top: 12px;
  left: 12px;
  height: 30px;
  display: flex;
  padding: 0 4px;
  align-items: center;
  background: #566FFE;
  border-radius: 10px 0px 16px 0px;
`

export default function OverList() {
  const chainid = useChain()
  const { t, i18n } = useTranslation()
  const [list, setList] = useState<any>([])
  // @ts-ignore
  const isChinese = i18n.language === 'zh-CN' ? 'ch' : 'en'

  const handleClick = (address: string) => {
    // @ts-ignore
    window.open(OPENMETA_RL + `#/blind-detail/${chainid}/${address}` + `?lang=${i18n.language}`)
  }

  const Item = !!list.length && list.map((item: any, index: number) => {
    return (
      <Card key={index} onClick={() => handleClick(item.contractAddress)}>
        <Tips>
          <Image src={overIcon} mr='5px' size='12px'/>
          <Text fontSize='14px' fontWeight='bold' color='#fff'>{moment(item.endTime).format('YYYY.MM.DD')}{t('over')}</Text>
        </Tips>
        <Image src={item.cardImage.replace('storageapi', 'storageapi2')} width={isMobile ? '311px' : '264px'} height={isMobile ? '311px' : '264px'} style={{borderRadius: '10px'}}/>
        <Flex width='264px' mt='15px' alignItems='center'>
          <Image src={item.blindBoxLogoImage.replace('storageapi', 'storageapi2')} size='30px' style={{borderRadius: '15px'}}></Image>
          <Text flex='1' ml='8px' mr='5px' color='#183B56' fontWeight='bold' fontSize='16px'>{item.title[isChinese]}</Text>
        </Flex>
        <Text mt='10px' overflow="hidden" display="-webkit-box" className='ellipsisText' width={isMobile ? 'unset' : '264px'} fontSize='12px' color='#6F7D95'>{item.description[isChinese]}</Text>
      </Card>
    )
  })

  useEffect(() => {
    chainid && GET_PRIMARY_LIST_ACTION({
      chain_id: chainid,
      queryType: 'ended'
    }).then((data: any) => {
      setList(data.result)
    })
  }, [chainid])

  return(
    <Wrapper>
      <Text mt={isMobile ? '30px' : '60px'} mb={isMobile ? '16px' : '45px'} fontSize={isMobile ? '20px' : '26px'} fontWeight='bold' color='#183B56'>{t('over')}</Text>
      <Flex flexWrap='wrap'>
        { Item }
        {list.length <=0 && <Empty></Empty>}
      </Flex>
    </Wrapper>
  )
}