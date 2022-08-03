import { StoreModule } from 'hatech-web-core'
import { CacheUtil } from 'hatech-web-utils'

import router from '@/router'
import config from '@/config'
import services from './service'
import { registerMicroApps } from 'qiankun'

/**
 * 应用信息数据仓库
 */
export default new StoreModule({
  namespaced: true,
  state: {
    // TODO：项目创建后，删除模拟数据
    // 用户信息
    user: {
      id: 'hatech-user-id',
      name: '同创前端',
    },
    // 当前登录用户token
    token: undefined,
    loading: false,
    // 是否已登录
    hasLogin: false,
    // 当前页面信息
    currPage: {},
    // 上一路由信息
    prevPage: {},
    // 用户菜单
    menus: []
  },
  getters: {
    USER: state => state.user,
    TOKEN: state => state.token,
    LOADING: state => state.loading,
    CURRPAGE: state => state.currPage,
    PREVPAGE: state => state.prevPage,
    MENUS: state => state.menus,
    ROUTES: (state) => {
      const totalMenus = [];
      const totalMicroApps = [];
      (function func(dataSource = []) {
        dataSource
          .filter(menu => menu.code && menu.path)
          .forEach(menu => {
            const menuTemplate = menu.template
            let template = totalMenus.find(tm => menuTemplate === tm.meta.template)
            if (!template) {
              template = {
                path: `/${menuTemplate}`,
                name: menuTemplate,
                component: resolve => require([`@/views/${menuTemplate}/index.vue`], resolve),
                meta: {
                  template: menuTemplate
                },
                children: []
              }
              totalMenus.push(template)
            }
            const route = {
              path: menu.path,
              name: menu.code,
              params: menu.params,
              meta: {
                microPath: menu.microPath,
                namespace: menu.namespace,
                id: menu.id
              }
            }
            // 微应用
            if (menu.microPath) {
              totalMicroApps.push({
                name: menu.code,
                entry: menu.microPath,
                container: menu.container || '#container',
                activeRule: menu.path,
                props: {
                  namespace: menu.namespace
                }
              })
            } else {
              route.component = resolve => require([`@/views/${menuTemplate}${menu.path}`], resolve)
            }
            template.children.push(route)
            if (menu.children && menu.children.length) func(menu.children)
          })
      })(state.menus || []);
      return {totalMenus, totalMicroApps }
    }
  },
  mutations: {
    // 保存
    save(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    // 保存上一路由信息
    SavePrev(state, prevPage) {
      state.prevPage = prevPage
      CacheUtil.saveObject(`${config.appCode}_PREVPAGE`, prevPage)
    },
    // 保存当前路由信息
    SaveCurrPage(state, currPage) {
      state.currPage = currPage
      CacheUtil.saveObject(`${config.appCode}_CURRPAGE`, currPage)
    },
    // 保存菜单，注入路由
    SaveMenus(state, menus) {
      state.menus = menus
      if (menus && menus.length > 0) {
        const { totalMenus, totalMicroApps } = this.getters['app/ROUTES'] 
        router.addRoutes(totalMenus)
        registerMicroApps(totalMicroApps,  {
          beforeLoad: async app => {
            console.log('before load', app)
            state.loading = true
          },
          beforeMount: app => {
            console.log('before mount', app)
          },
          afterMount: app => {
            console.log('after mount', app)
            state.loading = false
          },
          beforeUnmount: app => {
            console.log('before unmount', app)
          },
          afterUnmount: app => {
            console.log('after unmount', app)
          }
        })
      }
    },
    // 登录成功
    LoginSuccess(state, response) {
      const { user_id, access_token } = response.data
      state.hasLogin = true
      state.user = {
        id: user_id
      }
      state.token = access_token
      CacheUtil.save(`${config.appCode.toUpperCase()}_TOKEN`, state.token)
      CacheUtil.saveObject(`${config.appCode.toUpperCase()}_USER`, state.user)
    },
    // 注销成功
    Logout(state) {
      state.user = {}
      state.hasLogin = false
      state.token = undefined;
      ['TOKEN', 'USER'].forEach(key => {
        CacheUtil.remove(`${config.appCode}_${key}`)
      })
    }
  },
  actions: {
  },
  services
})