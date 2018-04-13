import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import detail from '@/components/detail/articleDetail'
import login from '@/components/login/login'
import write from '@/components/write/write'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/detail/:id',
      component: detail
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/write',
      component: write
    },
    {
      path: '/write/:id',
      component: write
    },
    {
      path: '/classlist',
      component: write
    },
    {
      path: '/collect',
      component: write
    },
    {
      path: '/demo',
      component: write
    },
    {
      path: '/about',
      component: write
    },
    {
      path: '/resume',
      component: write
    }
  ]
})
