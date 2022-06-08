import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text, Flex } from 'rebass'
import { isMobile } from 'react-device-detect'
import { Activity } from 'react-feather'

import { ReactComponent as HecoImg } from './images/heco.svg'
import { ReactComponent as BscImg } from './images/bsc.svg'
import { ReactComponent as ETHImg } from './images/eth.svg'
import { ReactComponent as ArrowImg } from './images/arrow-down.svg'
import { useChain } from 'state/global/hooks'
import { changeChainOperate } from 'utils/publicErc20'
import { useTranslation } from 'react-i18next'
import { AppState } from 'state'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../state/index'
import { updateSelectChain } from 'state/global/actions'
const Wrapper = styled.div`
  position: relative;
  display: flex;
  user-select: none;
`
const HecoIcon = styled(HecoImg)<{size?: string}>`
  width: ${({size})=> size && size};
  height: ${({size})=> size && size};
`
const BscIcon = styled(BscImg)<{size?: string}>`
  width: ${({size})=> size && size};
  height: ${({size})=> size && size};
`

const ETHIcon = styled(ETHImg)<{size?: string}>`
  width: ${({size})=> size && size};
  height: ${({size})=> size && size};
`

const ArrowIcon = styled(ArrowImg)`
  width: 16px;
  height: 16px;
`
const Options = styled.div`
  position: absolute;
  top: 140%;
  ${isMobile && `
    top:100%
  `}
  right: 0;
  width: 146px;
  padding: 6px 0 6px 0px;
  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #E2EEF1;
  color: #6F7D95;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`
const Option = styled(Flex)`
  padding: 8px 0;
  padding-left: 20px;
  align-items: center;
  :hover {
    background: #E6F7FF;
    color: #566FFE;
  }
`
const WrongButton = styled.div`
  background-color: #ff6871;
  color: #fff;
  padding: 10px 15px;
  text-align: center;
  border-radius: 24px;
  font-size: 16px;
`
const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

const chainList: any = {
  56: 'BSC',
  128: 'HECO',
  1: 'Ethereum'
}

export default function Chain() {
  const chainid = useChain()
  const { t } = useTranslation()
  const defaultValue = chainid && chainList[chainid] || ''
  const [chainName, setChainName] = useState(defaultValue)
  const [showItem, setShowItem] = useState(false)
  const dispatch = useDispatch()

  const BSCConfig = {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    name: 'BSC',
    symbol: 'BNB',
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  }

  const HECOConfig = {
    chainId: '0x80',
    chainName: 'Heco Mainnet',
    name: 'Heco',
    symbol: 'HT',
    rpcUrls: ['https://http-mainnet-node.huobichain.com'],
    blockExplorerUrls: ['https://hecoinfo.com'],
  }
  // 切换链
  const handleClick = (key: number) => {
    const chainId = key.toString(16)
    if (key == 56) {
      BSCConfig.chainId = '0x' + chainId
      changeChainOperate(BSCConfig).then(() => {
        setShowItem(false)
        setChainName(chainList[key])
      }).catch(() => {
        setShowItem(false)
      })
      dispatch(updateSelectChain({ showSelectChaind: false }))
    }
    if (key == 128) {
      HECOConfig.chainId = '0x' + chainId
      changeChainOperate(HECOConfig).then(() => {
        setShowItem(false)
        setChainName(chainList[key])
      }).catch(() => {
        setShowItem(false)
      })
      dispatch(updateSelectChain({ showSelectChaind: false }))
    }
    if (key == 1) {
      changeChainOperate({chainId: 1}).then(() => {
        setShowItem(false)
        setChainName(chainList[key])
      }).catch(() => {
        setShowItem(false)
      })
      dispatch(updateSelectChain({ showSelectChaind: false }))
    }
  }

  // 
  const changeShowChain = () => {
    let showSelectChain = store.getState().global.showSelectChaind
    if (showSelectChain) {
      setShowItem(true)
    } else {
      setShowItem(false)
    }
  }

  // 监听store
  useEffect(() => {
    let subscribe = store.subscribe(() => {
      changeShowChain()
    })
    return () => {
      subscribe()
    }
  },[])

  // 打开链切换
  const showChainSelectHandler = () => {
    changeShowChain()
    setShowItem(!showItem)
  }

  return (
    <Wrapper className="WrapperChain">
      {!isMobile && <Flex onClick={() => setShowItem(!showItem)} height='40px' alignItems='center' style={{cursor: 'pointer', borderRadius: '20px'}}>
        {chainName === 'HECO' && <HecoIcon size='32px'/>}
        {chainName === 'BSC' && <BscIcon size='32px'/>}
        {chainName === 'Ethereum' && <ETHIcon size='32px'/>}
        {(chainid && chainid !== 56 && chainid!== 128 && chainid!== 1) && <WrongButton onClick={() => setShowItem(!showItem)}>
          <NetworkIcon/>
          <span>{t('wrongNetwork')}</span>
        </WrongButton>}
        {/* <Text ml='15px' mr='10px' fontSize='16px' color='#6F7D95' fontWeight='500'>{chainName}</Text> */}
        {/* <ArrowIcon/> */}
      </Flex>}
      {isMobile && <Flex onClick={showChainSelectHandler} height='77px' alignItems='center' style={{cursor: 'pointer'}}>
        {chainName === 'HECO' && <HecoIcon size='24px'/>}
        {chainName === 'BSC' && <BscIcon size='24px'/>}
        {chainName === 'Ethereum' && <ETHIcon size='24px'/>}
      </Flex>}

      {showItem && <Options>
        <Option onClick={() => handleClick(56)}>
          <BscIcon />
          <Text ml='15px'>BSC</Text>
        </Option>
        <Option onClick={() => handleClick(128)}>
          <HecoIcon />
          <Text ml='15px'>HECO</Text>
        </Option>
        <Option onClick={() => handleClick(1)}>
          <ETHIcon />
          <Text ml='15px'>Ethereum</Text>
        </Option>
      </Options>}
    </Wrapper>
  )
}