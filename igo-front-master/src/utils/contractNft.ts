import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { NFT_ADDRESS } from '../constants'
import NFTABI from '../constants/abis/nft.json'


// getProvide
export const getProvide = async() => {
  const provider = await detectEthereumProvider()
  return provider
}

export const getSigner = async() => {
  const ethereum: any = await getProvide()
  const provider = new ethers.providers.Web3Provider(ethereum)
  return provider.getSigner()
}

export const getContract = async (address?: string) => {
  const provider = await getSigner()
  return new ethers.Contract(address ? address : NFT_ADDRESS, NFTABI, provider)
}

// 获取用户nft
export const getNftInfo = async (tokenId: string) => {
  const nftContract = await getContract()
  return nftContract['tokenURI'](tokenId)
}

// 查询是否授权所有nft
export const getApproveAll = async(account: string, contractAddress: string) => {
  const nftContract = await getContract()
  return nftContract['isApprovedForAll'](account, contractAddress)
}

// 授权所有nft
export const onApproveAll = async(contractAddress: string) => {
  const nftContract = await getContract()
  return nftContract['setApprovalForAll'](contractAddress, true)
}