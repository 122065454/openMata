import React from 'react'
import styled from 'styled-components'

import { Text, Image } from 'rebass'
import { isMobile } from 'react-device-detect'
import empty from '../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 50px;
  flex-direction: column;
`

export default function Empty () {
  const { t } = useTranslation()
  return(
    <Wrapper>
      <Image src={empty} size={isMobile ? '60px' : '90px'}></Image>
      <Text mt='15px' color='#6F7D95' fontWeight='600' fontSize={isMobile ? '12px' : '16px'}>{t('noData')}</Text>
    </Wrapper>
  )
}