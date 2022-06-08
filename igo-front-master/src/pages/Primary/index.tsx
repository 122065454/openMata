import React, { useEffect } from 'react'
import { useShowNav } from 'state/global/hooks'
import { Box } from 'rebass'

import Expand from './components/Expand'
import Banner from './components/Banner'
import PendingList from './components/PendingList'
import OverList from './components/OverList'


export default function Primary () {
  const [, setShowNav] = useShowNav()
  useEffect(() => {
    setShowNav(true)
  }, [])

  return (
    <>
      {/* 轮播图 */}
      <Banner></Banner>

      <Box width='100%' backgroundColor='#ECF1F9'>
        {/* 等待中 */}
        <PendingList></PendingList>
        {/* 已结束 */}
        <OverList></OverList>
        {/* 问答 */}
        <Expand></Expand>
      </Box>
    </>
  )
}