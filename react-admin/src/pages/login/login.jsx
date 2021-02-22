import {Component} from 'react'
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/images/react-admin图标.svg'
import {reqlogin} from '../../api'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default class Login extends Component{
     handleSubmit=async (values)=>{
        const {username,password}=values;
        const {data:result}=await reqlogin(username,password);
        if(result.status===0){
            message.success('登陆成功');
            const user=result.data;
            memoryUtils.user=user;
            storageUtils.saveUser(user)
            // 跳转到管理界面
            this.props.history.replace('/')

        }
        else{
            message.error(result.msg)
        }
    }

    // 对密码进行自定义验证
    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('请输入密码!')
        }
        else if(value.length<4){
            callback('密码长度不能小于4位')
        }
        else if(value.length>12){
            callback('密码长度不能大于12位')
        }
        else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文，数字或下划线组成')
        }
        else{
            callback()
        }
    }

    render(){
        if(memoryUtils.user?._id){
            return <Redirect to='/'></Redirect>
        }
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>电商后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.handleSubmit}
                            initialValues={
                                {
                                    username:'admin'
                                }
                            }
                            >
                            <Form.Item
                            name="username"
                            rules={
                                // 声明式验证
                                [{
                                    required:true,
                                    whitespace:true,
                                    message:'请输入用户名'
                                },
                                {
                                    min:4,
                                    message:'用户名至少4位'
                                },
                                {
                                    max:12,
                                    message:'用户名最多12位'
                                },
                                {
                                    pattern:/^[a-zA-Z0-9_]+$/,
                                    message:'用户名必须为英文,数字,下划线'
                                }
                            ]
                            }>
                                <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.5)'}}/>}
                                placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item
                            name="password"
                            rules={
                                [
                                    {
                                        validator:this.validatePwd
                                    }
                            ]
                            }>
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.5)'}}/>}
                                type="password"
                                placeholder="请输入密码"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

// 1、前台表单验证
// 2、提交数据



// 高阶函数
//     1、接受函数类型的参数
//     2、返回值是函数、


// 高阶组件
// 1、本质是一个函数
// 2、接受一个组件，返回一个新的组件  
// 3、扩展组件的功能
// 4、 高阶组件也是高阶函数，接受组件函数，返回一个新的组件函数\


// async和await
// 1.作用
//  简化promise使用：不用使用then()来指定成功/失败的回调函数
//  以同步编码方式实现异步流程
// 2、哪里写await?
//  在返回promise表达式左侧写await：不想要promise，想要promise异步执行成功的value数据
// 3、哪里写async？
//  await所在最近函数定义的左侧
 