// 进行local数据存储管理的工具模块
// 使用store进行数据存储
import store from 'store'

const USER_KEY='user_key';

export default{
    // 保存user
    saveUser(user){
        store.set(USER_KEY,user)
    },

    // 获取user
    getUser(){
        // console.log(store.get(USER_KEY))
        return store.get(USER_KEY)
    },

    // 删除user
    removeUser(){
        store.remove(USER_KEY)
    }

}