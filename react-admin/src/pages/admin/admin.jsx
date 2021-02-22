import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'

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
                            <Route path="/products" component={Home}></Route>
                            <Route path="/category" component={Home}></Route>
                            <Route path="/product" component={Home}></Route>
                            <Route path="/user" component={Home}></Route>
                            <Route path="/role" component={Home}></Route>
                            <Route path="/charts" component={Home}></Route>
                            <Route path="/charts/bar" component={Home}></Route>
                            <Route path="/charts/line" component={Home}></Route>
                            <Route path="/charts/pie" component={Home}></Route>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验！</Footer>
                </Layout>
            </Layout>
        )
    }
}