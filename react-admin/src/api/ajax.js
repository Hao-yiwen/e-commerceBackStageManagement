// 发送异步ajax请求的函数模块
// 函数封装了axios库
// 函数的返回值是promise对象
//  1、在外层包装promise对象
//  在请求出错时，不reject(error),不用trycatch

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve)=>{
        let promise;
        if(type==='GET'){
            // get请求
            promise=axios.get(url,{params:data})
        }
        else{
            promise=axios.post(url,data)
        }

        promise.then(response=>{
            resolve(response)
        })
        .catch(error=>{
            message.error('请求出错:'+error)
        })
    })
}

// 请求登录接口
// ajax('/login',{username:'Tom',password:'123'},'POST').then()