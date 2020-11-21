import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
