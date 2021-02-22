import React,{Component} from 'react'
import './index.less'
import logo from '../../assets/images/react-admin图标.svg'
import menuList from '../../config/menuConfig'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
const { SubMenu } = Menu;

class LeftNav extends Component{

    getMenuNodes=(menuList)=>{
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    (<Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}>
                            </Icon>
                            <span>{item.title}</span>
                        </Link>
                      </Menu.Item>)
                )
            }
            else{
                const path=this.props.location.pathname;
                const cItem =item.children.find(cItem=>cItem.key===path);
                if(cItem){
                    this.openKey=item.key;
                }
                pre.push(
                    <SubMenu key={item.key} title={
                        <span>
                            <Icon type={item.icon}></Icon>
                            <span>{item.title}</span>
                        </span>
                    }>
                        {
                            this.getMenuNodes(item.children)
                        }
                </SubMenu>
                )
            }
            return pre
        },[])
    }

    componentWillMount(){
        this.menuNodes=this.getMenuNodes(menuList);
    }

    render(){
        const path=this.props.location.pathname;
        const openKey=this.openKey;
        return(
            <div>
                <Link to="/" className="left-nav">
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>电商管理后台</h1>
                </header>
                </Link>
                <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                // openKeys={
                >
                   {
                       this.menuNodes
                   }
                </Menu>
            </div>
        )
    }
}

// withRouter高阶组件
// 包装非路由组建，返回一个新的组件

export default withRouter(LeftNav)