/*
 * @Author: Aaron
 * @Date: 2022-04-18 09:26:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-11 18:08:57
 * @Description: 空投详情页轮播图
 * @FilePath: \igo-front\src\pages\treasureHunt\detail\components\Banner.tsx
 */

import React, { useRef } from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import { Box } from 'rebass'
import { isMobile } from 'react-device-detect'
import nextIcon from '../../images/next.svg'
import prevIcon from '../../images/prev.svg'

const ContentStyle = styled.div<{ img: string }>`
  position: relative;
  height: 600px;
  max-height: 600px;
  border-radius: 20px;
  background-size: 100% 100%;
  color: #fff;
  cursor: pointer;
  overflow: hidden;

  ${isMobile &&
  `
    width:100%;
    height:unset;
    border-radius:unset;
  `}
`


interface IBtnStyle{
  left?: string
  right?: string
  img: string
  colors?: boolean

}
const SwitchBtn = styled.div<IBtnStyle>`
  position: absolute;
  top: 50%;
  left: ${({ left }) => left && left};
  right: ${({ right }) => right && right};
  transform: translateY(-50%);
  height: 32px;
  width: 32px;
  background: ${({ img }) => `url(${img}) 0 0 no-repeat`};
  background-size: cover;
  cursor: pointer;
`

const Pic = styled.div`
  @media screen and (min-width: 576px) {
    max-width: 600px;
  }
  @media screen and (min-width: 768px) {
    max-width: 600px;
  }
  @media screen and (min-width: 992px) {
    max-width: 450px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 500px;
  }
  @media screen and (min-width: 1400px) {
    max-width: 550px;
  }
  @media screen and (min-width: 1480px) {
    max-width: 600px;
  }
`

interface Iprops {
  bannerList: []
}
export default function Banner(props: Iprops) {
  const { bannerList } = props
  const carouselRef: any = useRef(null)

  // 上一张
  const handlePrev = (event: any) => {
    event.stopPropagation()
    carouselRef.current.prev()
  }

  // 下一张
  const handleNext = (event: any) => {
    event.stopPropagation()
    carouselRef.current.next()
  }

  // 循环banner
  const bannerItem =
    bannerList &&
    bannerList.map((item: any) => {
      return (
        <ContentStyle key={item} img={item}>
          <img style={{ width: '100%', height: '100%' }} src={item} />
          {/* {!isMobile && <SwitchBtn left="30px" img={prevIcon} onClick={handlePrev}></SwitchBtn>}
          {!isMobile && <SwitchBtn right="30px" img={nextIcon} onClick={handleNext}></SwitchBtn>} */}
        </ContentStyle>
      )
    })

  return (
    <Pic style={{ width: isMobile ? '100%' : '600px' }}>
      <Carousel autoplay ref={carouselRef}>
        {bannerItem}
      </Carousel>
    </Pic>
  )
}
