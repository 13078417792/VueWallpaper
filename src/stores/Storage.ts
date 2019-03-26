import {mapValues} from 'lodash'
import Vue from 'vue'
import {Commit} from 'vuex'
import helper from '../utils/helper'

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

let RankRecordStore:LocalForage = Forage.createInstance({
    name:'VueWallpaper',
    storeName:'rank_record'
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

const hasKey = helper.hasKey

function getValue(state:state,name:string|number,defaults:any=null){
    const {cookie,localStorage,sessionStorage,IndexedDB,WebSQL}:{cookie:storage,localStorage:storage,sessionStorage:storage,IndexedDB:storage,WebSQL:storage} = state
    // if(hasKey(cookie,name)){
    //     return cookie[name]
    // }
    // if(hasKey(localStorage,name)){
    //     return localStorage[name]
    // }
    // if(hasKey(sessionStorage,name)){
    //     return sessionStorage[name]
    // }
    // if(hasKey(IndexedDB,name)){
    //     return IndexedDB[name]
    // }
    // if(hasKey(WebSQL,name)){
    //     return WebSQL[name]
    // }
    //
    // return defaults;
    //
    // return hasKey(cookie,name) || localStorage[name] || sessionStorage[name] || IndexedDB[name] || WebSQL[name] ||  defaults
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
function setValue(state:state,name:string|number,value:any,types:types="cookie",opt:{
    expires?:number|string
}={},store?:LocalForage){
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

const getters = {
    getValue:(state:state)=>(name:string)=>{
        const {cookie,localStorage,sessionStorage,IndexedDB,WebSQL}:{cookie:storage,localStorage:storage,sessionStorage:storage,IndexedDB:storage,WebSQL:storage} = state
        return cookie[name] || localStorage[name] || sessionStorage[name] || IndexedDB[name] || WebSQL[name] || null
    },
    auth(state:state){
        return getValue(state,'auth')
    },
    UserInfo(state:state,getters,rootState,rootGetters){
        if(!rootGetters['Auth/is_login']) return null
        return getValue(state,'user_info')
    },

    // 点赞记录
    rank_record(state:state,getters,rootState,rootGetters){
        if(!rootGetters['Auth/is_login']) return []
        return getValue(state,'rank_record',[])
    },

    // 查询指定的壁纸是否已点赞过
    is_rank:(state:state,getters)=>{
        const {rank_record} = getters
        return (wallpaper_id:string)=> rank_record.includes(wallpaper_id)
    },
    is_login(state:state,getters){
        return !!getters.auth
    }
}

type updateDataType = {
    type:types,
    name:string,
    parentNode:string|number|undefined|null|void,
    value:any
}

const mutations = {
    // 通用的提交方法
    update(state:state,data:updateDataType){
        const {parentNode,type,name,value} = data
        if(typeof parentNode==='number' || !!parentNode){
            Vue.set(state[type],parentNode,{})
            Vue.set(state[type][parentNode],name,value)
        }else{
            Vue.set(state[type],name,value)
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
    },
    addRandRecord(state:state,id:string) {
        // console.log(id)
        let rank_record:Array<string> = getValue(state, 'rank_record')
        const user_info = getValue(state, 'user_info')
        if(!user_info) return
        const {id:uid} = user_info
        if(!rank_record){
            rank_record = []
        }
        if(!rank_record.includes(id)){
            rank_record.push(id)
        }
        setValue(state,uid,rank_record,'IndexedDB',{},RankRecordStore)
    }




}

const actions = {
    /**
     * 从本地存储更新数据到Store
     * @param {Commit} commit
     */
    updateFromLocal({commit,getters}:{commit:Commit,getters:any}){


        const cookies:storage = Cookies.get() || Object.create(null)

        // 获取登录token
        mapValues(cookies,function(value,key){
            commit('update',{
                type:'cookie',
                name:key,
                value
            })
        })

        const {is_login} = getters

        if(!is_login) return;


        // 稍后需要做未登录处理
        // 20190326 已简单处理未登录

        // 更新分两个步骤
        // 先更新当前用户的登录信息，例如zhouchijian此账户的登录信息，以获取用户的UID、昵称等信息
        // 然后更新zhouchijian账户下的操作记录、对应的数据
        // 例如zhouchijian账户曾经的点赞记录

        // 登录的用户的基本信息
        let baseStores = [{
            store:UserStore
        }]
        const baseUpdatePromise = baseStores.map((
            {store,parent}:{store:LocalForage,parent?:string|number}
            )=>{
            return store.iterate(function(value,key){
                const cur_driver = driver[store.driver()]
                commit('update',{
                    type:cur_driver,
                    name:key,
                    parentNode:parent,
                    value
                })
            }).then(()=>{
                return Promise.resolve()
            }).catch(err=>{
                console.warn('从本地存储更新数据到StorageStore时出错',err)
                return Promise.reject()
            })
        })


        // 所有用户基本信息更新到Store后再获取各自用户对应自己的数据（例如，某用户的点赞记录）
        Promise.all(baseUpdatePromise).then(()=>{
            const uid = getters.UserInfo.id
            let allUserDataStores = [{
                store:RankRecordStore,
                name:'rank_record'
            }]
            allUserDataStores.forEach(async ({store,name}:{store:LocalForage,name:string|number})=>{
                let result = await store.getItem(uid)
                const cur_driver = driver[store.driver()]
                if(result){
                    commit('update',{
                        type:cur_driver,
                        name,
                        value:result
                    })
                }
            })
        })



    }
}

export default {
    state,getters,mutations,actions,namespaced:true
}