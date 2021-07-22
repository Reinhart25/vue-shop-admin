import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/components/user/Users.vue'
// import {
//   Message
// } from 'element-ui'
Vue.use(VueRouter)
// 路由懒加载
const Rights = () => import('@/components/rights/Rights')
const Roles = () => import('@/components/rights/Roles')
const Goodslist = () => import('@/components/goods/Goodslist')
const GoodsAdd = () => import('@/components/goods/GoodsAdd')
const Params = () => import('@/components/goods/Cateparams')
const GoodsCate = () => import('@/components/goods/GoodsCate')
const Reports = () => import('@/components/report/Reports')

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
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
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  }
]
// redirect: '/home',
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path === '/login') {
    next()
    console.log('111111')
  } else {
    // 如果要去的不是登录 判断token
    const token = localStorage.getItem('token')
    console.log('----' + token)
    // if (!token) {
    //   Message.warning('请先登录')
    //   router.push({
    //     name: 'login'
    //   })
    //   return
    // }
    next()
    console.log('222222222')
  }
}) */

export default router
