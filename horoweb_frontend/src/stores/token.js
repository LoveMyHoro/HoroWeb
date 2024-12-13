//这个js文件用于存储和管理token
import { defineStore } from "pinia";
import { ref } from "vue";
/**
 * 1.第一个参数：唯一标识作用：用于给创建的 Pinia 存储（store）赋予一个独一无二的名称。在整个应用程序中，不同的 
 * defineStore 调用所指定的名称必须相互区分开，以便准确地识别和区分各个具有不同功能或业务逻辑相关的存储实例。
 * 2.第二个参数：定义存储内容：此参数用于详细地定义 store 的具体构成内容，涵盖了状态（state）、操作（actions 等）
 * 等方面，具体取决于采用的是函数形式还是对象形式来提供该参数：
 */

export const useTokenStore=defineStore('token',()=>{

    //1.创建响应式变量token
    const token=ref('');

    //2.定义一个函数，修改token值
    const setToken=(newToken)=>{
        token.value=newToken;
    }
    //3.定义一个函数，移除token值
    const removeToken=()=>{
        token.value='';
    }

    return {
        token,setToken,removeToken
    }
},{
    persist:true
}
);