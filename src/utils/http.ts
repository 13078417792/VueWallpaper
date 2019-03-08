import axios from 'axios'
import apis from './api'
import {JsonEncoded} from './helper'

export const api = apis

const baseURL ='https://api.presstime.cn/'

const instance = axios.create({
    baseURL,
    timeout: 1000,
    transformRequest:[function(data, headers){
        if(data){
            data = JsonEncoded(data)
        }
        return data;
    }]
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    let {data,headers} = response
    const sessionIdField = 'x-transmission-session-id'
    const picasso = 'picasso:'

    if(headers.hasOwnProperty(sessionIdField) && !!headers[sessionIdField] && headers[sessionIdField].indexOf(picasso)===0){
        data.sessionId = headers[sessionIdField].split(':')[1]
    }

    return data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error.message || error.msg || error);
});


export default instance
