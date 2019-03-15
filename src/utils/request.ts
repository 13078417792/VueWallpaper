import http from './http'
import api from './api'
import VueCookie from 'vue-cookie'

export const login = function(email:string,pwd:string,autoSave:boolean=true) :promise<any>{
    return http.post(api.login,{
        email,passwd:pwd
    }).then(result=>{
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

export default {
    login
}