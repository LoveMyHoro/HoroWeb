//导入request.js请求工具
import request from '@/utils/request.js'
import { ElMessage } from 'element-plus';
//提供调用登录接口的函数
export const loginService=function(loginData){
    return request.post('user/login',loginData)
}

export const registerService=function(registerData){
    return request.post('user/register',registerData)
}
export const getUserInfo=function(){
    return request.get('user/getUserInfo')
}
export const updatePwd=function(updatePwd){
    return request.post('user/updatePwd',updatePwd)
}
//发送注册验证码
export const sendMailService=function(email){
    console.log(email)
    return request.post('/user/sendMail?email='+encodeURIComponent(email))
}