//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token.js';


//添加请求拦截器
instance.interceptors.request.use(
    //回调函数是作为参数传递给另一个函数的函数。当被传入的函数执行到特定的阶段或满足特定条件时，会调用这个作为
    //参数传递进来的回调函数，以完成一些额外的、与特定场景相关的操作。

    //config是配置的意思
    (config)=>{
        //这个是请求前的回调函数
        //添加token
        const tokenStore=useTokenStore();
        //判断有没有token
        if(tokenStore.token){
            config.headers.token=tokenStore.token;
        }
        return config;
    },
    (err)=>{
        //这个是请求失败的回调
        Promise.reject(err);
        
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code==200){
            return result.data;
        }else{
            console.log(result)
            ElMessage.error(result.data.message?result.data.message:'服务异常')
            //异步状态转换为失败
            return Promise.reject(result.data)
        }


    },
    err=>{
        if(err.response.status==401){
            ElMessage.error('请先登录')
            return Promise.reject(err);//异步的状态转化成失败的状态
        }
        ElMessage.error('服务异常')
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;