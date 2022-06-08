import React from 'react'
import { Text, Image, Flex, Box } from 'rebass'
import styled from 'styled-components'

import NIcon from '../images/N.svg'
import RIcon from '../images/R.svg'
import SRIcon from '../images/SR.svg'
import SSRIcon from '../images/SSR.svg'
import { useTranslation } from 'react-i18next'

const ImageContent = styled.div`
  position: relative;
  width: 246px;
  height: 246px;
  border-radius: 20px;
  background-color: #efefef;
  overflow: hidden;
  >img {
    width: 100%;
    height: 100%;
  }
`

export default function NftInfo ({
  list,
  rarity,
  probability,
  nftType,
  efficiency
} : {
  list: any
  rarity: string
  probability: number
  nftType: string
  efficiency: number
}) {
  const { t } = useTranslation()

  return (
    <Flex alignItems='center' mt='20px'>
      <ImageContent>
        <img src={list[nftType][0]?.images}/>
      </ImageContent>
      <Box ml='30px'>
        <Text color='gray' fontSize='16px' fontWeight='400'>{t('rarity')}:</Text>
        <Image width='35px' height='17px' src={rarity === 'N' ? NIcon : rarity === 'R' ? RIcon : rarity === 'SR' ? SRIcon : rarity === 'SSR' ? SSRIcon : ''}></Image>
        <Text mt='30px' color='#6F7D95' fontSize='16px' fontWeight='400'>{t('probability')}:</Text>
        <Text color='#183B56' fontSize='18px' fontWeight='bold'>{probability * 100}%</Text>
        <Text mt='30px' color='#6F7D95' fontSize='16px' fontWeight='400'>{t('efficient')}:</Text>
        <Text color='#183B56' fontSize='18px' fontWeight='bold'>x{efficiency}</Text>
      </Box>
    </Flex>
  )
}