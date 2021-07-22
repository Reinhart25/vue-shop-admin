import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入store
import './store/index'
import MyHttpServer from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import moment from 'moment'
// MyBread 其实就是组件选项所在的对象{template:'', data 等}
import MyBread from '@/components/cuscom/MyBread.vue'

// 把axios 加到Vue 原形对象，就可以使用this.axios 调用
// Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
// 插件用法一样 this.$http
Vue.use(MyHttpServer)

// 全局过滤器
Vue.filter('formmatdate', (v, format = 'YYYY-MM-DD') => moment(v).format(format))

// 全局自定义组件
Vue.component(MyBread.name, MyBread)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
