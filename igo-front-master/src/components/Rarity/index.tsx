import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

const Content = styled.div`
  position: relative;
  display: flex;
  width: 519px;
  height: 56px;
  line-height: 56px;
  background-color: #231F2E;
  border-radius: 28px;
  overflow: hidden;
  ${isMobile && `
    width: 343px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
  `}
`
const Progress = styled.div<{width?: string}>`
  position: absolute;
  width: ${({width}) => width && width};
  height: 100%;
  background-color: #03FFF0;
`
const Triangle = styled.div`
  position: absolute;
  left: 100%;
  width: 0;
  height: 0;
  border-left: 28px solid #03FFF0;
  border-bottom: 56px solid transparent;
`
const LeftText = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  text-align: left;
  margin-bottom: 13px;
  ${isMobile && `
    left: 16px;
    font-size: 14px;
  `}
`
const RightText = styled.div<{color?: string}>`
  position: absolute;
  right: 22px;
  color: ${({color}) => color && color};
  font-size: 30px;
  font-weight: bold;
  ${isMobile && `
    right: 16px;
    font-size: 18px;
  `}
`
export default function Rarity ({
  percent
} : {
  percent: number
}) {
  const { t } = useTranslation()
  return(
    <div>
      <LeftText>{t('rarity')}</LeftText>
      <Content>
        <Progress width={percent + '%'}><Triangle></Triangle></Progress>
        <RightText color={percent === 100 ? '#000' : '#03FFF0'}>{percent}%</RightText>
      </Content>
    </div>
  )
}