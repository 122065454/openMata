import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Image, Box, Link } from 'rebass'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import logoIcon from './images/logo.png'
import Chain from './Chain'
import Wallet from './Wallet'
import Language from './Language'
import { useHistory } from 'react-router-dom'
import { OPENMETA_RL } from 'constants/index'

const Wrapper = styled.div<{height?: string}>`
  display: flex;
  height: ${({height}) => height && height};
  line-height: ${({height}) => height && height};
  font-size: 18px;
  align-items: center;
  color: #183B56;
`
const Content = styled.div<{backgroundColor?: string, color?: string, active?: boolean}>`
  position: relative;
  font-size: 16px;
  color: ${({color, active}) => color ? color : active ? '#566FFE' : '#183B56'};
  font-weight: 500;
  background-color: ${({backgroundColor}) => backgroundColor && backgroundColor};
  margin-bottom: 24px;
  cursor: pointer;
`
const Switch = styled.div<{active?: boolean}>`
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 16px;
  background: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  ::before {
    content: "";
    position: absolute;
    top: 16px;
    left: 6px;
    width: 20px;
    height: 2px;
    background: #6f7d95;
    border-radius: 2px;
    transition: transform 0.2s;
    transform: translateY(-4px);
    ${({active}) => active && `
      transform: translateY(0) rotate(-45deg);
    `}
  }
  ::after {
    content: "";
    position: absolute;
    top: 16px;
    left: 6px;
    width: 20px;
    height: 2px;
    background: #6f7d95;
    border-radius: 2px;
    transition: transform 0.2s;
    transform: translateY(3px);
    ${({active}) => active && `
      transform: translateY(0) rotate(45deg);
    `}
  }
`
const NavList = styled.div<{active?: boolean}>`
  position: absolute;
  overflow: hidden;
  top: 77px;
  left: 0;
  right: 0;
  border-radius: 0 0 10px 10px;
  margin: 0 !important;
  background: #fff;
  width: 100%;
  padding: 40px;
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 17px 13px 0px #192c4b05;
  z-index: 9;
  opacity: 0;
  transform: translateY(-1rem) translateX(0);
  ${({active}) => active && `
    opacity: 1;
    transform: translateY(0) translateX(0);
  `}
`
const LinkText = styled(Link)<{active?: boolean}>`
  position: relative;
  color: ${({active}) => active ? '#566ffe' : '#183B56'};
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  :hover {
    color: #566ffe;
  }
`
const ComingSoon = styled.div<{left?: string, top?: string}>`
  position: absolute;
  left: ${({left}) => left && left};
  top: ${({top}) => top && top};
  height: 16px;
  line-height: 16px;
  padding: 0 4px;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  background-color: #FF9151;
`
const Logo = styled(Image)`
  width: 202px;
  height: 36px;
  ${isMobile && `
    width: 157px;
    height: 28px;
  `}
`

export default function Header (props:any) {
  const { t, i18n } = useTranslation()
  const [showLang, setShowLang] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const history = useHistory()
  const [pathName, setPathName] = useState('')
  // const pathName = history.location.pathname
  const handleClick = () => {
    setShowLang(!showLang)
  }

  useEffect(() => {
    setPathName(history.location.pathname)
  }, [])

  const handleSwitch = () => {
    setShowNav(!showNav)
  }
  const handleRoute = (route: string) => {
    setPathName(route)
    setShowNav(false)
    history.push(route)
  }
  const handleLink = (route: string) => {
    // @ts-ignore
    window.location.href = route + `?lang=${i18n.language}`
  }
  return (
    <Flex justifyContent='space-between' alignItems='center' padding={isMobile ? '0px 16px' : '0px 30px'} backgroundColor='#fff' style={{position: 'relative'}}>
      <Wrapper height={isMobile ? '44px' : '88px'}>
        <Logo mr={isMobile ? '0': '80px'} src={logoIcon}/>
        {!isMobile && <>
          <LinkText onClick={() => handleLink(OPENMETA_RL)}>{t('homepage')}</LinkText>
          <LinkText ml='50px' onClick={() => handleLink(OPENMETA_RL + '#/market')}>
            {t('marketplace')}
            {/* <ComingSoon left='94%' top='23%'>{t('comingsoon')}</ComingSoon> */}
          </LinkText>
          <LinkText ml='50px' active={pathName === '/primary' || pathName === '/'} onClick={() => handleRoute('/primary')}>
            Primary
          </LinkText>
          <LinkText ml='50px' active={pathName === '/farm'} onClick={() => handleRoute('/farm')}>{t('farm')}</LinkText>
          <LinkText ml='50px' active={pathName === '/treasureHunt'} onClick={() => handleRoute('/treasureHunt')}>{ t('treasure')}</LinkText>
        </>}
      </Wrapper>
      <Flex alignItems='center' style={{position: 'relative'}} onClick={handleClick}>
        <Chain />
        {!isMobile && <Box ml='20px'><Wallet></Wallet></Box>}
        {/* 多语言 */}
        <Language></Language>
        {/* 移动端展开按钮 */}
        {isMobile && <Switch onClick={handleSwitch} active={showNav}></Switch>}
      </Flex>
      {/* 移动端状态下 */}
      {showNav && <NavList active={showNav}>
        <Content onClick={() => handleLink(OPENMETA_RL)}>{t('homepage')}</Content>
        <Content onClick={() => handleLink(OPENMETA_RL + '#/market')}>
          {t('marketplace')}
          {/* <ComingSoon left='36%' top='16%'>{t('comingsoon')}</ComingSoon> */}
        </Content>
        <Content active={pathName === '/primary' || pathName === '/'} onClick={() => handleRoute('/primary')}>Primary</Content>
        <Content active={pathName === '/farm'} onClick={() => handleRoute('/farm')} >{t('farm')}</Content>
        <Content active={pathName === '/treasureHunt'} onClick={() => handleRoute('/treasureHunt')} >{t('treasure')}</Content>
        <Wallet></Wallet>
      </NavList>}
    </Flex>
  )
}