import { defineStore } from "pinia";
import {ref} from 'vue'

export const useInfoStore=defineStore('userInfo',()=>{

    const userInfo=ref(
        {
            id:'',
            username:'',
            email:''
        }
    );

    const setUserInfo=function(newUserInfo){
        userInfo.value.id=newUserInfo.id;
        userInfo.value.username=newUserInfo.username;
        userInfo.value.email=newUserInfo.email;
    }
    const removeUserInfo=()=>{
        userInfo.value.id='';
        userInfo.value.username='';
        userInfo.value.email='';
    }

    return {
        userInfo,setUserInfo,removeUserInfo
    }
},{
    persist:true
}
);