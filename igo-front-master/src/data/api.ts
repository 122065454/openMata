import { NftParam, PoolParam } from 'types'
import httpRequest from 'utils/request'
// import { request } from 'utils/request'

const BASE_URL = 'https://farm.openmeta.name/'
// const BASE_URL = 'http://172.16.1.13:7001/'

// pool info
export function GET_POOL_LIST_ACTION(params: PoolParam) {
  // return request(BASE_URL + 'nftPool', params, 'get')
  return httpRequest({
    url: 'nftPool',
    params,
  })
}

// nft info
export function GET_NFT_INFO_ACTION(params: NftParam) {
  // return request(BASE_URL + 'nft', params, 'get')
  return httpRequest({
    url: 'nft',
    params
  })
}

export function GET_USER_INFO_ACTION({ address } : { address: string }) {
  // return request('https://api.openmeta.name/api/v1/public/user-info', {address}, 'get')
  return httpRequest({
    url: 'https://api.openmeta.name/api/v1/public/user-info',
    params: { address },
    method:'get',
  })
}

export function GET_NFT_EFFICIENCY_ACTION({ accountAddress, chain_id, nftPoolCode, tokenIds } : {
  accountAddress: string | undefined
  chain_id: string | number | null
  nftPoolCode: string
  tokenIds: string[]
}) {
  // return request(BASE_URL + 'nftPool/account/efficiency/total', { accountAddress, chain_id, nftPoolCode, tokenIds }, 'post')
  return httpRequest({
    url: 'nftPool/account/efficiency/total',
    data: { accountAddress, chain_id, nftPoolCode, tokenIds },
    method:'post'
  })
}

export function GET_PRIMARY_LIST_ACTION({
  chain_id,
  queryType,
  sortBy = 'createdTime',
  sortDirection = 'DESC'
} : {
  chain_id: number
  page?: number
  pageSize?: number
  sortBy?: 'createdTime' | 'updatedTime'
  sortDirection?: 'DESC' | 'ASC'
  queryType?: 'started' | 'ended'
}) {
  // return request(BASE_URL + 'primary', { chain_id, queryType, sortBy, sortDirection }, 'get')
  return httpRequest({
    url: 'primary',
    params: { chain_id, queryType, sortBy, sortDirection }
  })
}

export function GET_PRIMARY_BANNER_ACTION({
  chain_id
} : {
  chain_id: number
}) {
  // return request(BASE_URL + 'banner/primary', { chain_id }, 'get')
  return httpRequest({
    url: "banner/primary",
    params:{chain_id}
  })
}

export function GET_USER_WHITELIST_ACTION({
  account,
  chain_id
} : {
  account: string | undefined,
  chain_id: number | null
}) {
  // return request('https://whitelist.openmeta.trade/nft/bindbox/user', { account, chain_id }, 'get')
  return httpRequest({
    url: "https://whitelist.openmeta.trade/nft/bindbox/user",
    params:{ account, chain_id }
  })
}