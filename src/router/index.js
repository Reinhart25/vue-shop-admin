import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/layout'
// import {
//   Message
// } from 'element-ui'
Vue.use(VueRouter)
// 路由懒加载

const routes = [
  {
    path: '/',
    name: 'LayOut',
    redirect: '/user',
    component: LayOut,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/rights/Rights')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/rights/Roles')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/Goodslist')
      },
      {
        path: 'goodsadd',
        name: 'goodsAdd',
        component: () => import('@/views/goods/GoodsAdd')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/views/goods/Cateparams')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/goods/GoodsCate')
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/report/Reports')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
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
