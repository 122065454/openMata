import React, { useEffect, useState } from 'react'
import { Text, Flex, Image } from 'rebass'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import addIcon from '../images/add.svg'
import minusIcon from '../images/minus.svg'

const Content = styled.div`
  display: flex;
  height: 36px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 12px;
`

export default function Numbers ({
  list,
  nftType,
  checked,
  modalType,
  setTokens
} : {
  list: any
  nftType: string
  checked: boolean
  modalType: number
  setTokens: React.Dispatch<string[]>
}) {
  const tokensAll: any = Object.keys(list).map((key: string) => {
    return list[key].map((item: any) => {
      return item.id.toString()
    })
  })

  const listIndex: any = {n: 0, r: 1, sr: 2, ssr: 3}

  const { t } = useTranslation()
  const [select, setSelect] = useState(listIndex[nftType])
  const [amount, setAmount] = useState([0, 0, 0, 0])
  // 减少nft
  const handleMinus = () => {
    if (amount[select] <= 0 || checked) return

    const array = JSON.parse(JSON.stringify(amount))
    array[select] = array[select] - 1
    setAmount(array)
  }
  // 增加nft
  const handleAdd = () => {
    if (checked || amount[select] >= list[nftType].length) return

    const array = JSON.parse(JSON.stringify(amount))
    array[select] = array[select] + 1
    setAmount(array)
  }

  useEffect(() => {
    setSelect(listIndex[nftType])
  }, [nftType])

  useEffect(() => {
    if(checked) return

    let tokens: any = []
    tokens.push(...tokensAll[0].slice(0, amount[0]))
    tokens.push(...tokensAll[1].slice(0, amount[1]))
    tokens.push(...tokensAll[2].slice(0, amount[2]))
    tokens.push(...tokensAll[3].slice(0, amount[3]))
    setTokens(tokens)
  }, [amount, checked])

  return (
    <Content>
      <Text fontSize='16px' color='#183B56' fontWeight='bold'>{modalType === 0 ? t('extractAmount') : t('chooseAmount')}</Text>
      <Flex>
        <Image onClick={handleMinus} mr='16px' size='28px' src={minusIcon} opacity={checked ? '0.4' : '1'} style={{cursor: checked ? 'not-allowed' : 'pointer'}}></Image>
        <Text fontSize='16px' color='#183B56' fontWeight='400'>{amount[select]}</Text>
        <Image onClick={handleAdd} ml='16px' size='28px' src={addIcon} opacity={checked ? '0.4' : '1'} style={{cursor: checked ? 'not-allowed' : 'pointer'}}></Image>
      </Flex>
    </Content>
  )
}