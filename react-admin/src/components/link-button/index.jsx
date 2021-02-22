import React,{Component} from 'react'
import './index.less'

// 外形像连接的按钮
export default function LinkButton(props){
    // console.log(props);
    return <button {...props} className="link-button"></button>
}
