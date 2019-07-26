
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'

export var Lunbo = () => {
    return axios.get("api/getlunbo").then(res => res)
}

export var NewList = () => {
    return axios.get("api/getnewslist").then(res => res)
}

export var NewsInfo = (params) => {
    return axios.get('/api/getnew/' + params).then(res => res)
}

export var Comments = (params) => {
    return axios.get("api/getcomments/" + params.id + "?pageindex=" + params.pageIndex).then(res => res)
}

export var PostComment = (arg1, info) => {
    return axios.post('api/postcomment/'+ arg1, info).then(res => res)
}

export var NavList = () => {
    return axios.get('api/getimgcategory').then(res => res)
}

export var PicList = params => {
    return axios.get("/api/getimages/" + params).then(res => res)
}

export var PicDetails = params => {
    return axios.get("/api/getimageInfo/" + params).then(res => res)
}

export var Imgs = params => {
    return axios.get("/api/getthumimages/" + params).then(res => res)
}

export var GoodList = params => {
    return axios.get("/api/getgoods?pageindex=" + params).then(res => res)
}

export var SwiperList = params => {
    return axios.get("/api/getthumimages/" + params).then(res => res)
}

export var ProDetail = params => {
    return axios.get("/api/goods/getinfo/" + params).then(res => res)
}

export var ProDesc = params => {
    return axios.get("/api/goods/getdesc/" + params).then(res => res)
}