import {mapValues} from 'lodash'
import Vue from 'vue'
const Cookies = require('js-cookie')
import Forage from 'localforage'

let ImageStore:LocalForage = Forage.createInstance({
    name:'VueWallpaper',
    storeName:'image'
})

type storage = object

type state = {
    cookie:storage,
    localStorage:storage,
    sessionStorage:storage,
    IndexedDB:storage,
    WebSQL:storage
}

type types = "cookie"|"localStorage"|"sessionStorage"|"IndexedDB"|"WebSQL"

type image = {
    dataUrl:string,
    src:string
}

const driver = {
    asyncStorage:"IndexedDB",
    localStorageWrapper:"localStorage",
    webSQLStorage:"WebSQL"
}

function init(){
    const cookies:storage = Cookies.get() || Object.create(null)
    mapValues(cookies,function(value,key){
        state.cookie[key] = value
    })
    ImageStore.iterate(function(value,key){
        const cur_driver = driver[ImageStore.driver()]
        state[cur_driver][key] = value
    })
}

function getValue(state:state,name:string|number,defaults:any=null){
    const {cookie,localStorage,sessionStorage}:{cookie:storage,localStorage:storage,sessionStorage:storage} = state
    return cookie[name] || localStorage[name] || sessionStorage[name] || defaults
}

/**
 *
 * @param {state} state 状态上下文
 * @param {string | number} name 状态键
 * @param value 状态值
 * @param {types} types 数据存放类型
 * @param {object} opt 属性设置
 * @param {LocalForage | null} store localforage实例对应不同的数据库
 */
function setValue(state:state,name:string|number,value:any,types:types="cookie",opt:object={},store:LocalForage|null=null){
    if(types==='cookie'){
        Cookies.set(name,value,opt)
    }else if(["IndexedDB","WebSQL"].includes(types) && store){
        if(typeof name==='number'){
            name = name.toString()
        }
        store.setItem(name,value).then(()=>{})
    }
    Vue.set(state[types],name,value)
}

const state = {

    cookie:{},

    localStorage:{},

    sessionStorage:{},

    IndexedDB:{},

    WebSQL:{}

}

// const storage_types = Object.keys(state)

const getters = {
    getValue:(state:state)=>(name:string)=>{
        const {cookie,localStorage,sessionStorage,IndexedDB,WebSQL}:{cookie:storage,localStorage:storage,sessionStorage:storage,IndexedDB:storage,WebSQL:storage} = state
        return cookie[name] || localStorage[name] || sessionStorage[name] || IndexedDB[name] || WebSQL[name] || null
    },
    auth(state:state){
        return getValue(state,'auth')
    },

}

const mutations = {
    setAuth(state:state,value:string){
        setValue(state,'auth',value,'cookie',{expires:1})
    },
    updateImageBase(state:state,data:image){
        setValue(state,data.src,data.dataUrl,'IndexedDB',{},ImageStore)
    }
}

const actions = {

}

init()

export default {
    state,getters,mutations,actions,namespaced:true
}