import React,{Component} from 'react'
import {Card,Table,Button, message, Modal} from 'antd'
import {
    PlusOutlined,
    ArrowRightOutlined
  } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import {reqCategorys} from '../../api/index'
  

export default class Category extends Component{

    state={
        categorys:[],  //一级分类列表
        subCategorys:[],
        loading:false,
        parentId:'0',  //当前需要显示的分类列表的parentId
        parentName:'',
        showStatue:0,    //标识添加/更新的确认框是否显示，0:都不显示,1:显示添加,2:显示更新
    }

    // 初始化table所有列的数据
    initColumns=()=>{
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',  //显示数据名
            },
            {
                title: '操作',
                width:300,
                render:(category)=>(
                //   返回需要显示的
                    <span>
                        <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
                        {/* 如何向实践实践回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数并传入数据 */}
                        {category.parentId==='0'?<LinkButton onClick={()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton>:null}
                    </span>
                )
            },
            ];
    }

    showSubCategorys=(category)=>{
        // 更新状态
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            // 在状态更新并且重新render()后执行
            this.getCategorys();
        })
    }

    showCategorys=()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }

    getCategorys=async ()=>{
        this.setState({loading:true});
        const {parentId}=this.state;
        const res=await reqCategorys(parentId);
        this.setState({loading:false})
        if(res.status===0){
            // 取出分类数组数据（可能是一级分类数据或二级分类数据）
            const categorys=res.data;
            if(parentId==='0'){
                this.setState({categorys})
            }
            else{
                const subCategorys=res.data
                this.setState({subCategorys})
            }
        }
        else{
            message.error('获取分类列表数据失败');
        }
    }

    // 添加分类
    addCategory=()=>{
        this.handleCancel();
    }

    // 更新分类
    updateCategory=()=>{
        this.handleCancel();
    }
    
    // 响应点击取消
    handleCancel=()=>{
        this.setState({
            showStatue:0
        })
    }

    // 显示添加的确认框
    showAdd=()=>{
        this.setState({
            showStatue:1
        })
    }

    // 显示修改的确认框
    showUpdate=()=>{
        this.setState({
            showStatue:2
        })
    }

    // 准备数据
    componentWillUnmount(){
        this.initColumns();
    }

    componentDidMount(){
        // 获取一级分类列表
        this.getCategorys();
    }

    render(){
        const {categorys,loading,subCategorys,parentId,parentName,showStatue} =this.state;

        // card左侧
        const title =parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </span>
        )
        // card右侧
        const extra=(
            <Button type="primary" onClick={this.showAdd}>
               <PlusOutlined />
               添加 
            </Button>
        )

        return(
            <div>
                <Card title={title} extra={extra}>
                <Modal title="添加分类" visible={showStatue===1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <p>添加分类...</p>
                </Modal>
                <Modal title="更新分类" visible={showStatue===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <p>更新分类...</p>
                </Modal>
                    <Table dataSource={parentId==='0'?categorys:subCategorys} columns={this.columns} loading={loading} bordered rowkey='_id' pagination={{defaultPageSize:5,showQuickJumper:true}}/>
                </Card>
            </div>
        )
    }
}