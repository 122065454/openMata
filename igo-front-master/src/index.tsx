import React, { StrictMode } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import './i18n'
import App from './pages/App'
import store from './state'
import UserUpdater from './state/user/updater'
import GlobalUpdater from './state/global/updater'
import ApplicationUpdater from './state/application/updater'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from './theme'
import 'antd/dist/antd.css'
// import './assets/css/font.css'

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID)
  ReactGA.set({
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}

window.addEventListener('error', (error) => {
  ReactGA.exception({
    description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
    fatal: true,
  })
})

function Updaters() {
  return (
    <>
      <UserUpdater />
      <ApplicationUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <FixedGlobalStyle />
    <Provider store={store}>
      <Updaters />
      <ThemeProvider>
        <ThemedGlobalStyle />
        <HashRouter>
          <GlobalUpdater />
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
