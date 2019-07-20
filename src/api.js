
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'

export var Lunbo = (params) => {
    return axios.get(params).then(res => res)
}

export var NewList = (params) => {
    return axios.get(params).then(res => res)
}

export var NewsInfo = (params) => {
    return axios.get(params).then(res => res)
}

export var Comments = (params) => {
    return axios.get(params).then(res => res)
}