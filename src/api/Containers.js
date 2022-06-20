import service from "../utils/request";
import request from "../utils/request";
export function Echarts_Api(){
    return service({
        url:'http://4s7160z281.51vip.biz/docker/start_container',
        method:'post',
        data:{
            container_data:'qwe'
        }
    })
}

export function Get_allConApi(){
    return request({
        url:'/'
    })
}