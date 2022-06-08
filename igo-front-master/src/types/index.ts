import { BigNumber } from "ethers"

export type IParam = {
  chain_id: number
  startTime: number
  endTime: number
  pairAddress?: string
  pairAddressArr?: string
  queryType?: string
  tokenAddress?: string
  sortBy?: string
  sortDirection?: string
}

export type Role = {
  name: string
  logo: string
  rarity: number
  nameBg: string
  text1: string
  text2: string
}

export type NftInfo = {
  id: BigNumber
  images: string
  name: string
}

export type NftParam = {
  chain_id: number
  tokenIds: string
  nftPoolCode?: string
  accountAddress: string
}

export type PoolParam = {
  chain_id: number
  isActive: boolean
  keyword?: string
  accountAddress?: string
  isPrivate: boolean
}