/*
 * @Author: Aaron
 * @Date: 2022-04-20 18:57:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 18:59:03
 * @Description: file content
 * @FilePath: \igo-front\src\utils\getQuery.ts
 */

// 获取url参数
export const getQueryHandler = (e: string) => {
  let index = e.indexOf('?')
  if (index != -1) {
    let queryStr = e.split('?')[1]
    let queryObj: any = {}
    let flag = queryStr.indexOf('&')
    if (flag == -1) {
      queryObj[queryStr.split('=')[0]] = queryStr.split('=')[1]
    } else {
      let arr = queryStr.split('&')
      arr.map(item => {
        queryObj[item.split('=')[0]] = item.split('=')[1]
      })
    }
    return queryObj
  } else {
    return false
  }
}

