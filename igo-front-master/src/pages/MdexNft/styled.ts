import styled, { keyframes } from 'styled-components'
import { isMobile } from 'react-device-detect'

import bgIcon from './images/background.png'
import logoIcon from './images/logo.png'
import logo1Icon from './images/portrait1.png'
import logo2Icon from './images/portrait2.png'
import logo3Icon from './images/portrait3.png'
import logo4Icon from './images/portrait4.png'

export const translate = keyframes`
  from {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(5px, 10px);
  }

  to {
    transform: translate(0px, 0px);
  }
`
export const translate1 = keyframes`
  from {
    transform: translate(0px, 0px);
  }

  50% {
    transform: translate(6px, 5px);
  }

  to {
    transform: translate(0px, 0px);
  }
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: url(${bgIcon}) center no-repeat;
  background-size: cover;
`
export const LangWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 100;
`
export const Logo = styled.div`
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 968px;
  height: 247px;
  background: url(${logoIcon}) center no-repeat;
  background-size: cover;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    top: 100px;
    width: 580px;
    height: 148px;
  }

  ${isMobile && `
    top: 74px;
    width: 291px;
    height: 74px;
  `}
`
export const LogoOne = styled.div`
  position: absolute;
  top: 20px;
  left: -103px;
  width: 278px;
  height: 278px;
  background: url(${logo1Icon}) center no-repeat;
  background-size: cover;
  animation: ${translate} 3s ease-in-out 0.33s infinite both;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    width: 167px;
    height: 167px;
    top: 9px;
    left: -65px;
  }
  ${isMobile && `
    top: 6px;
    left: -30px;
    width: 84px;
    height: 84px;
  `}
`
export const LogoContent = styled.div`
  position: absolute;
  width: 876px;
  top: 386px;
  left: 0;
  right: 0;
  margin: 0 auto;
  ${isMobile && `
    width: 263px;
    top: 144px;
  `}
  @media screen and (min-width: 980px) and (max-width: 1440px){
    width: 533px;
    top: 225px;
  }
`
export const LogoTwo = styled.div`
  position: absolute;
  top: 37px;
  left: 0;
  width: 314px;
  height: 293px;
  background: url(${logo2Icon}) center no-repeat;
  background-size: contain;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    width: 188px;
    height: 176px;
  }
  ${isMobile && `
    width: 95px;
    height: 89px;
    top: 11px;
  `}
`
export const LogoThree = styled.div`
  position: absolute;
  top: 0;
  left: 274px;
  width: 338px;
  height: 336px;
  background: url(${logo3Icon}) center no-repeat;
  background-size: contain;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    top: -16px;
    left: 173px;
    width: 202px;
    height: 268px;
  }
  ${isMobile && `
    left: 82px;
    width: 102px;
    height: 101px;
  `}
`
export const LogoFour = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 305px;
  height: 329px;
  background: url(${logo4Icon}) center no-repeat;
  background-size: contain;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    top: 15px;
    width: 183px;
    height: 197px;
  }
  ${isMobile && `
    width: 92px;
    height: 99px;
  `}
`
export const TextTitle = styled.div`
  position: absolute;
  top: 747px;
  left: 0;
  right: 0;
  font-size: 60px;
  font-weight: bold;
  color: #FFFFFF;
  -webkit-text-stroke: 10px #2D3B54;
  text-align: center;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    top: 480px;
  }
  ${isMobile && `
    top: 240px;
    font-size: 24px;
  `}
`
export const Button = styled.div`
  position: absolute;
  top: 880px;
  left: 50%;
  width: 230px;
  height: 60px;
  transform: translateX(-50%);
  line-height: 60px;
  background: #47BBF5;
  border-radius: 16px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    top: 600px;
  }
  ${isMobile && `
    top: 380px;
  `}
`
export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }
`
export const IntroTitle = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 80px;
  color: #fff;
  @media screen and (min-width: 980px) and (max-width: 1440px){
    margin-top: 170px;
  }
  ${isMobile && `
    margin-top: 139px;
  `}
`
export const TextStroke = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  -webkit-text-stroke: 0px #fff;
`
export const PartiiImg = styled.div`
  position: relative;
  width: 622px;
  height: 380px;
  background: #37374C;
  border: 15px solid #37374C;
  border-radius: 10px;
  ${isMobile && `
    width: 336px;
    height: 207px;
    border: 10px solid #37374C;
  `}
`
export const ImageContent = styled.div<{top?: string, left?: string, right?: string, bottom?: string, width: string, height: string}>`
  position: absolute;
  top: ${({top}) => top && top};
  left: ${({left}) => left && left};
  right: ${({right}) => right && right};
  bottom: ${({bottom}) => bottom && bottom};

  width: ${({width}) => width && width};
  height: ${({height}) => height && height};
  >img {
    width: 100%;
    height: 100%;
  }
`
export const Animate = styled.div`
  animation: ${translate} 3s ease-in-out 0.33s infinite both;
`
export const Animate1 = styled.div`
  animation: ${translate1} 3s ease-in-out 0.33s infinite both;
`