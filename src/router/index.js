import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/rights/Rights.vue'
import Roles from '@/components/rights/Roles.vue'
import Goodslist from '@/components/goods/Goodslist.vue'
import GoodsAdd from '@/components/goods/GoodsAdd.vue'
import Params from '@/components/goods/Cateparams.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import Reports from '@/components/report/Reports.vue'

import {
  Message
} from 'element-ui'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/rights',
    name: 'rights',
    component: Rights
  },
  {
    path: '/roles',
    name: 'roles',
    component: Roles
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goodslist
  },
  {
    path: '/goodsadd',
    name: 'goodsAdd',
    component: GoodsAdd
  },
  {
    path: '/params',
    name: 'params',
    component: Params
  },
  {
    path: '/categories',
    name: 'categories',
    component: GoodsCate
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  }]
},
{
  path: '/login',
  name: 'login',
  component: Login
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录 判断token
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})

export default router
