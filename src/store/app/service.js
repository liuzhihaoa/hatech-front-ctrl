import { HTTPService, HTTPMethod, HTTPServiceFeature } from 'hatech-web-core'

const { GET, POST } = HTTPMethod
const { useToken } = HTTPServiceFeature

/**
 * 接口由HTTPService对象创建
 */
export default [
  // 登录
  new HTTPService({
    name: 'Login',
    url: '/api/user/login',
    method: POST,
    defaultParams: {
      source: 'test'
    },
    afterResponse: async ({ commit, dispatch }, response) => {
      if (response && response.success) {
        // 保存用户信息和token
        commit('LoginSuccess', response)
        await dispatch('FetchUserByToken')
        await dispatch('FetchMenus')
      }
      return response
    }
  }),
  // 获取用户菜单
  new HTTPService({
    name: 'FetchMenus',
    url: '/api/user/menus',
    method: GET,
    feature: useToken,
    afterResponse: ({ commit }, response) => {
      if (response && response.success) {
        // 获取用户菜单后进行保存
        commit('SaveMenus', response.data)
      }
      return response
    }
  }),
  // 通过token获取用户信息
  new HTTPService({
    name: 'FetchUserByToken',
    url: '/api/user/token',
    method: GET,
    feature: useToken,
    afterResponse: ({ commit }, response) => {
      if (response && response.success) {
        // 保存用户信息
        commit('Save', { user: response.data, hasLogin: true })
      }
      return response
    }
  }),
  // 查询菜单鉴权信息
  new HTTPService({
    name: 'FetchAuthsOfPage',
    url: '/api/menu/auth',
    method: GET,
    feature: useToken
  })
]
