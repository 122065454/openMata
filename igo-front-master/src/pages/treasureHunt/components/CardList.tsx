/*
 * @Author: Aaron
 * @Date: 2022-04-18 11:01:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-13 17:16:10
 * @Description: file content
 * @FilePath: \igo-front\src\pages\treasureHunt\components\CardList.tsx
 */

import React, { useEffect, useState, FC, ReactElement } from 'react'
import styled from 'styled-components'
import { Box, Image } from 'rebass'
import MdexLogo from '../images/Mdex-logo@2x.png'
import CheckLogo from '../images/Check@2x.png'
import MainPic from '../images/pic@2x.png'
import { isMobile } from 'react-device-detect'
import Empty from 'components/Empty'

const Wapper = styled.div`
  box-sizing:border-box;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  ${isMobile &&
  `
  display:block;
  width:unset;
  margin:0 16px;
  `}
`

const CardStyle = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 12px;
  width: 288px;
  margin: 0 16px 20px 0;
  &:hover {
    box-shadow: 0px 5px 30px 0px rgba(105, 114, 164, 0.4);
  }
  &:nth-child(4n){
    margin-right:unset
  }
  ${isMobile &&
  `
  width:100%;
  `};
`

const titleStyle = {
  paddingTop: '12px',
  color: '#183B56',
  fontWeight: 'bold',
  fontSize: '16px',
}
const infoStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '9px',
  paddingTop: '22px',
}

const seatStyle = {
  width: '288px',
}

interface Iprops {
  cardItemClick: Function
  data: []
}

const CardList: FC<Iprops> = (props): ReactElement => {
  const { cardItemClick, data } = props
  let [nodeList, setNodeList] = useState<string[]>([])
  useEffect(() => {
    let remainder = data.length % 4
    if (remainder != 0) {
      let list = []
      for (let i = 0; i < remainder; i++) {
        let str = ' <Box key={index} style={seatStyle}></Box>'
        list.push(str)
        setNodeList([...list])
      }
    }
  }, [])

  return (
    <Wapper style={{ width: !isMobile ? '1200px' : '' }}>
      {data.length !== 0 &&
        data.map((item: any, index) => {
          return (
            <CardStyle margin-left key={index} onClick={() => cardItemClick(item.nftAirdropId)}>
              <Image
                width={isMobile ? '100%' : '264px'}
                height={isMobile ? '311px' : '264px'}
                style={{ borderRadius: '20px' }}
                src={item.showImages[0]}
              />
              <Box>
                <Box style={titleStyle}>{item.title}</Box>
                <Box style={infoStyle}>
                  <Box>
                    <Image src={item.logoImage} style={{ width: '26px', height: '26px' }}></Image>
                  </Box>
                  <Box style={{ padding: '0 3px 0 8px' }}>{item.organizerName}</Box>
                  <Box>
                    <Image src={CheckLogo} style={{ width: '16px', height: '16px' }}></Image>
                  </Box>
                </Box>
              </Box>
            </CardStyle>
          )
        })}
      {/* {nodeList &&
        nodeList.map((item, index) => {
          return <Box key={index} style={seatStyle}></Box>
        })} */}
      {data.length == 0 && <Empty></Empty>}
    </Wapper>
  )
}

export default CardList
