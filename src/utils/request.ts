import http from './http'
import api from './api'
import VueCookie from 'vue-cookie'
import {computed_skip as com_skip} from './helper'

function default_params(params:object){
    const def = {
        limit:10,
        first:1,
        adult:false,
        order:'new'
    }

    return Object.assign({},def,params)
}

type response = {
    code:number,
    res:object,
    message?:string,
    msg?:string,
    sessionId?:string
}

function handleResult(result:response){
    if(result.code!==0){
        return {
            success:false,
            result:result.res,
            message:result.message || result.msg || ''
        }
    }else{
        return {
            success:true,
            result:result.res,
            message:result.message || result.msg || ''
        }
    }
}

// 替换URL参数占位符
function replace_url_params(url:string,name:string,value:string|number){
    if(typeof value==='number'){
        value = value.toString()
    }
    return url.replace(`{$${name}}`,value)
}

type requestResult = {
    code:number,
    msg:string,
    sessionId:string|null|undefined
}|any

export const login = function(email:string,pwd:string,autoSave:boolean=true) :Promise<requestResult>{
    return http.post(api.login,{
        email,passwd:pwd
    }).then((result:requestResult)=>{
        const sessionId:string|null = result.sessionId
        if(!sessionId || result.code!==0){
            return Promise.reject(result.msg || '登录失败')
        }
        if(autoSave){
            VueCookie.set('Auth',sessionId,{expires:`${3600*24}s`})
        }
        return Promise.resolve(result)
    })
}


type album_list_params_type = {
    limit:number,
    first:number,
    order:"new"|"hot",
    page:number
}

export const album_list = function(params:album_list_params_type={
    limit:10,
    first:1,
    order:'new',
    page:1
}){
    let {limit,first,order,page} = params
    if(typeof first==='undefined'){
        first = 1
    }
    if(typeof page==='undefined'){
        page = 1
    }
    if(typeof order==='undefined'){
        order = 'new'
    }
    const skip = com_skip(page,limit)
    const data = {limit,first,order,skip}
    return http.get(api.album,{
        params:data
    }).then(result=>{
        return Promise.resolve(result)
    })
}

export const album_detail = async function(id:string,params:object){
    if(!id) return Promise.reject('获取专辑内容失败')
    let {album_wallpaper} = api
    // album_wallpaper = album_wallpaper.replace('{$id}',id)
    album_wallpaper = replace_url_params(album_wallpaper,'id',id)
    params = default_params(params)

    // 这里挖个坑，找个时间做个声明文件，重新定义响应的类型约束
    let result:any = await http.get(album_wallpaper,{
        params
    })
    result = handleResult(result)
    return result;
    // return http.get('')
}

export const get_comment = function(id:string,uid:string='',is_wallpaper:boolean=true){
    const url = is_wallpaper?api.horizontal_comment:api.vertical_comment
    return http.post(replace_url_params(url,'id',id),{
        uid
    })
}

/**
 * 点赞
 * @param {string} id   资源ID
 * @param {boolean} is_vertical 是否竖屏
 * @returns {AxiosPromise<any>}
 */
export const set_good = function(id:string,is_vertical:boolean=true){
    return http.post(api.set_good,{
        source_id:id,
        source_type:is_vertical?'vertical':'wallpaper'
    })
}

export default {
    login,album_list,album_detail,get_comment,set_good
}