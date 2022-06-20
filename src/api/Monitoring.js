import request from "../utils/request";

export function get_MonitoringsApi(){
    return request({
        url:'/monitoring/get_monitorings',
        method:'get',
    })
}

export function get_MonitoringApi(data){
    //console.log(data)
    return request({
        url:"/monitoring/get_monitoring/",
        method:'get',
        data:data
    })
}

export function add_monitoringApi(data){
    //console.log(data)
    return request({
        url:'/monitoring/add_monitoring',
        method:'post',
        data:data
    })
}

export function del_monitoringApi(data){
    //console.log(data)
    return request({
        url:'/monitoring/del_monitoring',
        method:'post',
        data:data
    })
}

export function update_MonitoringApi(data){
    return request({
        url:'/monitoring/update_monitoring',
        method:'post',
        data:data
    })
}

export function stop_MonitoringApi(data){
    return request({
        url:'/monitoring/stop_monitoring',
        method:'post',
        data:data
    })
}

export function start_MonitoringApi(data){
    return request({
        url:'/monitoring/start_monitoring',
        method:'post',
        data:data
    })
}