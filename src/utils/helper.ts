import axios from 'axios'
// import SparkMd5 from 'spark-md5'
import {Md5} from 'ts-md5/dist/md5';
import data from './data'
import {mapValues} from 'lodash'

export function createTecentMapSig(location:string) :any{
    // https://lbs.qq.com/FAQ/key_faq.html#6
    const str:string =  `/ws/geocoder/v1/?key=${data.TENCENT_MAP_KEY}&location=${location}${data.TENCENT_MAP_SK}`
    return Md5.hashStr(str)
}

export function position(){
    return new Promise((resolve,reject)=>{
        if(!("geolocation" in navigator)){
            return reject('定位失败');
        }
        const {geolocation} = navigator
        geolocation.getCurrentPosition(position=>{
            resolve(position)
        },(err)=>{
            reject(err.message)
        },{
            enableHighAccuracy:true,
            // timeout:2000
        })
    })
}

// 根据经纬度获取城市名
export function get_city_name(lat:number,long:number,isChina:boolean=true) :Promise<string>{
    // console.log('get_city_name')
    const location = `${lat},${long}`
    const params = {
        sig:createTecentMapSig(location),
        key:data.TENCENT_MAP_KEY,
        location
    }
    // const key = SparkMd5.hash(JSON.stringify(params))
    const key:any = Md5.hashStr(JSON.stringify(params))

    const request = (resolve:Function,reject:Function)=>{
        return axios({
            method: 'get',
            url:'https://api.movie.presstime.cn/tecent_location',
            params
        }).then(({data:{result}})=>{
            const {address_component} = result
            const {nation,city} = address_component
            if(nation!=='中国'){
                return isChina?resolve('佛山'):reject('不是中国')
            }
            localStorage.setItem(key,JSON.stringify(result))
            return resolve(city)
        })
    }



    return new Promise((resolve,reject)=>{
        if(!('localStorage' in window)) return request(resolve,reject)
        let result:any = localStorage.getItem(key)
        if(result){

            try{
                result = JSON.parse(result)
            }catch(err){
                return request(resolve,reject)
            }
            const {address_component} = result
            const {nation,city} = address_component
            if(nation!=='中国'){
                return isChina?resolve('佛山'):reject('不是中国')
            }
            return resolve(city)
        }
        return request(resolve,reject)
    })


}

export function ucfirst(str:string) :string{
    if(!str) return ''
    if(str.length==1) return str.toLocaleUpperCase()
    return `${str[0].toLocaleUpperCase()}${str.slice(1)}`
}

export function JsonEncoded(data:object){
    return Object.keys(data).map(el=>{
        return `${el}=${data[el]}`
    }).join('&')
}

export function get_response_error(error:any){
    const type = get_type(error)
    if(type==='error'){
        return error.message || '未知错误'
    }else if(type==='string'){
        return error
    }else if(type==='object'){
        return error.msg || error.message || error.error
    }else{
        return '未知错误'
    }
}

export function get_type(data:any){
    return toString.call(data).replace(/\[object ([\da-z]+)]/ig,'$1').toLowerCase()
}

type BlobResponse = {
    data:Blob
}

type AjaxImageResponsePromise = string|Blob|object

/**
 * 异步加载图片
 * @param {string} src
 * @param {boolean} is_base
 * @returns {Promise<AjaxImageResponsePromise>}
 */
export function ajax_img(src:string,is_base:boolean=true) :Promise<AjaxImageResponsePromise>{
    return axios.get(src,{
        responseType:'blob'
    }).then((data:BlobResponse)=>{
        const blob:Blob|null = data.data
        if(!is_base && blob){
            return Promise.resolve(blob)
        }
        return new Promise((resolve,reject)=>{
            const reader:FileReader = new FileReader()
            reader.addEventListener('load',function(){
                if(typeof reader.result==='string'){
                    resolve(reader.result)
                }else{
                    reject('图片转码base64失败')
                }
            },false)
            reader.addEventListener('error',function(){
                reject(reader.error)
            },false)
            reader.readAsDataURL(blob)
        })

    }).then((result:AjaxImageResponsePromise)=>{
        return Promise.resolve(result)
    }).catch(error=>{
        return Promise.reject(get_response_error(error))
    })
}

// window.ajax_img = ajax_img

/**
 * 图片转码base64
 * @param {string | HTMLImageElement} target 图片地址或图片元素实例
 * @param {boolean} forceImageElement   是否强制生成图片元素实例再转码
 * @returns {Promise<AjaxImageResponsePromise|string>}
 */
export async function base64_img(target:string|HTMLImageElement,forceImageElement:boolean=false) :Promise<AjaxImageResponsePromise|string>{
    if(forceImageElement && typeof target==='string'){
        const src = target
        try{
            target = await createImage(src,{
                crossOrigin:'anonymous'
            })
        }catch(err){
            return Promise.reject(get_response_error(err))
        }

    }

    if(typeof target==='string'){
        return ajax_img(target)
    }else{
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = target.width
        canvas.height = target.height
        if(!ctx){
            return Promise.reject('编码base64失败')
        }
        return Promise.resolve({target,ctx}).then(({target,ctx})=>{
            ctx.drawImage(target,0,0)
            const base:string = canvas.toDataURL()
            return Promise.resolve(base)
        })
    }
}

/**
 * 创建图片元素实例对象
 * @param {string} src  图片链接
 * @param {object} opt  实例对象属性
 * @returns {Promise<HTMLImageElement>}
 */
export function createImage(src:string,opt:object={}) :Promise<HTMLImageElement>{
    return new Promise((resolve,reject)=>{
        const image:HTMLImageElement = new Image()
        mapValues(opt,function(value,key){
            image.setAttribute(key,value)
        })
        image.src = src
        image.addEventListener('load',function(){
            resolve(image)
        })
        image.addEventListener('error',function(err){
            reject(err)
        })
    })

}

/**
 * 计算跳过的数量（请求时用）
 * @param {number} p 页码
 * @param {number} limit 每页数据量
 * @returns {number}
 */
export function computed_skip(p:number,limit:number):number{
    return (p-1)*limit
}

export default {
    position,get_city_name,ucfirst,JsonEncoded,base64_img,ajax_img,get_type,createImage,computed_skip
}