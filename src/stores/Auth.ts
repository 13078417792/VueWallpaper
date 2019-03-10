import VueCookie from 'vue-cookie'

const Auth = VueCookie.get('Auth') || ''

const state = {
    Auth
}

const mutations = {

}

const actions = {

}

const getters = {
    is_login(state){
        return !!state.Auth
    }
}

export default {
    state,mutations,actions,getters,namespaced:true
}