import React, { useState } from 'react'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Flex, Text, Image, Box, Link } from 'rebass'
import { useTranslation } from 'react-i18next'

import mailIcon from './email.svg'
import mailHoverIcon from './email-hover.svg'
import Logo from '../Header/images/logo.png'

const Wrapper = styled.div`
  width: 1200px;
  padding-top: 70px;
  padding-bottom: 40px;
  margin: 0 auto;
  background-color: #fff;
  font-size: 14px;
  color: #252526;
  font-weight: 400;
`
const Title = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  color: #252526;
`
const Content = styled(Link)`
  display: block;
  color: #252526;
  font-weight: 400;
  user-select: none;
  :hover {
    padding-left: 6px;
    transition: all linear 100ms;
  }
`
const MailIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 23px;
  border-radius: 20px;
  background: url(${mailIcon}) center no-repeat;
  background-size: contain;
  cursor: pointer;
  :hover {
    background: url(${mailHoverIcon}) center no-repeat;
    background-size: contain;
  }
`

export default function Footer() {
  const { t, i18n } = useTranslation()

  if(isMobile) {
    return null
  }
  const handleFaq = () => {
    // @ts-ignore
    if(i18n.language === 'en') {
      window.open('https://openmeta.gitbook.io/doc/v/english/help-center/faq')
    } else {
      window.open('https://openmeta.gitbook.io/doc/bang-zhu-zhong-xin/chang-jian-wen-ti')
    }
  }

  const handleGuidence = () => {
    // @ts-ignore
    if(i18n.language === 'en') {
      window.open('https://openmeta.gitbook.io/doc/v/english/help-center/user-guide')
    } else {
      window.open('https://openmeta.gitbook.io/doc/bang-zhu-zhong-xin/yong-hu-zhi-nan')
    }
  }

  const handleNotice = () => {
    // @ts-ignore
    if(i18n.language === 'en') {
      window.open('https://openmeta.gitbook.io/doc/v/english/help-center/announcement')
    } else {
      window.open('https://openmeta.gitbook.io/doc/bang-zhu-zhong-xin/gong-gao')
    }
  }
  const handleAbout = () => {
    // @ts-ignore
    if(i18n.language === 'en') {
      window.open('https://openmeta.gitbook.io/doc/v/english/about-openmeta/introduction')
    } else {
      window.open('https://openmeta.gitbook.io/doc/guan-wu-openmeta/jian-jie')
    }
  }

  return (
    <Wrapper>
      <Flex justifyContent='space-between'>
        <Box>
          <Image width='202px' height='36px' src={Logo}></Image>
          <Box mt='20px' color='#6F7D95'>{(t('introduction'))}</Box>
          <Link href='mailto:business@openmeta.finance?subject=&amp;body='>
            <MailIcon></MailIcon>
          </Link>
        </Box>
        <Flex>
          <Box width='100px'>
            <Title mb='23px'>{t('apply')}</Title>
            <Content href='https://form.nativeforms.com/yA3aK1jZmATYyUFMy0Db' target='_blank'>Primary{t('apply')}</Content>
          </Box>
          {/* <Box width='100px' ml='120px'>
            <Title mb='23px'>{t('navigation')}</Title>
            <Content mb='18px'>{t('createNft')}</Content>
            <Content mb='18px'>{t('importNft')}</Content>
            <Content mb='18px'>{t('nftMarketplace')}</Content>
            <Content>{t('nftSeries')}</Content>
          </Box> */}
          <Box width='100px' ml='120px'>
            <Title mb='23px'>{t('help')}</Title>
            <Content mb='18px' onClick={handleFaq}>FAQ</Content>
            <Content mb='18px' onClick={handleGuidence}>{t('userGuidence')}</Content>
            <Content mb='18px' onClick={handleNotice}>{t('announcement')}</Content>
            <Content onClick={handleAbout}>{t('aboutUs')}</Content>
          </Box>
        </Flex>
      </Flex>
      <Text mt='35px' textAlign='center' color='#6F7D95'>Copyright © 2021. Created with love by Openmeta.</Text>
    </Wrapper>
  )
}