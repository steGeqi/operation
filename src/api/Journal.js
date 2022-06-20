import request from "../utils/request";

export function get_LogsApi(){
    return request({
        url:"/host/logs",
        method:'get'
    })
}