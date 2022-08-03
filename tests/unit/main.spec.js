import Main from '@/views/main/index.vue'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import {Vue, Store, VueRouter } from 'hatech-web-core'
import HatechLayout from 'hatech-web-layout-husmc'
import Vuex from 'vuex'

jest.mock('hatech-web-layout-husmc', () => ({
    render(h) {
        h()
    }
}))


describe('Main Page', () => {
    let vue
    let store
    beforeEach(function () {
        vue = createLocalVue()
        vue.use(VueRouter)
        vue.use(Vuex)
        vue.use(HatechLayout)
        store = new Store({
            modules: {
                app: {
                    namespaced: true,
                    getters: {
                        LOADING: state => false,
                        CURRPAGE: state => ({
                            meta: {}
                        }),
                        MENUS: state => [],
                        USER: state => ({
                            userName: 'username'
                        })
                    },
                    
                }
            }
        })
        vue.prototype.$store = store
    })

    afterEach(function() {
        // store = null
        
    })

    it('render', () => {
        const wapper = shallowMount(Main, {
            localVue: vue,
            store,
            stubs: ['hatech-layout'],
            mocks: {
                $theme: {
                    themes: []
                }
            }
        })
        expect(wapper.find('.content').element.style.display).toBe('none')
        expect(wapper.find('#container').element.id).toBe('container')
    })
})