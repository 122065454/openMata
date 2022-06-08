import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Image } from 'rebass'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

import chineseIcon from './images/chinese.svg'
import englishIcon from './images/english.svg'
import { useHistory } from 'react-router-dom'


const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #6F7D93;
  font-weight: 500;
  cursor: pointer;
`
const Content = styled.div`
  margin-left: 20px;
  border-radius: 21px;
`
const Options = styled.div`
  position: absolute;
  top: 140%;
  right: 0;
  width: 146px;
  padding: 6px 0 6px 0px;
  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #E2EEF1;
  color: #6F7D95;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`
const Option = styled(Flex)`
  padding: 8px 0;
  padding-left: 20px;
  align-items: center;
  :hover {
    background: #E6F7FF;
    color: #566FFE;
  }
`
const langList = {
  en: {
    key: 'en',
    value: 'English',
    label: englishIcon
  },
  'zh-CN': {
    key: 'zh-CN',
    value: '繁體中文',
    label: chineseIcon
  },
}

export default function Wallet() {
  const { i18n } = useTranslation()
  const history = useHistory()

  const [showItem, setShowItem] = useState(false)
  // @ts-ignore
  const lang = i18n.language === 'en' ? 'en' : 'zh-CN'
  const [language, setLanguage] = useState(lang)

  const handleClick = (language: string) => {
    // @ts-ignore
    i18n.changeLanguage(language)
    const pathname = history.location.pathname
    history.push(pathname + '?lang=' + language)
    setLanguage(language)
    setShowItem(false)
  }
  return (
    <Wrapper>
      <Content onClick={() => setShowItem(!showItem)}>
        {/* @ts-ignore */}
        <Image src={langList[language].label} size={isMobile ? '24px' : '32px'}/>
      </Content>
      {showItem && <Options>
        {Object.values(langList).map((item: any, index: number) => {
          return (
            <Option key={index} onClick={() => handleClick(item.key)}>
              <Text ml='15px'>{item.value}</Text>
            </Option>
          )
        })}
      </Options>}
    </Wrapper>
  )
}