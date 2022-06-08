import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from 'rebass'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import checkIcon from '../images/check.svg'
import uncheckIcon from '../images/uncheck.svg'
import { GET_NFT_EFFICIENCY_ACTION } from 'data/api'
import { useAccount, useChain } from 'state/global/hooks'

const Content = styled.div`
`

export default function CheckAll ({
  list,
  nftPoolCode,
  setTokens,
  checked,
  setChecked
} : {
  list: any
  nftPoolCode: string
  setTokens: React.Dispatch<string[]>
  checked: boolean
  setChecked: React.Dispatch<boolean>
}) {
  const { t } = useTranslation()
  const accountAddress = useAccount()
  const chain_id = useChain()

  const [efficiency, setEfficiency] = useState(0)
  const [allTokens, setAllTokens] = useState<string[]>([])

  const getTokens = () => {
    const nList = list.n.map((item: any) => {
      return item.id.toString()
    })
    const rList = list.r.map((item: any) => {
      return item.id.toString()
    })
    const srList = list.sr.map((item: any) => {
      return item.id.toString()
    })
    const ssrList = list.ssr.map((item: any) => {
      return item.id.toString()
    })
    const allTokens: string[] = [...nList, ...rList, ...srList, ...ssrList]
    setAllTokens(allTokens)
    allTokens.length && GET_NFT_EFFICIENCY_ACTION({
      nftPoolCode,
      accountAddress,
      chain_id,
      tokenIds: allTokens
    }).then((result: any) => {
      setEfficiency(result.accountEfficiencyTotal)
    })
  }
  useEffect(() => {
    if(checked) {
      setTokens(allTokens)
    }
  }, [checked])

  useEffect(() => {
    accountAddress && getTokens()
  }, [list, accountAddress, chain_id, nftPoolCode])

  return (
    <Content>
      <Flex alignItems='center' onClick={() => setChecked(!checked)} style={{cursor: 'pointer'}}>
        <Image src={checked ? checkIcon : uncheckIcon} size='16px' mr='10px'></Image>
        <Text fontSize='16px' color='#183B56'>{t('checkAll')}</Text>
      </Flex>
      <Flex fontSize='12px' color='#6F7D95' flexWrap='wrap' style={{whiteSpace: 'nowrap'}}>
        <Text>{t('nftComposition')}=</Text>
        <Text>N*<span style={{color: '#566FFE'}}>{list.n.length}</span>+R*<span style={{color: '#566FFE'}}>{list.r.length}</span>+SR*<span style={{color: '#566FFE'}}>{list.sr.length}</span>+SSR*<span style={{color: '#566FFE'}}>{list.ssr.length}</span>,</Text>
        <Text>{t('totalEfficiency')}:<span style={{color: '#566FFE'}}>{efficiency}</span></Text>
      </Flex>
    </Content>
  )
}