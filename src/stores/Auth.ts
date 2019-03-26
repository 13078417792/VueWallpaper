const state = {

}

const mutations = {

}

const actions = {

}

const getters = {
    auth(state, getters, rootState, rootGetters){
        return rootGetters.hasOwnProperty('Storage/auth')?rootGetters['Storage/auth']:''
    },
    is_login(state, getters, rootState, rootGetters){
        return rootGetters['Storage/is_login']
    }
}

export default {
    state,mutations,actions,getters,namespaced:true
}