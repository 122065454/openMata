import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Image } from 'rebass'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import walletIcon from './images/wallet.svg'
import centerIcon from '../../assets/svg/center.svg'

import { useAccount } from 'state/global/hooks'
import { AppDispatch } from 'state'

import { shortenAddress } from 'utils'
import { connect, isConnect } from 'utils/publicErc20'
import { updateAccount } from 'state/global/actions'
import { GET_USER_INFO_ACTION } from 'data/api'
import { OPENMETA_RL } from 'constants/index'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  position: relative;
  height: 32px;
  border-radius: 21px;
  overflow: hidden;
  cursor: pointer;
`
const ImgContent = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 19px;
  overflow: hidden;
  background-color: gray;
`

export default function Wallet() {
  const { i18n } = useTranslation()
  const account = useAccount()
  const dispatch = useDispatch<AppDispatch>()
  const [logoURL, setLogoURL] = useState('')

  const handleClick = () => {
    connect().then(address => {
      console.log(address)
      dispatch(updateAccount({account: address[0]}))
    }).catch((err: any) => {
      dispatch(updateAccount({account: ''}))
    })
  }

  const handleLink = () => {
    // @ts-ignore
    window.location.href = OPENMETA_RL + '#/profile' + `?lang=${i18n.language}`
  }

  useEffect(() => {
    account && GET_USER_INFO_ACTION({address: account}).then((result: any) => {
      const info = result.data?.info
      if (info && info.logo) {
        const url = 'https://static.openmeta.name/' + info.logo
        setLogoURL(url)
      }
    })
  }, [account])

  return (
    <Wrapper>
      {!account ? <Flex onClick={handleClick} height='100%' padding='0 20px' justifyContent='center' alignItems='center' style={{background: 'linear-gradient(180deg, #3FB6FD 0%, #4381FE 41%, #DB74FF 100%)'}}>
        <Image size='20px' src={walletIcon}></Image>
        <Text ml='5px' color='#fff' fontWeight='500'>链接钱包</Text>
      </Flex> :
      <Flex height='100%' justifyContent='center' alignItems='center' backgroundColor='#F9FBFC' style={{borderRadius: '20px', position: 'relative'}}>
        {isMobile && <Text paddingRight='35px' ml='5px' color='#252526' fontWeight='bold'>{shortenAddress(account)}</Text>}
        <ImgContent onClick={handleLink}>
          {logoURL ? <Image src={logoURL} size='32px'/> :
          <Image src={centerIcon} size='32px'/>}
        </ImgContent>
      </Flex>}
    </Wrapper>
  )
}