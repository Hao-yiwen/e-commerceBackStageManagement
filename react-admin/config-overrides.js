const {override,fixBabelImports,addLessLoader}=require('customize-cra')

module.exports=override(
    //针对antd实现按需打包，根据babel-plugin-import设置
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true
    }),

    //对蓝色值进行覆盖
    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1DA57A'}
    })
)