import _ from 'lodash'
import axios from 'axios'
// const isProduction = process.env.NODE_ENV === 'production'

/**
 * 创建axios实例
 */
const axiosInstance = axios.create({
  baseURL:'',
  timeout: 10 * 1000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

/**
 * 请求之前的拦截器
 * 1、可以设置token
 * 2、可以设置埋点字段
 * 3、可以设置风控字段
 */
axiosInstance.interceptors.request.use(async config => {
  return config
})

/**
  请求之后的拦截器
  1、可以未登录统一处理
  2、可以错误统一处理
 */
axiosInstance.interceptors.response.use(res => {
  const { status, data } = res;
  if (status === 200) {
    return data 
  }

  // 业务逻辑错误
  // error.responseData有值，是‘业务逻辑错误’，否则就是‘网络错误’
  const error = new Error()

  error.responseData = res.data

  return { error }
},
error => {
  // 网络错误
  return { error }
})

/**
 * 用于发送ajax请求
 * @param  {string} method 请求方式, GET | POST
 * @param  {string} url    接口路径
 * @param  {Object} data   参数
 * @param  {Object} header 请求头
 * @return {Promise}       返回一个Promise对象
 */
function http(method, url, data = {}, header = {}) {
  const options = {
    method,
    url,
    headers: { ...axiosInstance.headers, ...header },
  }

  _.extend(options, {
    [method === 'GET' ? 'params' : 'data']: data
  })

  return axiosInstance
    .request(options)
    // .then(res => {
    //   const { code } = res.data
    //   return Promise[code === 0 ? 'resolve' : 'reject'](res.data)
    // }, () => {
    //   const error = new Error(errmsg);
    //   error.code = errno;
    //   error.responseData = responseData;
    //   // TODO 根据实际情况处理 断网、接口404、超时 等错误
    //   return Promise.reject({
    //     error
    //   })
    // })
}

http.get = (url, data, header) => http('GET', url, data, header)
http.post = (url, data, header) => http('POST', url, data, header)


export default http;
