import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Image } from 'rebass'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Header from '../components/Header'
import MdexNft from './MdexNft'
import Farm from './Farm'
import Primary from './Primary'
import treasureHunt from './treasureHunt'
import { Spin } from 'antd'
import { useLoading, useShowNav } from 'state/global/hooks'
import Footer from 'components/Footer'
import { setLanguage } from 'utils'
import loadIcon from '../assets/svg/loading.svg'
import Detail from './treasureHunt/detail/detail'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  overflow-x: hidden;
  min-height: 100vh;
`
const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  justify-content: space-between;
  z-index: 2;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  z-index: 1;
`
const pulse = keyframes`
  0% { transform: scale(1); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
`
const AnimatedImg = styled.div`
  width: 72px;
  height: 72px;
  animation: ${pulse} 800ms linear infinite;
  margin: -36px !important;
  & > img {
    width: 100%;
    width: 100%;
  }
`

export default function App() {
  const [loading] = useLoading()
  const [showNav,setShowNav] = useShowNav()

  useEffect(() => {
    setShowNav(true)
    setLanguage()
  }, [])

  return (
    // Suspense 数据加载之前页面呈现的内容
    <Suspense fallback={null}>
      <Route component={DarkModeQueryParamReader} />
      <Spin
        wrapperClassName="farm-spin"
        size="large"
        spinning={!!loading}
        indicator={
          <AnimatedImg>
            <Image src={loadIcon} />
          </AnimatedImg>
        }
      >
        <AppWrapper>
          <HeaderWrapper>{showNav && <Header />}</HeaderWrapper>
          <BodyWrapper>
            <Switch>
              <Route exact path="/" component={Primary} />
              <Route exact path="/mdexNft" component={MdexNft} />
              <Route exact path="/primary" component={Primary} />
              <Route exact path="/farm" component={Farm} />
              <Route exact path="/treasureHunt" component={treasureHunt} />
              <Route exact path="/treasureHunt/detail/:id" component={Detail} />
            </Switch>
          </BodyWrapper>
          {showNav && <Footer />}
        </AppWrapper>
      </Spin>
    </Suspense>
  )
}
