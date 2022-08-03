import { Store } from 'hatech-web-core'
import { CacheUtil } from 'hatech-web-utils'
import config from '../config'
import app from './app'

// 取出缓存
const token = CacheUtil.get(`${config.appCode}_TOKEN`)
if (token) {
  app.state.token = token
}

const user = CacheUtil.get(`${config.appCode}_USER`)
if (user) app.state.user = user

const prevPage = CacheUtil.getObjcet(`${config.appCode}_PREVPAGE`)
if (prevPage) app.state.prevPage = prevPage

const currPage = CacheUtil.getObjcet(`${config.appCode}_CURRPAGE`)
if (currPage) app.state.currPage = currPage

const store = new Store({
  modules: { app }
})

export default store