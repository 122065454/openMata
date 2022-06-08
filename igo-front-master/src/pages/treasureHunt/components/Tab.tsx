/*
 * @Author: Aaron
 * @Date: 2022-04-18 10:23:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-11 09:19:56
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\components\Tab.tsx
 */

import React, { FC } from 'react'
import styled from 'styled-components'
import { Flex, Text, Image } from 'rebass'
import { isMobile } from 'react-device-detect'
import searchIcon from '../images/search.svg'
import { useTranslation } from 'react-i18next'

const Wapper = styled.div`
  display: flex;
  width: 1200px;
  ${isMobile &&
  `
  display:block;
  padding:0 16px;
  width:100%;
  `};
  justify-content: space-between;
  margin: 0 auto;
`
const FlexTab = styled.div`
  display: flex;
`
const InputContent = styled.div`
  position: relative;
  width: 160px;
  height: 36px;
  margin-left: 30px;
  ${isMobile &&
  `
  width:100%;
  margin-left:unset;
  margin-top:14px;
  `}
  >input {
    width: 100%;
    height: 100%;
    padding-left: 15px;
    padding-right: 40px;
    border: none;
    border-radius: 19px;
    outline: none;
  }
  > img {
    position: absolute;
    right: 12px;
    top: 8px;
  }
`

interface Iprops {
  active: string
  tabClickHandler: Function
  inputChnage: Function
  inputKeyDown: Function
  searchClick: Function
}

export default function Tab(props: Iprops) {
  const { active, tabClickHandler, inputChnage, inputKeyDown, searchClick } = props
  const { t } = useTranslation()

  const tabList = [
    {
      id: 'ahead',
      text: 'soonStart',
    },
    {
      id: 'started',
      text: 'active',
    },
    {
      id: 'ended',
      text: 'completed',
    },
    {
      id: 'owner',
      text: 'participanted',
    },
  ]

  return (
    <Wapper>
      <Flex fontSize={isMobile ? '16px' : '26px'} fontWeight="bold" color="rgba(63, 65, 67, 0.6)">
        {tabList.map(item => (
          <Text
            key={item.id}
            onClick={() => tabClickHandler(item.id)}
            color={active === item.id ? '#566FFE' : ''}
            style={{ cursor: 'pointer' }}
            mr={isMobile ? '30px' : '54px'}
          >
            {t(item.text)}
          </Text>
        ))}
      </Flex>
      <InputContent>
        <input
          type="text"
          placeholder={t('activityName')}
          onChange={event => inputChnage(event.target.value)}
          onKeyDown={e => inputKeyDown(e)}
        />
        <Image
          style={{ cursor: 'pointer' }}
          size="21px"
          src={searchIcon}
          onClick={() => searchClick()}
        />
      </InputContent>
    </Wapper>
  )
}
