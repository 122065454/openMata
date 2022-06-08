import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import NFTDEPOSITABI from '../constants/abis/nftMining.json'


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

export const getContract = async (contractAddress: string) => {
  const provider = await getSigner()
  return new ethers.Contract(contractAddress, NFTDEPOSITABI, provider)
}

// 获取用户nft
export const getNftArray = async (account: string, contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  return nftContract['getUserAllNFT'](account)
}

// 质押nft、提取奖励
export const onDeposit = async (tokens: any[], contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  return nftContract['deposit'](tokens)
}

// 用户总奖励
export const getUserReward = async (account: string, contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  // const decimal = await nftContract['decimals']()
  const reward = await nftContract['pending'](account)
  return ethers.utils.formatUnits(reward, 18)
}

// 用户质押nft tokenid
export const getUserNftAmount = async (account: string, contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  return nftContract['getUserDepositTokenID'](account)
}

// 提取质押nft
export const onWithdrawNft = async (tokens: any[], contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  return nftContract['withdraw'](tokens)
}
// 池子总质押nft数量
export const getPoolAmount = async (contractAddress: string) => {
  const nftContract = await getContract(contractAddress)
  const result = await nftContract['getAllLevelAmount'](4)
  return result.toString()
}