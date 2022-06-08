import React, { useEffect, useRef, useState } from 'react'
import { Carousel, Statistic } from 'antd'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'
import { Text, Flex, Image } from 'rebass'
import { useTranslation } from 'react-i18next'
import { useChain, useLoading } from 'state/global/hooks'
import { GET_PRIMARY_BANNER_ACTION } from 'data/api'

import nextIcon from '../images/next.svg'
import prevIcon from '../images/prev.svg'
import soldOutIcon from '../images/soldOut.png'

import bannerData from '../banner.mock.json'
import { TOKEN_ICON } from 'constants/index'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 88px;
  ${isMobile && `
    margin-top: 77px;
  `}
`
const ContentStyle = styled.div<{img: string}>`
  position: relative;
  width: 100%;
  height: 430px;
  background: ${({img}) => img && `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${img}) center no-repeat`};
  background-size: cover;
  text-align: center;
  color: #fff;
  cursor: pointer;
  ${isMobile && `
    height: 300px;
  `}
`
const HeadText = styled.div`
  margin: 54px auto 0 auto;
  font-size: 40px;
  font-weight: bold;
  ${isMobile && `
    font-size: 18px;
    margin: 30px auto 0 auto;
  `}
`
const DescText = styled.div`
  margin: 10px auto 0 auto;
  width: 900px;
  font-size: 12px;
  color: rgba(230, 238, 245, 0.8);
  ${isMobile && `
    width: 100%;
    padding: 0 16px;
  `}
`
const Container = styled.div`
  position: relative;
  height: 74px;
  ${isMobile && `
    height: 50px;
  `}
`
const TextContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  color: rgba(230, 238, 245, 0.8);
  font-size: 14px;
  white-space: nowrap;
`
const TextTime = styled(Text)`
  position: relative;
  width: 60px;
  ::after {
    content: '';
    position: absolute;
    right: -30px;
    top: -25px;
    height: 24px;
    width: 1px;
    background-color: rgba(230, 238, 245, 0.3);
    ${isMobile && `
      right: -32px;
      top: -10px;
      height: 12px;
      display: none;
    `}
  }
`
const SoldedContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 137px;
  height: 109px;
  margin: 0 auto;
  margin-top: 20px;
  background: url(${soldOutIcon}) center no-repeat;
  background-size: cover;
  white-space: nowrap;
`
const SwitchBtn = styled.div<{left?: string, right?: string, img: string, colors?: boolean}>`
  position: absolute;
  top: 50%;
  left: ${({left}) => left && left};
  right: ${({right}) => right && right};
  transform: translateY(-50%);
  height: 32px;
  width: 32px;
  background: ${({img}) => `url(${img}) 0 0 no-repeat`};
  background-size: cover;
  cursor: pointer;
  ${({left}) => left && `
    ::after {
      position: absolute;
      content: '';
      height: 2px;
      width: 500px;
      left: 92px
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    }
  `}
  ${({right}) => right && `
    ::before {
      position: absolute;
      content: '';
      width: 500px;
      height: 2px;
      right: 92px
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(to left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    }
  `}
  ${({colors}) => colors && `
    ::after {
      background: linear-gradient(to right, RGBA(255, 182, 73, 1), RGBA(255, 182, 73, 0.2));
    }
    ::before {
      background: linear-gradient(to left, RGBA(255, 182, 73, 1), RGBA(255, 182, 73, 0.2));
    }
  `}
`

export default function Banner () {
  const { Countdown } = Statistic
  const carouselRef: any = useRef(null)
  const [,setLoading] = useLoading()

  const chaind = useChain()
  const { t, i18n } = useTranslation()
  const [list, setList] = useState<any>()
  // @ts-ignore
  const lang = i18n.language === 'zh-CN' ? 'ch' : 'en'

  const handlePrev = (event: any) => {
    event.stopPropagation()
    carouselRef.current.prev()
  }

  const handleNext = (event: any) => {
    event.stopPropagation()
    carouselRef.current.next()
  }

  const handleClick = (link: string, event: any) => {
    event.stopPropagation()
    // @ts-ignore
    window.open(link + `?lang=${i18n.language}`)
  }

  const Item = list && list.map((data: any, index: number) => {
    const key = isMobile ? (lang === 'ch' ? 'phoneCh' : 'phoneEn') : lang === 'ch' ? 'pcCh' : 'pcEn'
    const { imagePath, linkUrl } = data[key]

    const dateNow = Date.now()
    const dateStart = data.primary.startTime
    const dateRealEnd = data.primary.actualEndTime
    let type = 1 // 未开始

    let showDate = dateStart
    if(dateNow > dateStart) { // 已开启
      showDate = data.primary.endTime
      type = 2
      if (dateNow > dateRealEnd) {
        if ((dateRealEnd - dateStart) > 30 * 60 * 1000) {
          // 展示售罄
          type = 3
        } else{
          // 展示具体售磬分秒
          type = 4
          showDate =dateRealEnd - dateStart
        }
      }
    }

    return(
      <ContentStyle img={imagePath.replace('storageapi', 'storageapi2')} key={index} onClick={(event) => handleClick(linkUrl, event)}>
        <HeadText>{data.primary.title[lang]}</HeadText>
        <DescText>{data.primary.description[lang]}</DescText>
        {type === 1 && <Text mt={isMobile ? '20px' : '30px'} fontSize='12px'>{t('startSelling')}</Text>}
        {type === 2 && <Text mt={isMobile ? '20px' : '30px'} fontSize='12px'>{t('sellEnding')}</Text>}

        {(type === 1 || type === 2) && <Container>
          <Countdown valueStyle={{color: '#fff', fontSize: isMobile ? '22px' : '36px', fontWeight: 'bold', whiteSpace: 'pre'}} value={showDate} format="DD          HH          mm          ss"></Countdown>
          <TextContent>
            <TextTime margin={isMobile ? '0 8px' : '0 32px'}>{t('day')}</TextTime>
            <TextTime margin={isMobile ? '0 8px' : '0 32px'}>{t('hours')}</TextTime>
            <TextTime margin={isMobile ? '0 8px' : '0 32px'}>{t('minute')}</TextTime>
            <Text width='60px' margin={isMobile ? '0 8px' : '0 32px'}>{t('seconds')}</Text>
          </TextContent>
        </Container>}
        {type === 3 && <SoldedContent>
          <Text fontSize={isMobile ? '22px' : '36px'} fontWeight='bold'>{data.remainingNum === 0 ? t('soldOuted') : t('over')}</Text>
        </SoldedContent>}
        {type === 4 && <Flex mt='50px' justifyContent='center' alignItems='center'>
          <Text fontSize={isMobile ? '22px' : '36px'} fontWeight='bold'>{parseInt(((showDate % (1000 * 60 * 60)) / (1000 * 60)).toString())}</Text>
          <Text fontSize='14px' color='rgba(230, 238, 245, 0.8)' margin='0 10px'>{t('minute')}</Text>
          <Text fontSize={isMobile ? '22px' : '36px'} fontWeight='bold'>{(showDate % (1000 * 60)) / 1000}</Text>
          <Text fontSize='14px' color='rgba(230, 238, 245, 0.8)' margin='0 10px'>{t('seconds') + t('in')}</Text>
          <Text fontSize={isMobile ? '22px' : '36px'} fontWeight='600'>{t('soldOut')}</Text>
        </Flex>}
        <Flex mt={isMobile ? '20px' : '40px'} justifyContent='center' alignItems='center'>
          <Text fontSize={isMobile ? '12px' : '16px'}>{t('sellAmount')}</Text>
          <Text ml='15px' fontSize={isMobile ? '16px' : '20px'} fontWeight='bold'>{data.primary.totalSale}</Text>
          <Text ml='50px' fontSize={isMobile ? '12px' : '16px'}>{t('sellPrice')}</Text>
          <Image ml='8px' src={TOKEN_ICON + data.primary.tokenAddress + '.png'} size={isMobile ? '12px' : '16px'}/>
          <Text ml='5px' fontSize={isMobile ? '16px' : '20px'} fontWeight='bold'>{data.primary.salePrice} {data.primary.tokenName}</Text>
        </Flex>
        {!isMobile && <SwitchBtn colors={type === 3} left='30px' img={prevIcon} onClick={handlePrev}></SwitchBtn>}
        {!isMobile && <SwitchBtn colors={type === 3} right='30px' img={nextIcon} onClick={handleNext}></SwitchBtn>}
      </ContentStyle>
    )
  })

  useEffect(() => {
    setLoading(true)
    chaind && GET_PRIMARY_BANNER_ACTION({
      chain_id: chaind
    }).then((data: any) => {
      console.log(data)
      setLoading(false)
      setList(data.result)
    }).catch(() => {
      setLoading(false)
    })
  }, [chaind])

  return (
    <Wrapper>
      <Carousel ref={carouselRef} autoplay autoplaySpeed={5000}>
        {Item}
      </Carousel>
    </Wrapper>
  )
}
