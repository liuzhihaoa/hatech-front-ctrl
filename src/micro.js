import { initGlobalState } from 'qiankun'

const initialState = {}

// 数据传递
const action = initGlobalState(initialState)

/**
 * url微应用判断
 * 
 * @param {String} routerPrefix 
 */
function getActiveRule4Url(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix)
}

export {
    action,
    getActiveRule4Url
}

export default {
    action,
    getActiveRule4Url
}