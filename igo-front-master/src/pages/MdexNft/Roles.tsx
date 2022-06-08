import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Flex, Box, Image } from 'rebass'
import Rarity from 'components/Rarity'
import { Role } from 'types'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

import role1Mini from './images/role1-mini.png'
import role2Mini from './images/role2-mini.png'
import role3Mini from './images/role3-mini.png'
import role4Mini from './images/role4-mini.png'
import role5Mini from './images/role5-mini.png'
import role6Mini from './images/role6-mini.png'
import role7Mini from './images/role7-mini.png'
import role8Mini from './images/role8-mini.png'

import shape from './images/shape.png'
import type1 from './images/type1.png'
import type2 from './images/type2.png'
import type3 from './images/type3.png'
import type4 from './images/type4.png'
import arrowLeftICon from './images/arrow-left.png'
import arrowRightIcon from './images/arrow-right.png'

import { loadAnimation } from 'utils'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
`

const Content = styled.div`
  width: 630px;
  height: 630px;
  overflow: hidden;
  ${isMobile && `
    width: 260px;
    height: 260px;
    margin: 0 auto;
  `}
`
const MiniContent = styled.div`
  position: relative;
  width: 118px;
  height: 118px;
  padding: 14px;
  border: 2px solid #4D4D5F;
  border-radius: 59px;
  margin: 0 auto;
  >img {
    width: 100%;
    height: 100%;
  }
  ${isMobile && `
    width: 72px;
    height: 72px;
    padding: 8px;
    border-radius: 36px;
  `}
`
const CheckIcon = styled.div<{display: string}>`
  position: absolute;
  display: ${({display}) => display && display};
  left: 0px;
  top: 0px;
  width: 118px;
  height: 118px;
  background: url(${shape}) center no-repeat;
  background-size: cover;
  animation: ${rotate} 500ms;
  ${isMobile && `
    left: 0px;
    top: 0px;
    width: 72px;
    height: 72px;
  `}
`
const NameContent = styled.div`
  position: relative;
  font-size: 0px;
  margin-bottom: 35px;
  height: 116px;
  text-align: left;
  ${isMobile && `
    height: 73px;
    margin-bottom: 23px;
  `}
  >img {
    width: unset;
    height: 100%;
    max-width: unset;
  }
`
const NameText = styled.div`
  position: absolute;
  left: 140px;
  top: 32px;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
  font-size: 36px;
  white-space: nowrap;
  ${isMobile && `
    left: 102px;
    top: 22px;
    font-size: 20px;
  `}
`
const LottieContainer = styled.div<{show?: boolean}>`
  display: ${({show}) => show ? 'block' : 'none'};
  width: 630px;
  height: 630px;
  ${isMobile && `
    width: 260px;
    height: 260px;
    margin: 0 auto;
  `}
`
const ListWrapper = styled.div`
  position: relative;
  text-align: center;
  width: 562px;
  height: 158px;
  color: #fff;
  overflow: hidden;
  ${isMobile && `
    width: 257px;
  `}
`
const ListContent = styled.div<{left?: number}>`
  position: absolute;
  top: 0;
  left: ${({left}) => left && `${left}px`};
  display: flex;
  width: 100%;
  transition: left ease-in-out 300ms;
`
const RoleWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ArrowLeft = styled.div`
  width: 32px;
  height: 32px;
  margin-top: 20px;
  margin-right: 15px;
  background: url(${arrowLeftICon}) no-repeat 0 0;
  background-size: cover;
  cursor: pointer;
`
const ArrowRight = styled.div`
  width: 32px;
  height: 32px;
  margin-top: 20px;
  margin-left: 15px;
  background: url(${arrowRightIcon}) no-repeat 0 0;
  background-size: cover;
  cursor: pointer;
`

export default function Roles () {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [left, setLeft] = useState(0)
  const roles = [{
    name: t('role1Name'),
    logo: role1Mini,
    nameBg: type1,
    rarity: 70,
    text1: t('role1Text1'),
    text2: t('role1Text2')
  }, {
    name: t('role2Name'),
    logo: role2Mini,
    nameBg: type2,
    rarity: 20,
    text1: t('role2Text1'),
    text2: t('role2Text2')
  }, {
    name: t('role3Name'),
    logo: role3Mini,
    nameBg: type3,
    rarity: 8,
    text1: t('role3Text1'),
    text2: t('role3Text2')
  }, {
    name: t('role4Name'),
    logo: role4Mini,
    nameBg: type4,
    rarity: 2,
    text1: t('role4Text1'),
    text2: t('role4Text2')
  }, {
    name: t('role5Name'),
    logo: role5Mini,
    nameBg: type1,
    rarity: 8,
    text1: t('role5Text1'),
    text2: t('role5Text2')
  }, {
    name: t('role6Name'),
    logo: role6Mini,
    nameBg: type2,
    rarity: 2,
    text1: t('role6Text1'),
    text2: t('role6Text2')
  }, {
    name: t('role7Name'),
    logo: role7Mini,
    nameBg: type3,
    rarity: 8,
    text1: t('role7Text1'),
    text2: t('role7Text2')
  }, {
    name: t('role8Name'),
    logo: role8Mini,
    nameBg: type4,
    rarity: 2,
    text1: t('role8Text1'),
    text2: t('role8Text2')
  }]

  const handleClick = (index: number) => {
    setActive(index)
  }

  const handleLeft = () => {
    console.log('active----', active)
    if(active < 1) return
    if(active === 4) {
      setLeft(0)
    }
    setActive(active - 1)
  }

  const handleRight = () => {
    console.log('active----', active)
    if(active >=7) return
    if(active === 3) {
      setLeft(-148 * 4)
    }
    setActive(active + 1)
  }
  const handleMobileLeft = () => {
    console.log('active----', active)
    if(active < 1) return
    if(active === 3) {
      setLeft(0)
    }
    if(active === 6) {
      setLeft(-92 * 3)
    }
    setActive(active - 1)
  }

  const handleMobileRight = () => {
    console.log('active----', active)
    if(active >=7) return
    if(active === 2) {
      setLeft(-92 * 3)
    }
    if(active === 5) {
      setLeft(-92 * 6)
    }
    setActive(active + 1)
  }

  useEffect(() => {
    loadAnimation('n', 'lottieRole1')
    setTimeout(() => {
      loadAnimation('r', 'lottieRole2')
      loadAnimation('sr', 'lottieRole3')
      loadAnimation('ssr', 'lottieRole4')
      loadAnimation('Fallen-Spy', 'lottieRole5', 1)
      loadAnimation('Fallen-Captain', 'lottieRole6', 1)
      loadAnimation('Fallen-General', 'lottieRole7', 1)
      loadAnimation('Fallen-Tutor', 'lottieRole8', 1)
    }, 3000)
  }, [])

  const ListItem = roles.map((item: Role, index: number) => {
    return (
      <Box onClick={() => handleClick(index)} mr={isMobile ? '20px' : '30px'} textAlign='center' style={{flexShrink: 0, cursor: 'pointer'}} key={index}>
        <MiniContent>
          <CheckIcon display={active === index ? 'block' : 'none'}></CheckIcon>
          <Image src={item.logo}/>
        </MiniContent>
        <Text mt='16px' width={isMobile ? '72px' : '100%'}>{item.name}</Text>
      </Box>
    )
  })

  return(
    <Box mt={isMobile ? '170px' : '450px'} textAlign='center'>
      <Text color='#fff' fontSize={isMobile ? '28px' : '56px'} fontWeight='bold'>{t('roleTitle')}</Text>
      {!isMobile && <Flex justifyContent='center'>
        <Box>
          <Content>
            <LottieContainer show={active === 0} id='lottieRole1'></LottieContainer>
            <LottieContainer show={active === 1} id='lottieRole2'></LottieContainer>
            <LottieContainer show={active === 2} id='lottieRole3'></LottieContainer>
            <LottieContainer show={active === 3} id='lottieRole4'></LottieContainer>
            <LottieContainer show={active === 4} id='lottieRole5'></LottieContainer>
            <LottieContainer show={active === 5} id='lottieRole6'></LottieContainer>
            <LottieContainer show={active === 6} id='lottieRole7'></LottieContainer>
            <LottieContainer show={active === 7} id='lottieRole8'></LottieContainer>
          </Content>
          <RoleWrapper>
            <ArrowLeft onClick={handleLeft}></ArrowLeft>
            <ListWrapper>
              <ListContent left={left}>
                {ListItem}
              </ListContent>
            </ListWrapper>
            <ArrowRight onClick={handleRight}></ArrowRight>
          </RoleWrapper>
        </Box>
        <Box width='520px' color='#fff' mt='100px'>
          <NameContent>
            <Image src={roles[active].nameBg}/>
            <NameText>{roles[active].name}</NameText>
          </NameContent>
          <Rarity percent={roles[active].rarity}></Rarity>
          <Text mt='50px' fontSize='16px' textAlign='left'>{roles[active].text1}</Text>
          <Text mt='30px' fontSize='16px' textAlign='left'>{roles[active].text2}</Text>
        </Box>
      </Flex>}

      {isMobile && <Flex justifyContent='center' flexDirection='column' alignItems='center'>
        <Box width='100%'>
          <Content>
            <LottieContainer show={active === 0} id='lottieRole1'></LottieContainer>
            <LottieContainer show={active === 1} id='lottieRole2'></LottieContainer>
            <LottieContainer show={active === 2} id='lottieRole3'></LottieContainer>
            <LottieContainer show={active === 3} id='lottieRole4'></LottieContainer>
            <LottieContainer show={active === 4} id='lottieRole5'></LottieContainer>
            <LottieContainer show={active === 5} id='lottieRole6'></LottieContainer>
            <LottieContainer show={active === 6} id='lottieRole7'></LottieContainer>
            <LottieContainer show={active === 7} id='lottieRole8'></LottieContainer>
          </Content>
          <Box padding='0 17px' color='#fff'>
            <NameContent>
              <Image src={roles[active].nameBg}/>
              <NameText>{roles[active].name}</NameText>
            </NameContent>
            <Rarity percent={roles[active].rarity}></Rarity>
            <Text mt='24px' fontSize='12px' textAlign='left'>{roles[active].text1}</Text>
            <Text mt='10px' mb='24px' fontSize='12px' textAlign='left'>{roles[active].text2}</Text>
          </Box>
          {/* <Flex justifyContent='flex-start' textAlign='center' color='#fff'>
            {ListItem}
          </Flex> */}
          <RoleWrapper>
            <ArrowLeft onClick={handleMobileLeft}></ArrowLeft>
            <ListWrapper>
              <ListContent left={left}>
                {ListItem}
              </ListContent>
            </ListWrapper>
            <ArrowRight onClick={handleMobileRight}></ArrowRight>
          </RoleWrapper>
        </Box>
      </Flex>}
    </Box>
  )
}