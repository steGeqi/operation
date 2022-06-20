import request from "../utils/request";

export function get_AllApi(){
    return request({
        url:'/host/security_groups',
        method:'get'
    })
}

export function add_GroupzApi(data){
    //console.log(data)
    return request({
        url:'/host/add_security_group',
        method:'post',
        data:data
    })
}

export function edit_GroupApi(data){
    console.log(data)
    return request({
        url:"/host/update_security_group",
        method:'post',
        data:data
    })
}
export function delete_GroupApi(data){
    console.log(data)
    return request({
        url:'/host/del_security_group',
        method:'post',
        data:data
    })
}