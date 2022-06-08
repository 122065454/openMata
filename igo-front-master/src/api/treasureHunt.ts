/*
 * @Author: Aaron
 * @Date: 2022-04-19 10:44:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-23 15:31:24
 * @Description: 寻宝相关api
 * @FilePath: \igo-front\src\api\treasureHunt.ts
 */

import httpRequest from 'utils/request'

// 获取寻宝列表
export const getTreasureHuntListApi = async (params: any) => {
  let data = {
    url: `nftAirdrop`,
    params,
    headers: {} as any,
  }
  return httpRequest(data)
}


interface IgetDetail{
  id: string
  chain_id:number,
  address: string | undefined
}

// 获取寻宝详情
export const getNftAirdropIdApi = (params: IgetDetail) => {
  return httpRequest({
    url: `nftAirdrop/${params.id}?chain_id=${params.chain_id}`,
  })
}

interface IreceiveNft {
  chain_id: number
  sign: string
  nftAirdropId: string
  nonce: string,
  address: string | undefined
}
// 领取空投
export const receiveNftAirdropApi = async(data: IreceiveNft) => {
  return httpRequest({
    url: '/nftAirdrop/receive',
    method: 'post',
    data,
  })
}

// 获取寻宝banner
export const getPublicBannerList = async(params:any) => {
  return httpRequest({
    url: '/banner/nftAirdrop',
    params,
  })
}