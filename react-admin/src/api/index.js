// 包含应用中所有接口请求的模块
// 每个接口函数的返回值都是promise
// 1、统一处理请求异常
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'



// 1、登录接口
// export function reqlogin(){
//     return ajax('/login',{username,password},'POST')
// }

const BASE='http://localhost:5000'


export const reqlogin=(username,password)=>ajax('/login',{username,password},'POST')

export const reqAddUser=(user)=>ajax('/manage/user/add',user,'POST')

// jsonp请求的请求函数
export const reqWeather=(city)=>{
    return new Promise((resolve,reject)=>{
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            //如果成功了
            if(!err && data.status==='success'){
                // 取出需要数据
                const {dayPictureUrl,weather}=data.results[0].weather_data[0];
                resolve({dayPictureUrl,weather})
            }
            else{
                console.log(err);
                message.error('获取天气信息失败');
            }
        })
    })
}

// 获取一级/二级分类的参数
export const reqCategorys=(parentId)=>ajax('/manage/category/list',{parentId});

// 添加分类
export const reqAddCategory=(categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST');


//更新分类
export const reqUpdateCategory=({categoryName,parentId})=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST');
