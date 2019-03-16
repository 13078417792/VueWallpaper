import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './stores/Auth'
import Storage from './stores/Storage'
import ScrollPosition from './stores/ScrollPosition'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Auth,
        Storage,
        ScrollPosition
    }
})
