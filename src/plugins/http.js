// 插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = Vue => {
  // 设置基准地址
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

  // 4. 添加实例方法
  Vue.prototype.$http = axios
  // 除了登录之外的所有请求 都需要设置token

  // 添加请求拦截器
  axios.interceptors.request.use(
    function (config) {
      console.log('请求拦截器被触发')
      // console.log(config)
      if (config.url !== 'login') {
        const AUTH_TOKEN = localStorage.getItem('token')
        axios.defaults.headers.common.Authorization = AUTH_TOKEN
      }
      // 在发送请求之前做些什么
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  // axios.interceptors.response.use(
  //   function (response) {
  //     // 对响应数据做点什么
  //     return response
  //   },
  //   function (error) {
  //     // 对响应错误做点什么
  //     return Promise.reject(error)
  //   }
  // )
}
export default MyHttpServer
