import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import NewPartyPage from '@/components/NewPartyPage'
import MyPage from '@/components/MyPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/new',
      name: 'NewPartyPage',
      component: NewPartyPage
    },
    {
      path: '/my',
      name: 'MyPage',
      component: MyPage
    }
  ]
})
