// 插件模块
import axios from 'axios'
import { Message } from 'element-ui'

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
      // console.log('请求拦截器被触发')
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

  /* 封装了响应拦截器 统一做处理 */
  axios.interceptors.response.use((success) => {
    // 在发送请求之前做些什么
    if (success.status && success.status === 200) {
      // 这些code 提示错误
      if (success.data.code === 500 || success.data.code === 401 || success.data.code === 403) {
        Message.error({ message: '警告哦，这是一条警告消息' })
        return
      }
      // 有信息 类似修改成功这类 返回信息
      if (success.data.message) {
        Message.success({ message: success.data.message })
      }
    }
    return success.data
  }, (losing) => {
    // 对请求错误做些什么
    if (losing.response.code === 504 || losing.response.code === 404) {
      Message.error({ message: ' 服务器当机了 ' })
    } else if (losing.response.code === 403) {
      Message.error({ message: '权限不足, 请联系管理员' })
    } else if (losing.response.code === 401) {
      Message.error({ message: '尚未登陆, 请登陆' })
      this.$router.replace('/')
    } else {
      Message.error({ message: losing.response.data.message })
    }
    return losing
  })
}
export default MyHttpServer
