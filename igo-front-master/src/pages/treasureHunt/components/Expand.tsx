/*
 * @Author: Aaron
 * @Date: 2022-04-18 14:38:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-05 14:34:14
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\components\Expand.tsx
 */
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
  margin: 0 auto;
  margin-top: 40px;
  font-size: 14px;
  color: #183b56;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  ${isMobile &&
  `
    width: 100%;
    padding: 0 16px 16px 16px;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    background-color: transparent;
  `}
`

const ExpandImg = styled.div<{ isActive?: boolean }>`
  width: 24px;
  height: 24px;
  background: url(${expandIcon}) center no-repeat;
  background-size: cover;
  transition: transform 200ms linear;
  cursor: pointer;
  ${({ isActive }) =>
    isActive &&
    `
    transform: rotate(-180deg)
  `}
`
const Collapse = styled.div<{ isActive?: boolean }>`
  width: 800px;
  margin-left: 30px;
  border-bottom: 1px solid #e2eef1;
  ${({ isActive }) =>
    isActive &&
    `
    border-bottom: 1px solid #566FFE;
  `}
  ${isMobile &&
  `
    width: unset;
    margin-left: 16px;
    margin-right: 16px;
  `}
`
const Content = styled.div<{ isActive?: boolean }>`
  height: 0px;
  padding: 0 10px 0 44px;
  transition: all 200ms linear;
  color: #6f7d95;
  ${({ isActive }) =>
    isActive &&
    `
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
  color: #566ffe;
`

export default function Expand() {
  const [state, setstate] = useState(0)
  const { t, i18n }: { t: any; i18n: any } = useTranslation()

  // 点击折叠面板
  const handleToggle = (e: number) => {
    e == state ? setstate(0) : setstate(e)
  }

  const list = [
    {
      id: 1,
      quesitionMapping: 'canTreasure',
      answerMapping: 'treasureDesc',
      applicationForm: 'applicationForm',
      zhLink: 'https://forms.gle/xEwp7rTqDz7ABcTCA',
      enLink: 'https://forms.gle/qcUrkiBP4sJDJnho6',
    },
    {
      id: 2,
      quesitionMapping: 'startTreasure',
      answerMapping: 'applyTreasure',
      applicationForm: 'applicationForm',
      zhLink: 'https://forms.gle/xEwp7rTqDz7ABcTCA',
      enLink: 'https://forms.gle/qcUrkiBP4sJDJnho6',
    },
  ]

  return (
    <Wrapper>
      {isMobile && (
        <Text mb="16px" fontSize="20px" color="#183B56" fontWeight="bold">
          FAQ
        </Text>
      )}

      <Box backgroundColor="#fff" style={{ borderRadius: '20px' }}>
        {list.length &&
          list.map((item, index) => {
            return (
              <Collapse key={item.id} isActive={state === item.id}>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  height="66px"
                  onClick={() => handleToggle(item.id)}
                >
                  <Flex>
                    <NumberText>{index + 1}</NumberText>
                    <Text>{t(item.quesitionMapping)}</Text>
                  </Flex>
                  <ExpandImg isActive={state === item.id} />
                </Flex>
                <Content isActive={state === item.id}>
                  {t(item.answerMapping)}
                  {item.id == 2 && (
                    <a
                      href={
                        i18n.language == 'en' ? (item.enLink as string) : (item.zhLink as string)
                      }
                    >
                      {t('applicationForm')}
                    </a>
                  )}
                </Content>
              </Collapse>
            )
          })}
      </Box>
      {!isMobile && <Image ml="70px" src={faqIcon} width="235px" height="170px"></Image>}
    </Wrapper>
  )
}
