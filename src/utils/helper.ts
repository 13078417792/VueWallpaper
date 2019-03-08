import axios from 'axios'
// import SparkMd5 from 'spark-md5'
import {Md5} from 'ts-md5/dist/md5';
import data from './data'

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

export default {
    position,get_city_name,ucfirst,JsonEncoded
}