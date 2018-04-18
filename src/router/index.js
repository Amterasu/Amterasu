import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import index from '@/components/index/index'
import detail from '@/pages/detail/articleDetail'
import login from '@/pages/login/login'
import write from '@/pages/write/write'
import collect from '@/pages/collect/collect'
import about from '@/pages/about/about'
import demo from '@/pages/demo/demo'

Vue.use(Router)

const router = new Router({
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
      component: collect
    },
    {
      path: '/demo',
      component: demo
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/resume',
      component: write
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/' || to.fullPath === '/index') {
    store.commit('indexContent/RESET_PAGE')
  }
  next()
})

export default router
