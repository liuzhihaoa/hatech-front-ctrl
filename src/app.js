import { addGlobalUncaughtErrorHandler, start } from 'qiankun'
import { Core } from 'hatech-web-core'
import router from './router'
import config from './config'
import store from './store'
import App from './App.vue'
import {Message} from 'element-ui'

let app

const render = ({
    content = '',
    loading = true
} = {}) => {
    if (app) {
        app.vue.content = content
        app.vue.loading = loading
    } else {
        app = new Core({
            code: config.appCode,
            store,
            router,
            render: h => h(App, {
                content,
                loading
            }),
        })
        app.vue.$mount('#app')
    }
}

addGlobalUncaughtErrorHandler(event => {
    Message.error(event.message)
    store.state.app.loading = false
    console.log('微前端 错误 : ', event)
    
})

export default () => {
    render()
    start()
    return app
}
