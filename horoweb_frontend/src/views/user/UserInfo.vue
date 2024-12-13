<template>
  <div class="profile">
    <el-card class="profile-card">
      <div class="profile-header">
        <el-avatar :src="avatar" class="header-avatar"></el-avatar>
        <div class="profile-name">{{ name }}</div>
      </div>
      <div class="profile-body">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="个人资料">
            <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formData.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="更换头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="avatar" :src="avatar" class="avatar-img">
              <i v-if="!avatar" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="更改密码">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="100px">
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="passwordForm.oldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="passwordForm.newPassword"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="passwordForm.confirmPassword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('passwordForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { updatePwd } from '@/api/user';
import { getUserInfo } from '@/api/user';
export default {
    data() {
        return {
            userInfo:null,
            activeTab: '1',
            formData: {
                username: 'admin',
                email: 'admin@example.com',
                phone: '1234567890'
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
                ]
            },
            passwordForm: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            passwordRules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度在6到20个字符之间', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: this.validateConfirmPassword, trigger: 'blur' }
                ]
            },
            //头像资源的网址
            avatar: 'https://horo-event.oss-cn-beijing.aliyuncs.com/af37e9e0-6099-4b7c-a1b3-30dd148a5f0e.jpg',
            name: 'admin'
        }
    },
    //created 钩子函数是一个生命周期钩子，它会在组件实例被创建之后自动调用
    created(){
      this.fetchUserInfo()
    },
    methods: {
      async fetchUserInfo() {
            try {
                const response = await getUserInfo(); // 调用 getUserInfo 函数获取用户信息
                this.userInfo = response.data; // 假设返回的数据结构中有一个 data 属性包含用户信息
                // 更新组件的数据属性，例如用户名、邮箱、手机号等
                this.formData.username = this.userInfo.username;
                this.formData.email = this.userInfo.email;
                this.formData.phone = this.userInfo.phone;
                // 如果需要，也可以更新头像和名称
                //this.avatar = this.userInfo.avatar;
                this.name = this.userInfo.name;
            } catch (error) {
                console.error('获取用户信息失败:', error);
                // 处理错误情况，例如显示错误消息
                this.$message.error('获取用户信息失败');
            }
        },
      async updatePassword(){
          let result=await updatePwd(this.passwordForm)
          this.$message.success(result.message)
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
              //表单验证通过
                if (valid) {
                    this.updatePassword()
      
                }
            })
        },
        validateConfirmPassword(rule, value, callback) {
            if (value!== this.passwordForm.newPassword) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        },
    }
}
</script>

<style scoped>

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
}

.profile-card {
  width: 800px;
}

.profile-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  box-sizing: border-box;
}

.header-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.profile-name {
  font-size: 24px;
  margin-left: 0;
}

.profile-body {
  padding: 20px;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.avatar-uploader:hover {
  border-color: #1db954;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>