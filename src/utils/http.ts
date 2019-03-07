import axios from 'axios'

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

export default instance
