import React, { useEffect, useState } from 'react'
import { Text, Flex, Box, Image, Link } from 'rebass'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ReactComponent as Question } from '../images/question.svg'
import foldIcon from '../images/fold.svg'
import arrowDown from '../images/arrow-down.svg'
import arrowUp from '../images/arrow-up.svg'
import shareIcon from '../images/share.svg'

import Counter from './Counter'
import { useAccount, useChain, useLoading } from 'state/global/hooks'
import { getNftArray, getPoolAmount, getUserNftAmount, getUserReward, onDeposit as onExtract } from 'utils/contractNftMining'
import { Modal, Tooltip } from 'antd'
import ModalDeposit from './Modal'
import { importToken } from 'utils/publicErc20'
import { ADDRESS_URL, BLOCK_URL, HASH_URL } from '../../../constants'
import notifiy from 'components/Notification'
import { GET_NFT_EFFICIENCY_ACTION } from 'data/api'

const Container = styled.div<{height: string}>`
  position: relative;
  width: 380px;
  height: ${({height}) => height && height};
  padding: 30px 30px 0px 30px;
  margin-right: 30px;
  margin-bottom: 100px;
  border-radius: 40px 40px 0px 0px;
  background-color: #fff;
`
const HeadIcon = styled.div<{bgImg?: string}>`
  position: absolute;
  width: 100%;
  height: 130px;
  top: 0px;
  left: 0px;
  border-radius: 40px 40px 0px 0px;
  background: ${({bgImg}) => bgImg && `url(${bgImg}) no-repeat center`};
  background-size: cover;
`
const Head = styled.div`
  position: absolute;
  width: 100%;
  height: 130px;
  top: 0px;
  left: 0px;
  padding: 30px;
  border-radius: 40px 40px 0px 0px;
  background-color: rgba(0, 0, 0, 0.45);
  font-weight: bold;
  color: #fff;
`
const TokenLogo = styled(Image)`
  position: absolute;
  right: 50px;
  top: 30px;
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid #fff;
`
const SeriesLogo = styled(Image)`
  position: absolute;
  right: 30px;
  top: 60px;
  border-radius: 25px;
  overflow: hidden;
  border: 2px solid #fff;
`
const Line = styled.div`
  margin: 15px 0px;
  height: 1px;
  background-color: #E2EEF1;
`
const QuestionIcon = styled(Question)`
  width: 16px;
  height: 16px;
  margin-top: 3px;
  margin-left: 5px;
`
const Button = styled.div<{background?: string}>`
  height: 36px;
  padding: 0px 25px;
  color: #fff;
  font-size: 14px;
  line-height: 36px;
  font-weight: bold;
  background: ${({background}) => background ? background : 'linear-gradient(180deg, #3FB6FD 0%, #4381FE 41%, #DB74FF 100%)'};
  border-radius: 18px;
  cursor: pointer;
`
const Fold = styled.div`
  position: absolute;
  width: 100%;
  height: 54px;
  bottom: -54px;
  left: 0;
  background: url(${foldIcon}) center no-repeat;
  background-size: contain;
  text-align: center;
  > img {
    margin-top: 26px;
  }
  ${isMobile && `
    bottom: -50px;
  `}
`
const Info = styled.div`
  color: #566FFE;
  font-weight: 500;
`

export default function Card({
  data,
  isActive,
  initList
} : {
  data: any
  isActive: boolean
  initList: () => void
}) {
  const CONTRACT_ADDRESS = data.nftMiningContractAddress
  const { t, i18n } = useTranslation()
  const [, updateLoading] = useLoading()
  const account = useAccount()
  const chain_id = useChain()

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(-1)
  const [fold, setFold] = useState(false)
  const [amount, setAmount] = useState('0')
  const [reward, setReward] = useState('0')
  const [allNftAmount, setAllNftAmount] = useState('0')
  // 我的挖矿效率
  const [efficiency, setEfficiency] = useState(0)
  const [userNftAmount, setUserNftAmount] = useState(0)

  const handleModal = (type: number) => {
    if((type === 0 && Number(amount) === 0) || (type === 1 && userNftAmount === 0)) {
      notifiy({
        type: 'fail',
        message: t('noMessage'),
        description: ''
      })
      return
    }
    setShowModal(true)
    setModalType(type)
  }
  // extract reward
  const handleExtract = () => {
    updateLoading(true)
    onExtract([], CONTRACT_ADDRESS).then((data: any) => {
      data.wait().then((result: any) => {
        updateLoading(false)
        notifiy({
          type: 'success',
          message: t('extractSuccess'),
          description: <Link href={HASH_URL + result.transactionHash} target='_blank'>{t('checkHash')}</Link>
        })
        getReward()
      }).catch((err: any) => {
        notifiy({
          type: 'fail',
          message: t('extractFail'),
          description: <Link href={HASH_URL + err.transactionHash}>{t('checkHash')}</Link>
        })
        updateLoading(false)
      })
    }).catch(() => {
      updateLoading(false)
    })
  }
  const getReward = async() => {
    if (account) {
      const reward = await getUserReward(account, CONTRACT_ADDRESS)
      setReward(reward)
    }
  }
  const getNftAmount = async() => {
    const amount = await getPoolAmount(CONTRACT_ADDRESS)
    setAllNftAmount(amount)
  }

  const handleLink = (link: string) => {
    window.open(link)
  }
  const handleAddToken = () => {
    importToken(data.tokenContractAddress, data.tokenName.en).then((data: any) => {
      console.log('result-----', data)
    })
  }
  const reset = () => {
    setShowModal(false)
    initList()
  }

  useEffect(() => {
    account && getNftArray(account, CONTRACT_ADDRESS).then((amount: any) => {
      setUserNftAmount(amount.length)
    })
  }, [account, CONTRACT_ADDRESS])
  useEffect(() => {
    getReward()
    getNftAmount()
    // 获取我质押的nft id[]
    account && getUserNftAmount(account, CONTRACT_ADDRESS).then((tokenList: any) => {
      setAmount(tokenList.length)
      const tokens = tokenList.map((bigNumberId: any) => {
        return bigNumberId.toString()
      })
      // 获取我的挖矿效率
      tokens.length && GET_NFT_EFFICIENCY_ACTION({
        nftPoolCode: data.nftPoolCode,
        accountAddress: account,
        chain_id,
        tokenIds: tokens
      }).then((result: any) => {
        setEfficiency(result.accountEfficiencyTotal)
      })
    })
  }, [account, data, chain_id])

  return (
    <Container height={fold ? '660px' : '468px'}>
      <HeadIcon bgImg={data.seriesBackgroundImage}></HeadIcon>
      <Head>
        {/* @ts-ignore */}
        <Text fontSize='24px'>{t('reward')}{i18n.language === 'en' ? data.tokenName.en : data.tokenName.ch}</Text>
        <Flex alignItems='center' mt='8px'>
          {/* @ts-ignore */}
          <Text fontSize='14px'>{t('deposit')} <span style={{color: '#7F92FE'}}>{i18n.language === 'en' ? data.seriesName.en : data.seriesName.ch}</span> {t('series')} NFT</Text>
          <Image ml='5px' src={shareIcon} size='15px' onClick={() => handleLink(data.seriesUrl)} style={{cursor: 'pointer'}}></Image>
        </Flex>
        <TokenLogo src={data.tokenLogoPath} size='50px'/>
        <SeriesLogo src={data.seriesLogoPath} size='50px'/>
      </Head>
      <Flex mt='110px' padding='6px 0' justifyContent='space-between'>
        <Flex>
          <Text fontSize='16px' color='#6F7D95' fontWeight='500'>{t('dayReward')}</Text>
          <Tooltip title={t('tips1')}>
            <QuestionIcon/>
          </Tooltip>
        </Flex>
        <Box>
          {/* @ts-ignore */}
          <Text fontSize='20px' color='#183B56' fontWeight='bold'>{Number(data.dayReward).toFixed(2)} {i18n.language === 'en' ? data.tokenName.en : data.tokenName.ch}</Text>
          <Text fontSize='12px' color='#6F7D95' textAlign='right'>≈$ {(data.tokenPrice * data.dayReward).toFixed(2)}</Text>
        </Box>
      </Flex>
      <Flex justifyContent='space-between'>
        <Flex>
          <Text fontSize='16px' color='#6F7D95' fontWeight='500'>{t('myDayReward')}</Text>
          <Tooltip title={t('myRewardTips')}>
            <QuestionIcon/>
          </Tooltip>
        </Flex>
        <Box>
          {/* @ts-ignore */}
          <Text fontSize='20px' color='#183B56' fontWeight='bold'>{(efficiency * Number(data.dayReward)).toFixed(2)} {i18n.language === 'en' ? data.tokenName.en : data.tokenName.ch}</Text>
          <Text fontSize='12px' color='#6F7D95' textAlign='right'>≈$ {(data.tokenPrice * efficiency * Number(data.dayReward)).toFixed(2)}</Text>
        </Box>
      </Flex>
      <Flex justifyContent='space-between' >
        <Flex>
          <Text fontSize='16px' color='#6F7D95' fontWeight='500'>{t('myEfficient')}</Text>
          <Tooltip title={t('tips2')}>
            <QuestionIcon/>
          </Tooltip>
        </Flex>
        <Text fontSize='20px' color='#183B56' fontWeight='bold'>x{efficiency}</Text>
      </Flex>
      <Line></Line>
      <Flex justifyContent='space-between' alignItems='center' padding='12px 0'>
        <Box flex='1'>
          {/* @ts-ignore */}
          <Text fontSize='16px' color='#6F7D95' fontWeight='500'>{t('myReward')}({i18n.language === 'en' ? data.tokenName.en : data.tokenName.ch})</Text>
          <Text fontSize='20px' color='#183B56' fontWeight='bold'>{Number(reward).toFixed(4)}</Text>
        </Box>
        {account && Number(reward) > 0 ? <Button onClick={handleExtract}>{t('extract')}</Button> :
        <Button background='#B8BFCC'>{t('extract')}</Button>}
      </Flex>
      <Flex justifyContent='space-between' alignItems='center' padding='12px 0'>
        <Box>
          <Text fontSize='16px' color='#6F7D95' fontWeight='500'>{t('myDeposit')}NFT</Text>
          <Text fontSize='20px' color='#566FFE' fontWeight='bold'>{amount}</Text>
        </Box>
        <Counter onClick={handleModal}></Counter>
      </Flex>

      {fold && <Info>
        <Line></Line>
        <Flex justifyContent='space-between' marginY='9px' style={{cursor: 'pointer'}}>
          <Text color='#6F7D95' fontWeight='500'>{t('depositAmount')}</Text>
          <Text fontSize='16px' color='#183B56' fontWeight='bold'>{allNftAmount}</Text>
        </Flex>
        <Flex justifyContent='space-between' marginY='9px' style={{cursor: 'pointer'}}>
          <Flex>
            <Text color='#6F7D95' fontWeight='500'>{t('endBlock')}</Text>
            <Tooltip title={t('tips3')}>
              <QuestionIcon/>
            </Tooltip>
          </Flex>
          <Flex alignItems='center' onClick={() => handleLink(BLOCK_URL + data.endBlock)}>
            <Text fontSize='16px' color='#183B56' fontWeight='bold'>{data.endBlock}</Text>
            <Image ml='5px' src={shareIcon} size='15px'></Image>
          </Flex>
        </Flex>
        <Flex mb='6px' alignItems='center' style={{cursor: 'pointer'}}>
          <Text onClick={() => handleLink(ADDRESS_URL + data.tokenContractAddress)}>{t('checkToken', { token: data.tokenName.en })}</Text>
          <Image ml='5px' src={shareIcon} size='15px'></Image>
        </Flex>
        <Flex mb='6px' alignItems='center' style={{cursor: 'pointer'}} onClick={() => handleLink(data.officialWebsiteUrl)}>
          <Text>{t('checkWebsite', { token: data.tokenName.en })}</Text>
          <Image ml='5px' src={shareIcon} size='15px'></Image>
        </Flex>
        <Flex mb='6px' alignItems='center' style={{cursor: 'pointer'}} onClick={handleAddToken}>
          <Text>{t('addToken', { token: data.tokenName.en })}</Text>
          <Image ml='5px' src={shareIcon} size='15px'></Image>
        </Flex>
      </Info>}
      <Fold>
        {!fold && <Image src={arrowUp} size='20px' onClick={() => setFold(true)} style={{cursor: 'pointer'}}></Image>}
        {fold && <Image src={arrowDown} size='20px' onClick={() => setFold(false)} style={{cursor: 'pointer'}}></Image>}
      </Fold>

      <Modal
        width='420px'
        getContainer='#root'
        maskClosable={false}
        centered={true}
        closable={true}
        visible={showModal}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setShowModal(!showModal)}
      >
        <ModalDeposit isActive={isActive} nftPoolCode={data.nftPoolCode} CONTRACT_ADDRESS={CONTRACT_ADDRESS} reset={reset} modalType={modalType}></ModalDeposit>
      </Modal>
    </Container>
  )
}