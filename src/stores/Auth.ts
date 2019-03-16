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
    is_login(state, {auth}){
        return !!auth
    }
}

export default {
    state,mutations,actions,getters,namespaced:true
}