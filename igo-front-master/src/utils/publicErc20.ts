import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'
import ERC20ABI from '../constants/abis/erc20.json'
import NftMiningABI from '../constants/abis/nftMining.json'
import NFTABI from '../constants/abis/nft.json'
import { NFT_ADDRESS } from '../constants'

export const MaxUint256: string =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

// getProvide
export const getProvide = async () => {
  const provider = await detectEthereumProvider()
  return provider
}

// 是否连接到钱包metamask
export const isConnect = async () => {
  const ethereum: any = await getProvide()
  return ethereum.isConnected()
}

// 连接到钱包metamask
export const connect = async () => {
  const ethereum: any = await getProvide()
  return ethereum.request({ method: 'eth_requestAccounts' }) // wait for package update
}

// 获取签名者
export const getSigner = async () => {
  const ethereum: any = await getProvide()
  const provider = new ethers.providers.Web3Provider(ethereum)
  return provider.getSigner()
}

// 获取签名
export const getSign = async(data:any) => {
  const signer = await getSigner()
  return signer.signMessage(data)
}

/** get the contract of the address
@param address -> erc20 address
@description 获取合约
**/
export const getContract = async (address: string, abi: any) => {
  const provider = await getSigner()
  return new ethers.Contract(address, abi, provider)
}

// 获取chainId
export const getChainId = async () => {
  const ethereum: any = await getProvide()
  return ethereum.request({ method: 'eth_chainId' })
}

// 监听链是否发生变化
export const onChainChanged = async (callback: any) => {
  const ethereum: any = await getProvide()
  ethereum.on('chainChanged', (chainId: string) => {
    callback(chainId)
  })
}

// 切换链
export const switchChain = async (chainId: string) => {
  const ethereum: any = await getProvide()
  return ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: chainId,
      },
    ],
  })
}
// 账号切换
export const onAccountChange = async (callback: any) => {
  const ethereum: any = await getProvide()
  ethereum.on('accountsChanged', (account: string[]) => {
    callback(account)
  })
}

export const OnDeposit = async (nftToken: string, contractAddr: string) => {
  const DepositNftContract = await getContract(contractAddr, NftMiningABI)
  return DepositNftContract['deposit'](nftToken)
}

// 获取nft总量
export const getNftTotal = async (account: string) => {
  const nftContract = await getContract(NFT_ADDRESS, NFTABI)
  return nftContract['balanceOf'](account)
}
export const getDecimals = async (tokenAddress: string) => {
  const tokenContract = await getContract(tokenAddress, ERC20ABI)
  const decimal = await tokenContract['decimals']()
  return decimal
}

export const importToken = async (address: string, symbol: string) => {
  const tokenDecimals = await getDecimals(address)
  const ethereum: any = window.ethereum
  if (ethereum && ethereum.request) {
    ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals: tokenDecimals,
          image: '',
        },
      },
    })
  }
}

/** 切换链
@param chainId -> chain Id
@param chainName -> chain Name
@param name -> chain stort name
@param symbol -> chain base symbol
@param rpcUrls -> chain rpc url
@param blockExplorerUrls -> chain block Explorer
**/
export const changeChainOperate = async (config: any) => {
  const ethereum: any = await getProvide()
  // 以太坊
  if (config.chainId === 1) {
    return ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x1',
        },
      ],
    })
  } else {
    const { chainId, chainName, name, symbol, rpcUrls, blockExplorerUrls, decimals = 18 } = config
    return ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId,
          chainName,
          nativeCurrency: {
            name,
            symbol,
            decimals,
          },
          rpcUrls,
          blockExplorerUrls,
        },
      ],
    })
  }
}

// 获取地址
export const getAddress = async () => await connect()


// 监听网络切换
export const changeNetWork = async (callBack:Function) => {
  const ethereum: any = await getProvide()
  ethereum.on('networkChanged',  (networkId: string) => callBack(networkId));
}
