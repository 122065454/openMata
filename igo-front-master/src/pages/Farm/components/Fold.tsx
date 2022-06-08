import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, Image } from 'rebass'

const Container = styled(Flex)`
  width: 82px;
  height: 36px;
  padding: 0 4px;
  align-items: center;
  line-height: 36px;
  background: #566FFE;
  border-radius: 18px;
`
const Button = styled(Text)`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`
const Line = styled.div`
  width: 1px;
  height: 20px;
  opacity: 0.3;
  background-color: #fff;
`

export default function Counter () {
  return (
    <Container>
      <Button>-</Button>
      <Line></Line>
      <Button>+</Button>
    </Container>
  )
}