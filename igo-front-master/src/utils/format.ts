/*
 * @Author: Aaron
 * @Date: 2022-04-21 14:30:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-28 11:05:01
 * @Description: file content
 * @FilePath: \igo-front\src\utils\format.ts
 */

import moment from 'moment'

/**
 * @description 格式11位时间戳
 * @param e => number | string
 * @return string
 */
export const formatTimeStamp = (e: number | string) => {
  return moment(e).format('YYYY/MM/DD HH:mm:ss')
}

/**
 * @description 文字格式中间省略号
 * @other substr,substring都可用于截取字符串
 * @param e =>  string
 * @return string
 */
export const formatTextEllipsis = (e: string) => {
  let str = ''
  if (e.length > 20) {
    let start = e.substring(0, 5)
    let end = e.substring(e.length - 5, e.length)
    str = start + '...' + end
  }
  return str
}
