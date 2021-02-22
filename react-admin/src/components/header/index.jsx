import React,{Component} from 'react'
import {reqWeather} from '../../api/index'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'
import storageUtils from '../../utils/storageUtils'
import './index.less'
import LinkButton from '../link-button'


class Header extends Component{

    state={
        currentTime:formateDate(Date.now()),    //当前时间
        dayPictureUrl:'',  //天气图片
        weather:'' ,//天气文本
    }

    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now());
            this.setState({currentTime});
        },1000)
    }

    // 第一次render()之后执行一次
    // 一般在此执行异步操作：发ajax请求/情动定时器
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }

    // 当前组件卸载之前调用
    componentWillUnmount(){
        // 清楚定时器
        clearInterval(this.intervalId)
    }

    getTitle=()=>{
        const path=this.props.location.pathname;
        let title;

        menuList.forEach(item=>{
            if(item.key===path){ 
                title=item.title
            }
            else if(item?.children){
                const cItem=item.children.find(cItem=>cItem.key===path);
                console.log(cItem);
                if(cItem){
                    title=cItem.title;
                }
            }
        })

        return title;
    }

    getWeather=async ()=>{
        const {dayPictureUrl,weather}=await reqWeather('北京');
    }

    logout=()=>{
        Modal.confirm({
            content:'确认退出吗?',
            onOk:()=>{
                // 删除数据
                storageUtils.removeUser();
                memoryUtils.user={};
                // 跳转login
                this.props.history.replace('/login');
            }
        })
    }

    render(){

        const {currentTime,dayPictureUrl,weather}=this.state;
        const user=memoryUtils.user.username;
        const title=this.getTitle();

        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{user}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)