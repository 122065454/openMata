import axios from 'axios'
import QS from 'qs'
const BASE_URL = 'https://farm.openmeta.name/'
// const BASE_URL = 'http://172.16.1.13:7001/'
// const BASE_URL = 'http://172.16.0.70:3001'

const httpRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
})

// 请求拦截
httpRequest.interceptors.request.use(
  async (config: any) => {
    const account:string =   window.localStorage.getItem('account') || ''
    let address: string = '0x0000000000000000000000000000000000000000'
    if (account.length) {
      address =account
    }
    // //设置请求头
    config.headers['m-viewer-address'] = address
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
httpRequest.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response.data)
    }
    return response
  },
  error => {
    if (!error.response) return Promise.reject(error)
    return Promise.reject(error)
  }
)
// 导出整个axios实例
export default httpRequest

// 单独导出一个方法
// export function request(url: string, params: any, type: string) {
//   let param: any = {}
//   if (type === 'get') {
//     const string = params ? '?' + QS.stringify(params) : ''
//     param = {
//       url: url + string,
//       method: type,
//     }
//   } else {
//     param = {
//       url,
//       method: type,
//       data: QS.stringify(params),
//     }
//   }
//   param.headers = {
//     'm-viewer-address': params?.address ?? '0x0000000000000000000000000000000000000000',
//   }
//   return new Promise((resolve, reject) => {
//     service(param)
//       .then(data => {
//         resolve(data)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }
