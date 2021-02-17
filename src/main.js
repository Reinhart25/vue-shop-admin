import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import moment from 'moment'

// 把axios 加到Vue 原形对象，就可以使用this.axios 调用
// Vue.prototype.axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
// 插件用法一样 this.$http
Vue.use(MyHttpServer)

Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
