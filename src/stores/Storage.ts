import {mapValues} from 'lodash'
import Vue from 'vue'
import {Commit} from 'vuex'
import {get_type} from '../utils/helper'

const Cookies = require('js-cookie')
import Forage from 'localforage'

let ImageStore:LocalForage = Forage.createInstance({
    name:'VueWallpaper',
    storeName:'image'
})

let UserStore:LocalForage = Forage.createInstance({
    name:'VueWallpaper',
    storeName:'user'
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

type UserInfo = {
    id:number,
    migrated: boolean,
    super: boolean,
    rank: number,
    follower: number,
    open: object,
    title: Array<string>,
    viptime: number,
    visit: number,
    score: {
        score: number,
        level: string
    },
    snlimit: string,
    email: string,
    avatar:string,
    isvip: boolean,
    auth: string,
    medal: Array<string>,
    desc: string,
    name: string,
    artist: boolean,
    gender: string|number,
    sn: number,
    following: number
}

const driver = {
    asyncStorage:"IndexedDB",
    localStorageWrapper:"localStorage",
    webSQLStorage:"WebSQL"
}

function getValue(state:state,name:string|number,defaults:any=null){
    const {cookie,localStorage,sessionStorage,IndexedDB,WebSQL}:{cookie:storage,localStorage:storage,sessionStorage:storage,IndexedDB:storage,WebSQL:storage} = state
    return cookie[name] || localStorage[name] || sessionStorage[name] || IndexedDB[name] || WebSQL[name] ||  defaults
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
    UserInfo(state:state){
        return getValue(state,'user_info')
    }
}

type updateDataType = {
    type:types,
    name:string,
    value:any
}

const mutations = {
    update(state:state,data:updateDataType){

        if(get_type(data.value)==='object'){
            Vue.set(state[data.type],data.name,data.value)
        }else{
            state[data.type][data.name] = data.value
        }
    },
    setAuth(state:state,value:string){
        setValue(state,'auth',value,'cookie',{expires:1})
    },
    saveUserInfo(state:state,info:UserInfo){
        setValue(state,'user_info',info,'IndexedDB',{},UserStore)
    },
    updateImageBase(state:state,data:image){
        setValue(state,data.src,data.dataUrl,'IndexedDB',{},ImageStore)
    }
}

const actions = {
    /**
     * 从本地存储更新数据到Store
     * @param {Commit} commit
     */
    updateFromLocal({commit}:{commit:Commit}){
        const cookies:storage = Cookies.get() || Object.create(null)
        mapValues(cookies,function(key,value){
            commit('update',{
                type:'cookie',
                name:key,
                value
            })
        })
        let stores = [UserStore]
        stores.forEach((store:LocalForage)=>{
            store.iterate(function(value,key){
                const cur_driver = driver[store.driver()]
                commit('update',{
                    type:cur_driver,
                    name:key,
                    value
                })
            }).then(()=>{}).catch(err=>{
                console.warn('从本地存储更新数据到Store时出错',err)
            })
        })
    }
}

export default {
    state,getters,mutations,actions,namespaced:true
}