import { VueRouter } from 'hatech-web-core'
import config from './config'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Micro from '@/micro'

import Login from './views/login/index.vue'
import Main from './views/main/index.vue'
import Home from './views/main/home/index.vue'
import App from './views/main/apps/index.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'homepage',
          component: Home
        },
        {
          path: '/apps',
          name: 'apps',
          component: App
        }
      ]
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { currPage, token, hasLogin } = store.state.app
  // 无需登录或已登录
  if (config.noAuth.includes(to.name) || hasLogin) {
    const newTo = {
      replace: true,
      name: to.name,
      path: to.path,
      params: { ...to.params },
      meta: { ...to.meta }
    }
    const keys = Object.keys(to.query)
    if (keys.length > 0) {
      keys.forEach(key => {
        newTo.params[key] = to.query[key]
      })
      NProgress.done()
      return next(newTo)
    }

    if (!from.name && currPage && currPage.name === to.name) {
      Object.keys(currPage.params).forEach(key => {
        to.params[key] = currPage.params[key]
      })
    }
    // 无需登录的，不查询页面鉴权信息
    if (!config.noAuth.includes(to.name)) {
      const response = await store.dispatch('app/FetchAuthsOfPage', {
        params: {
          code: to.name
        }
      })
      if (response && response.success) {
        to.params.auths = response.data
      }
    }
    NProgress.done()
    return next()
  }
  if (token) {
    const response = await store.dispatch('app/FetchUserByToken', {
      params: { token }
    })
    if (!response || !response.success) {
      return next({
        name: 'login'
      })
    }
    await store.dispatch('app/FetchMenus')
    NProgress.done()
    return next(to)
  }
  NProgress.done()
  next({
    name: 'login'
  })
})

router.afterEach((to, from) => {
  // 记录上一页页面参数
  if (from.name && from.name !== to.name) {
    store.commit('app/SavePrev', {
      name: from.name,
      path: from.path,
      params: from.params,
      meta: from.meta
    })
  }
  if (to.name && to.name !== null) {
    store.commit('app/SaveCurrPage', {
      name: to.name,
      path: to.path,
      params: to.params,
      meta: to.meta
    })
  }
  // 传递参数到子应用
  if (to.meta && to.meta.namespace && to.params) {
    Micro.action.setGlobalState({
      query: to.query,
      params: to.params
    })
  }
})


export default router