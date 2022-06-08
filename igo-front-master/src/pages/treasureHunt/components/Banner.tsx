/*
 * @Author: Aaron
 * @Date: 2022-04-18 09:26:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-16 21:09:51
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\components\Banner.tsx
 */

import React, { useRef } from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import { Box } from 'rebass'
import mainPic from '../../../assets/images/farm-banner.png'
import mainPicH5 from '../../../assets/images/farm-banner-h5.png'
import { isMobile } from 'react-device-detect'
import nextIcon from '../images/next.svg'
import prevIcon from '../images/prev.svg'
import { useTranslation } from 'react-i18next'
import { formatTimeStamp } from 'utils/format'
const BannerStyle = styled.div`
  color: #fff;
  position: absolute;
  zIndex: 99;
  top: 50%;
  transform: translateY(-50%);
  ${!isMobile && `left:20%;`}
  ${isMobile && `padding:0 10px;`}
`

const Block = styled.div`
  width: 354px;
  height: 42px;
  background: linear-gradient(270deg, rgba(31, 142, 169, 0) 0%, #23cee1 100%);
  clip-path: polygon(7% 0, 100% 0%, 100% 100%, 0% 100%);
  padding-left: 50px;
  line-height: 42px;
  font-size: 16px;
`

const titleStyle: React.CSSProperties = {
  fontSize: '34.37px',
  fontFamily: 'AlibabaPuHuiTiM',
  fontWeight: 'bold',
}

const baseFontStyle: React.CSSProperties = {
  color: '#00FFEF',
  fontSize: '15px',
}

const ContentStyle = styled.div<{img: string}>`
  position: relative;
  width: 100%;
  height: 430px;
  background: ${({img}) => img && `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${img})  no-repeat`};
  background-size: cover;
  color: #fff;
  cursor: pointer;
  overflow:hidden;
  ${isMobile && `
    height: 300px;
  `}
`

const SwitchBtn = styled.div<{ left?: string; right?: string; img: string; colors?: boolean }>`
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

interface Iprops {
  bannerList: []
  bannerClick:Function
}
export default function Banner(props: Iprops) {
  const { bannerList,bannerClick } = props
  const carouselRef: any = useRef(null)
  const { i18n }: { i18n: any } = useTranslation()
  const  currentLanguage = i18n.language == 'en' ? 'en' : 'ch'
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
  const bannerItem = bannerList && bannerList.map((item:any) => {
      return (
          <ContentStyle key={item} img={item.imagePath} onClick={()=>bannerClick(item.linkUrl)}>
          {/* {!isMobile && <BannerStyle>
            <Box style={titleStyle}>{ item.title[currentLanguage]}</Box>
            <Box style={{ padding: '15px 0' }}>{ item.description[currentLanguage]}</Box>
            <Block>Time: {formatTimeStamp(new Date().getTime())} (UTC)</Block>
          </BannerStyle> } */}
          {!isMobile && <SwitchBtn left="30px" img={prevIcon} onClick={handlePrev}></SwitchBtn>}
          {!isMobile && <SwitchBtn right="30px" img={nextIcon} onClick={handleNext}></SwitchBtn>}
        </ContentStyle>
      )
    })

  return (
    <Box>
      <Carousel autoplay ref={carouselRef} >
        {bannerItem}
      </Carousel>
    </Box>
  )
}
