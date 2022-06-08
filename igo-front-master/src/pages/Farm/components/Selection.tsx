import React, { useEffect, useState } from 'react'
import { Text, Button, Flex, Box, Image } from 'rebass'
import { isMobile } from 'react-device-detect'
import { Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import searchIcon from '../images/search.svg'
import useDebouncedChangeHandler from 'utils/useDebouncedChangeHandler'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 40px;
  ${isMobile && `
    flex-direction: column;
    align-items: flex-start;
    height: unset;
    margin-top: 30px;
    margin-bottom: 20px;
  `}
`
const InputContent = styled.div`
  position: relative;
  width: 160px;
  height: 36px;
  margin-left: 30px;
  >input {
    width: 100%;
    height: 100%;
    padding-left: 15px;
    padding-right: 40px;
    border: none;
    border-radius: 19px;
    outline: none;
  }
  >img {
    position: absolute;
    right: 12px;
    top: 8px;
  }
`

export default function Selection({
  isActive,
  setIsActive,
  setKeyword,
  setIsPrivate
} : {
  isActive: boolean
  setIsActive: React.Dispatch<boolean>
  setKeyword: React.Dispatch<string>
  setIsPrivate: React.Dispatch<boolean>
}) {
  const { t } = useTranslation()

  const [inner, onChangeInner] = useDebouncedChangeHandler('', (value) => {
    setKeyword(value)
  }, 600)

  const changeValue = (value: any) => {
    onChangeInner(value)
  }

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
    setIsPrivate(checked)
  }
  const switchStatus = (active: boolean) => {
    setIsActive(active)
  }
  return (
    <Container>
      <Flex fontSize={isMobile ? '20px' : '26px'} fontWeight='bold' color='rgba(63, 65, 67, 0.6)'>
        <Text onClick={() => switchStatus(true)} color={isActive ? '#566FFE' : ''} mr={isMobile ? '30px' : '54px'} style={{cursor: 'pointer'}}>{t('pendding')}</Text>
        <Text onClick={() => switchStatus(false)} color={!isActive ? '#566FFE' : ''} style={{cursor: 'pointer'}}>{t('expired')}</Text>
      </Flex>
      <Flex alignItems='center' mt={isMobile ? '18px' : ''}>
        <Switch onChange={onChange} />
        <Text ml='12px' color='#183B56' fontSize='18px' fontWeight='bold'>{t('myDeposit')}</Text>
        <InputContent>
          <input type="text" onChange={(event) =>changeValue(event.target.value)}/>
          <Image size='21px' src={searchIcon}/>
        </InputContent>
      </Flex>
    </Container>
  )
}