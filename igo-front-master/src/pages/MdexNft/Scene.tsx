import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Flex, Box, Image } from 'rebass'
import { Animate, ImageContent } from './styled'
import { isMobile } from 'react-device-detect'

import banner1 from './images/banner1.png'
import banner2 from './images/banner2.png'
import banner3 from './images/banner3.png'
import leftBg from './images/p4-left.png'
import rightBg from './images/p4-right.png'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
const Banner = styled.div`
  position: relative;
  top: 0px;
  width: 392px;
  height: 330px;
  margin-right: 12px;
  margin-top: 170px;
  transition: top 500ms;
  cursor: pointer;
  >img {
    width: 100%;
    height: 100%;
  }
  :hover {
    top: -40px;
    .intro-detail {
      display: block;
    }
  }
  ${isMobile && `
    width: 270px;
    height: 228px;
    margin-top: 30px;
    flex-shrink: 0;
    margin-right: 0px;
    margin-left: 12px;
  `}
`
const Intro = styled.div`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px 26px;
  background-color: #47BBF5;
  color: #fff;
  animation: ${fadeIn} 500ms both;
`

const TextWrapper = styled.div<{height?: string}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({height}) => height ? height : '60px'};
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
`


export default function Roles () {
  const { t } = useTranslation()
  const history = useHistory()

  const handleDeposit = () => {
    history.push('/farm')
  }

  return(
    <Box mt={isMobile ? '90px' : '230px'} textAlign='center' style={{position: 'relative'}}>
      {isMobile && <>
        <ImageContent width='75px' height='74px' left='28px' top='-67px'>
          <Animate>
            <Image src={leftBg}/>
          </Animate>
        </ImageContent>
        <ImageContent width='121px' height='96px' right='18px' top='-80px'>
          <Animate>
            <Image src={rightBg}/>
          </Animate>
        </ImageContent>
      </>}
      {!isMobile && <>
        <ImageContent width='215px' height='213px' left='103px' top='-38px'>
          <Animate>
            <Image src={leftBg}/>
          </Animate>
        </ImageContent>
        <ImageContent width='344px' height='273px' right='41px' top='0px'>
          <Animate>
            <Image src={rightBg}/>
          </Animate>
        </ImageContent>
      </>}

      <Text color='#fff' fontSize={isMobile ? '28px' : '56px'} fontWeight='bold'>{t('scene')}</Text>
      <Flex width='100%' overflow={isMobile ? 'scroll' : 'initial'} mb={isMobile ? '40px' : '80px'} justifyContent={isMobile ? 'left' : 'center'}>
        <Banner onClick={handleDeposit}>
          <Image src={banner1}/>
          <TextWrapper>
            <Text>{t('scene1')}</Text>
          </TextWrapper>
          <Intro className='intro-detail'>
            <Text fontSize='20px'>{t('scene1')}</Text>
            <Text mt='30px' fontSize='14px'>{t('tips4')}</Text>
          </Intro>
        </Banner>
        <Banner>
          <Image src={banner2}/>
          <TextWrapper>
            <Text>{t('scene2')}</Text>
          </TextWrapper>
          <Intro className='intro-detail'>
            <Text fontSize='20px'>{t('scene2')}</Text>
            <Text mt='30px' fontSize='14px'>{t('tips5')}</Text>
          </Intro>
        </Banner>
        <Banner>
          <Image src={banner3}/>
          <TextWrapper height='100%'>
            <Text>{t('sceneMore')}</Text>
            <Text>{t('lockSoon')}</Text>
          </TextWrapper>
        </Banner>
      </Flex>
    </Box>
  )
}