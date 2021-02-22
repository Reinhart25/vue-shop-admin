import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/rights/Rights.vue'
import Roles from '@/components/rights/Roles.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
      }
    ]
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

export default router
