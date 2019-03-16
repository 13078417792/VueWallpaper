import {mapValues} from 'lodash'
import Vue from 'vue'
const Cookies = require('js-cookie')


type storage = object

type state = {
    cookie:storage,
    localStorage:storage,
    sessionStorage:storage
}

type types = "cookie"|"localStorage"|"sessionStorage"


function init(){
    const cookies:storage = Cookies.get() || Object.create(null)
    mapValues(cookies,function(value,key){
        state.cookie[key] = value
    })
}

function getValue(state:state,name:string|number,defaults:any=null){
    const {cookie,localStorage,sessionStorage}:{cookie:storage,localStorage:storage,sessionStorage:storage} = state
    return cookie[name] || localStorage[name] || sessionStorage[name] || defaults
}

function setValue(state:state,name:string|number,value:any,types:types="cookie",opt:object={}){
    if(types==='cookie'){
        Cookies.set(name,value,opt)
    }
    Vue.set(state[types],name,value)
}

const state = {

    cookie:{

    },

    localStorage:{

    },

    sessionStorage:{

    },


}

// const storage_types = Object.keys(state)

const getters = {
    getValue:(state:state)=>(name:string)=>{
        const {cookie,localStorage,sessionStorage}:{cookie:storage,localStorage:storage,sessionStorage:storage} = state
        return cookie[name] || localStorage[name] || sessionStorage[name] || null
    },
    auth(state:state){
        return getValue(state,'auth')
    }
}

const mutations = {
    setAuth(state:state,value:string){
        setValue(state,'auth',value,'cookie',{expires:1})
    }
}

const actions = {

}

init()

export default {
    state,getters,mutations,actions,namespaced:true
}