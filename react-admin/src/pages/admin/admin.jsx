import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category';
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        const user=memoryUtils.user;
        // 如果内存中没有存储user =>当前没有登录
        if(!user?._id){
            // 自动跳转到登录几面
            return <Redirect to='/login'></Redirect>
        }
        return(
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            {/* <Route path="/product" component={Product}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route> */}
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验！</Footer>
                </Layout>
            </Layout>
        )
    }
}