// import HECO_LOGO_URL from '../assets/images/heco-logo.png'
// import BSC_LOGO_URL from '../assets/images/bsc-logo.png'

export enum SupportedNetwork {
  ETHEREUM = 1,
  ARBITRUM,
  OPTIMISM,
  BSC = 56,
  HECO = 128,
}

export type NetworkInfo = {
  id: SupportedNetwork
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
  blurb?: string
}

export const EthereumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ETHEREUM,
  route: '',
  name: 'Ethereum',
  bgColor: '#fc077d',
  primaryColor: '#fc077d',
  secondaryColor: '#2172E5',
  imageURL: '',
}

export const HecoNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.HECO,
  route: 'heco',
  name: 'Heco',
  bgColor: '#2C72F4',
  primaryColor: '#2C72F4',
  secondaryColor: '#2172E5',
  imageURL: '',
}

export const BscNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.BSC,
  route: '',
  name: 'Bsc',
  imageURL: 'BSC_LOGO_URL',
  bgColor: '#E5A800',
  primaryColor: '#E5A800',
  secondaryColor: '#96BEDC',
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [BscNetworkInfo, HecoNetworkInfo]
