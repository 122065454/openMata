import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  overflow-x: scroll;
`
const Content = styled.div<{active?: boolean}>`
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  text-align: center;
  background: #F2F7FA;
  color: #183B56;
  border-radius: 10px;
  margin-right: 10px;
  white-space: nowrap;
  cursor: pointer;
  ${({active}) => active && `
    background: #566FFE;
    color: #fff;
  `}
`
export default function Selection ({
  list,
  nftType,
  setNftType
} : {
  list: any
  nftType: string
  setNftType: React.Dispatch<string>
}) {
  const handleClick = (type: string) => {
    setNftType(type)
  }
  const levelList = ['n', 'r', 'sr', 'ssr']

  const listItem = levelList.map((level: string, index: number) => {
    if (list[level].length <= 0) return null
    return (
      <Content key={index} onClick={() => handleClick(level)} active={nftType === level}>{list[level][0]?.name}({list[level].length})</Content>
    )
  })

  return (
    <Wrapper>
      {listItem}
    </Wrapper>
  )
}