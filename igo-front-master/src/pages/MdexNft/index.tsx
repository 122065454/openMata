import React, { useEffect } from 'react'
import { Text, Flex, Box, Image } from 'rebass'
import { isMobile } from 'react-device-detect'

import part2Icon from './images/p2-icon2.png'
import part2bg from './images/p2-icon.png'
import part2bg1 from './images/p2-icon1.png'
import part2Sidebg1 from './images/p2-bg1.png'
import part2Sidebg2 from './images/p2-bg2.png'
import part2Sidebg3 from './images/p2-bg3.png'
import part2Sidebg4 from './images/p2-bg4.png'
import part2Sidebg5 from './images/p2-bg5.png'

import Roles from './Roles'
import Scene from './Scene'
import { Animate, Animate1, Logo, LogoContent, LogoFour, LogoOne, LogoThree, LogoTwo, ImageContent, PartiiImg, TextStroke, TextTitle, Wrapper, LangWrapper, IntroTitle, Button, VideoWrapper } from './styled'
import { useTranslation } from 'react-i18next'
import { useShowNav } from 'state/global/hooks'
import Language from 'components/Header/Language'
import demo from '../../assets/mdex.mp4'
import { useHistory } from 'react-router-dom'

export default function MdexNft() {
  const { t } = useTranslation()
  const [, setShowNav] = useShowNav()
  const history = useHistory()

  const handleClick = () => {
    history.push('/primary')
  }

  useEffect(() => {
    setShowNav(false)
  }, [])

  return (
    <Wrapper>
      <LangWrapper>
        <Language></Language>
      </LangWrapper>
      <VideoWrapper>
        <video width='100%' height='auto' loop autoPlay muted playsInline>
          <source src={demo} type='video/mp4'/>
        </video>
      </VideoWrapper>
      <Logo>
        <LogoOne></LogoOne>
      </Logo>
      <LogoContent>
        <LogoTwo></LogoTwo>
        <LogoFour></LogoFour>
        <LogoThree></LogoThree>
      </LogoContent>
      <TextTitle>
        <Text>{t('title')}</Text>
        <TextStroke>{t('title')}</TextStroke>
      </TextTitle>
      <Button onClick={handleClick}>{t('buy')}</Button>
      {!isMobile && <IntroTitle>{t('storyTitle')}</IntroTitle>}
      <Flex flexDirection={isMobile ? 'column-reverse' : 'row'} alignItems='center' justifyContent='center' style={{position: 'relative'}}>
        {!isMobile && <>
          <ImageContent width='223px' height='163px' left='79px' top='-251px'>
            <Animate>
              <Image src={part2Sidebg1}/>
            </Animate>
          </ImageContent>
          <ImageContent width='135px' height='123px' left='79px' top='-74px'>
            <Image src={part2Sidebg2}/>
          </ImageContent>
          <ImageContent width='266px' height='194px' right='93px' top='-249px'>
            <Animate>
              <Image src={part2Sidebg3}/>
            </Animate>
          </ImageContent>
          <ImageContent width='267px' height='285px' left='40px' bottom='-342px'>
            <Animate>
              <Image src={part2Sidebg4}/>
            </Animate>
          </ImageContent>
          <ImageContent width='321px' height='321px' right='67px' bottom='-325px'>
            <Animate>
              <Image src={part2Sidebg5}/>
            </Animate>
          </ImageContent>
        </>}
        {isMobile && <>
          <ImageContent width='80px' height='58px' left='55px' top='-95px'>
            <Animate>
              <Image src={part2Sidebg1}/>
            </Animate>
          </ImageContent>
          <ImageContent width='40px' height='37px' left='20px' top='35px'>
            <Image src={part2Sidebg2}/>
          </ImageContent>
          <ImageContent width='101px' height='74px' right='39px' top='-105px'>
            <Animate>
              <Image src={part2Sidebg3}/>
            </Animate>
          </ImageContent>
          <ImageContent width='94px' height='100px' left='39px' bottom='-104px'>
            <Animate>
              <Image src={part2Sidebg4}/>
            </Animate>
          </ImageContent>
          <ImageContent width='130px' height='130px' right='38px' bottom='-110px'>
            <Animate>
              <Image src={part2Sidebg5}/>
            </Animate>
          </ImageContent>
        </>}

        <Box width={isMobile ? '341px' : '518px'} mt={isMobile ? '30px' : '0px'} color='#fff' mr={isMobile ? '0' : '64px'} fontSize={isMobile ? '12px' : '16px'}>
          <Text>{t('storyText1')}</Text>
          <Text mb='20px'>{t('storyText2')}</Text>
          <Text mb='20px'>{t('storyText3')}</Text>
          <Text mb='20px'>{t('storyText4')}</Text>
          <Text mb='20px'>{t('storyText5')}</Text>
          <Text mb='20px'>{t('storyText6')}</Text>
        </Box>
        <PartiiImg>
          {!isMobile && <>
            <ImageContent width='87px' height='87px' top='-52px' left='-37px'>
              <Image src={part2bg}/>
            </ImageContent>
            <ImageContent width='220px' height='220px' top='-95px' left='274px'>
              <Animate1>
                <Image src={part2bg1}/>
              </Animate1>
            </ImageContent>
          </>}
          {isMobile && <>
            <ImageContent width='47px' height='48px' top='-24px' left='-23px'>
              <Image src={part2bg}/>
            </ImageContent>
            <ImageContent width='118px' height='118px' top='-59px' left='137px'>
              <Animate1>
                <Image src={part2bg1}/>
              </Animate1>
            </ImageContent>
          </>}
          <Image width='100%' height='100%' src={part2Icon}/>
        </PartiiImg>
        {isMobile && <Text textAlign='center' fontSize='28px' fontWeight='bold' mb='69px' color='#fff'>{t('storyTitle')}</Text>}
      </Flex>

      <Roles></Roles>

      <Scene></Scene>
    </Wrapper>
  )
}