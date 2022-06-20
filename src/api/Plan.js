import request from "../utils/request";

export function Get_PlansApi(){
    return request({
        url:'/plan/get_plans\n',
        method:'get'
    })
}
export function Get_PlanApi(data){
    return request({
        url:'/plan/get_plans',
        method:'get',
        data:data
    })
}

export function Add_PlanApi(data){
    return request({
        url:'/plan/add_plan',
        method:'post',
        data:data
    })
}

export function Del_PlanApi(data){
    return request({
        url:'/plan/del_plan',
        method:'post',
        data:data
    })
}

export function Up_PlanApi(data){
    return request({
        url:'/plan/update_plan',
        method:'post',
        data:data
    })
}
