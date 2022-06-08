import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Image } from 'rebass'
import { isMobile } from 'react-device-detect'

import expandIcon from '../images/expand.svg'
import faqIcon from '../images/FAQ.png'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  margin: 80px auto 80px auto;
  font-size: 14px;
  color: #183B56;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  ${isMobile && `
    width: 100%;
    padding: 0 16px 16px 16px;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    background-color: transparent;
  `}
`

const ExpandImg = styled.div<{isActive?: boolean}>`
  width: 24px;
  height: 24px;
  background: url(${expandIcon}) center no-repeat;
  background-size: cover;
  transition: transform 200ms linear;
  cursor: pointer;
  ${({isActive}) => isActive && `
    transform: rotate(-180deg)
  `}
`
const Collapse = styled.div<{isActive?: boolean}>`
  width: 800px;
  margin-left: 30px;
  border-bottom: 1px solid #E2EEF1;
  ${({isActive}) => isActive && `
    border-bottom: 1px solid #566FFE;
  `}
  ${isMobile && `
    width: unset;
    margin-left: 16px;
    margin-right: 16px;
  `}
`
const Content = styled.div<{isActive?: boolean}>`
  height: 0px;
  padding: 0 10px 0 44px;
  transition: all 200ms linear;
  color: #6F7D95;
  ${({isActive}) => isActive && `
    height: auto;
    padding: 0 10px 25px 44px;
  `}
  overflow: hidden;
`
const NumberText = styled.div`
  width: 24px;
  height: 24px;
  line-height: 24px;
  margin-right: 20px;
  border-radius: 12px;
  background: rgba(86, 111, 254, 0.13);
  font-size: 14px;
  text-align: center;
  color: #566FFE;
`

export default function Expand() {
  const [state, setstate] = useState(0)
  const { t } = useTranslation()

  const handleToggle1 = () => {
    if (state === 1) {
      setstate(0)
      return
    }
    setstate(1)
  }

  const handleToggle2 = () => {
    if (state === 2) {
      setstate(0)
      return
    }
    setstate(2)
  }

  const handleToggle3 = () => {
    if (state === 3) {
      setstate(0)
      return
    }
    setstate(3)
  }

  return(
    <Wrapper>
      {isMobile && <Text mb='16px' fontSize='20px' color='#183B56' fontWeight='bold'>FAQ</Text>}
      <Box backgroundColor='#fff' style={{borderRadius: '20px'}}>
        <Collapse isActive={state === 1}>
          <Flex justifyContent='space-between' alignItems='center' height='66px' onClick={handleToggle1}>
            <Flex>
              <NumberText>1</NumberText>
              <Text>{t('question1')}</Text>
            </Flex>
            <ExpandImg isActive={state === 1}/>
          </Flex>
          <Content isActive={state === 1}>{t('answer1')}</Content>
        </Collapse>

        <Collapse isActive={state === 2}>
          <Flex justifyContent='space-between' alignItems='center' height='66px' onClick={handleToggle2}>
            <Flex>
              <NumberText>2</NumberText>
              <Text>{t('question2')}</Text>
            </Flex>
            <ExpandImg isActive={state === 2}/>
          </Flex>
          <Content isActive={state === 2}>{t('answer2')}</Content>
        </Collapse>

        <Collapse isActive={state === 3}>
          <Flex justifyContent='space-between' alignItems='center' height='66px' onClick={handleToggle3}>
            <Flex>
              <NumberText>3</NumberText>
              <Text>{t('question3')}</Text>
            </Flex>
            <ExpandImg isActive={state === 3}/>
          </Flex>
          <Content isActive={state === 3}>{t('answer3')}</Content>
        </Collapse>
      </Box>
      {!isMobile && <Image ml='70px' src={faqIcon} width='235px' height='170px'></Image>}
    </Wrapper>
  )
}