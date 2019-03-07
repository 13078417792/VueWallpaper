import axios from 'axios'
import api from './api'

const instance = axios.create({
    baseURL: 'https://api.presstime.cn/',
    timeout: 1000,
});

export const wallpaper = axios.create({
    baseURL: 'https://api.presstime.cn/wallpaper/mobile/',
    timeout: 1000
})

wallpaper.interceptors.response.use(function ({data}) {
    // Do something with response data
    if(data.msg!=='success'){
        return Promise.reject(data.msg || data.error)
    }
    return data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error.message || error.msg || error);
});

export function mobileFetch(api_name:string,params:object={}):Promise<object>{
    if(!api.hasOwnProperty(api_name)){
        throw new Error('API不存在')
    }
    const url = api[api_name]

    return wallpaper.get(url,{params})
}

export default instance
