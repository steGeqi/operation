import request from "../utils/request";

//All API about Image
export function ImageAPI(){
    return request({
        url:'/docker/images',
        method:'get',
    })
}

export function Img_DeleteAPI(data){
    return request({
        url:'/docker/delete_image',
        method:'post',
        data:{
            "image_id":data,
        }
    })
}

export function Pull_ImageAPI(data){
    return request({
        url:'/docker/pull_image',
        method:'post',
        data:{
            "image_name":data
        }
    })
}

export function Image_DetailsAPI(data){
    return request({
        url:'/docker/get_image_info',
        method:'get',
        params:data
    })
}


//All API about Containers
export function Container_getallAPI(){
    return request({
        url:'/docker/containers',
        method:'get'
    })
}

export function Container_detailsAPI(data){
    return request({
        url:"/docker/get_container_info",
        method:'get',
        params:data
    })
}

export function Container_startAPI(data){
    return request({
        url:'/docker/start_container',
        method:'post',
        data:data
    })
}
export function Container_stopAPI(data){
    return request({
        url:'/docker/stop_container' ,
        method:'post',
        data:data
    })
}

export function Container_delAPI(data){
    return request({
        url:'/docker/delete_container',
        method:'post',
        data:data
    })
}

export function Contaier_reaAPI(data){
    return request({
        url:'/docker/restart_container',
        method:'post',
        data:data
    })
}

export function Container_addAPI(data){
    return request({
        url:'/docker/add_container',
        method:'post',
        data:data
    })
}

//All API about NetWork
export function NetWork_getallAPI(){
    return request({
        url:'/docker/networks',
        method:'get'
    })
}