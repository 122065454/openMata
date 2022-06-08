import { BigNumber } from '@ethersproject/bignumber'
import { SupportedChainId } from 'constants/chains'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const MAX_UINT128 = BigNumber.from(2).pow(128).sub(1)

const CHAIN_NAMES: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: 'ETH',
  [SupportedChainId.BSC]: 'BSC',
  [SupportedChainId.HECO]: 'HECO',
}

const LOCAL_CHAIN = Number(localStorage.getItem('openmeta_chainid')) ? Number(localStorage.getItem('openmeta_chainid')) : 56
const CHAIN =  CHAIN_NAMES[LOCAL_CHAIN]
const chainList: any = {
  'HECO': {
    NFT_ADDRESS: '0xF9Cd6E28b0d220f2275C7DC455C4ff87a8E27fF8',
    WITHDRAW_ADDRESS: '0x5655648a2468f8EF2E6224dFb5890fd1504bf8D0',
    BLOCK_URL: 'https://hecoinfo.com/block/countdown/',
    HASH_URL: 'https://hecoinfo.com/tx/',
    ADDRESS_URL: 'https://hecoinfo.com/address/',
    TOKEN_ICON: 'https://mdex.co/token-icons/heco/'
  },
  'BSC': {
    NFT_ADDRESS: '0x7dcdefb5F0844619aC16BCd5F36c3014EFa90931',
    WITHDRAW_ADDRESS: '0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1',
    BLOCK_URL: 'https://bscscan.com/block/countdown/',
    HASH_URL: 'https://bscscan.com/tx/',
    ADDRESS_URL: 'https://bscscan.com/address/',
    TOKEN_ICON: 'https://mdex.co/token-icons/bsc/'
  },
  'ETH': {
    NFT_ADDRESS: '0x7dcdefb5F0844619aC16BCd5F36c3014EFa90931',
    WITHDRAW_ADDRESS: '0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1',
    BLOCK_URL: 'https://etherscan.io/block/countdown/',
    HASH_URL: 'https://etherscan.io/tx/',
    ADDRESS_URL: 'https://etherscan.io/address/',
    TOKEN_ICON: 'https://mdex.co/token-icons/eth/'
  }
}

export const NFT_ADDRESS = chainList[CHAIN]?.NFT_ADDRESS

export const WITHDRAW_ADDRESS = chainList[CHAIN]?.WITHDRAW_ADDRESS

export const BLOCK_URL = chainList[CHAIN]?.BLOCK_URL

export const HASH_URL = chainList[CHAIN]?.HASH_URL

export const ADDRESS_URL = chainList[CHAIN]?.ADDRESS_URL

export const TOKEN_ICON = chainList[CHAIN]?.TOKEN_ICON

const hostname = window.location.hostname.replace('www.', '').replace('primary.', '')

export const OPENMETA_RL = `https://nft.${hostname}/`

// HECO 合约地址
export const HecoContractAddr = '0x800789F73AC950fdA2784c08B408Bb391f598042'

// BSC 合约地址
export const BscContractAddr = '0xf22cB0E5879ea69B8b2F5027Beb0e955B7eAce18'

// BSC 地址
export const BSCURL = 'https://bscscan.com/token/'

// HECO地址
export const HECOURL = 'https://hecoinfo.com/token/'
