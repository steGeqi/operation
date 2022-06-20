import request from "../utils/request";

export function Main(){
    return request({
        url:'/index',
        method:'get',
    })
}

export function Baszic_getAPI(){
    return request({
        url:'/host/info',
        method:'get'
    })
}
export function Basic_getCpuAPI(){
    return request({
        url:'/host/cpu_info',
        method:'get'
    })
}