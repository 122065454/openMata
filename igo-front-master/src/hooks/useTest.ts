/*
 * @Author: Aaron
 * @Date: 2022-04-20 11:19:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-21 18:11:44
 * @Description: 学习自定义hooks
 * @FilePath: \igo-front\src\hooks\useTest.ts
 */


import { useCallback, useEffect, useState } from "react";

export const useTest = () => {
  let [count, setCount] = useState(0)
  return [ count, setCount ] as const
}