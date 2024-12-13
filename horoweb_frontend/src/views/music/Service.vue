<template>
  <div class="music-page">
    <el-container>
      <el-header>  
        <div class="navbar-container">  
          <div class="navbar-logo">Music For Life</div>  
          <el-menu  
            :default-active="activeIndex"  
            class="el-menu-demo"  
            mode="horizontal"  
            @select="handleSelect"  
          >  
            <el-menu-item index="1"><router-link to="/service/musicHome">Music</router-link></el-menu-item>  
            <el-menu-item index="2"><router-link to="/service/musicSearch">搜索</router-link></el-menu-item>  
            <el-menu-item index="3"><router-link to="/service/musicBase">曲库</router-link></el-menu-item>   
            <el-menu-item index="4"><a href="#" @click.prevent="goToHomePage">返回首页</a></el-menu-item>  
          </el-menu>  
        </div>  
      </el-header>  
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer>
        <div class="footer">
          <img src="/src/assets/images/gongan.png" alt="">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=41071102000771" rel="noreferrer" target="_blank">豫公网安备41071102000771号</a>
          <a :href="beianUrl" target="_blank" class="beian-link">{{ beianNumber }}</a>
        </div>
      </el-footer> 
  </div>
</template>

<script setup>
import { ref } from 'vue';
//备案号
const beianUrl = ref('http://beian.miit.gov.cn/');
const beianNumber = ref('豫ICP备2024098729号-1');
const activeIndex = ref('1'); // 使用 Vue 3 的 Composition API 中的 ref 函数创建响应式数据

const handleSelect = (key, keyPath) => {
  // 处理导航项选择事件
  console.log(key, keyPath);
};
//返回登录页
const goToHomePage = () => {
  window.location.href = '/home'; // 假设登录页面的路径是 /login
};
</script>


<style scoped lang="scss">  
html, body {  
  margin: 0;  
  height: 100%; // 确保html和body的高度为100%  
}  

.music-page {  
  position: relative; // 确保这一层相对定位  
  background-image: url('/src/assets/images/333.jpg');  
  background-size: cover;  
  background-position: center;  
  background-repeat: no-repeat;  
  background-attachment: fixed; // 固定背景  
  height: 100vh;  
  //overflow: hidden; // 防止内容溢出  
}  

// 头部导航栏样式  
.el-header {  
  background-color: transparent;   
  color: #333;  
  display: flex;  
  align-items: center;  
  height: 60px;  
  position: fixed;  
  top: 0;  
  left: 0;  
  right: 0;  
  z-index: 1000;  
  border-bottom: none;  
  box-shadow: none;  
}  

.navbar-container {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  width: 100%;  
  padding: 0 20px;  
}  

.navbar-logo {  
  color: #333;  
  font-family: 'Arial', sans-serif;  
  font-size: 30px;  
}  

// 导航菜单样式  
.el-menu {  
  background-color: transparent;   
  border-bottom: none;  
  flex-grow: 1;  
  display: flex;  
  justify-content: flex-end;  
}  

.el-menu--horizontal > .el-menu-item {  
  height: 60px;  
  line-height: 60px;  
  border-bottom: none;  
}  

.el-menu-item {  
  margin: 0 10px;  
}  

.el-menu-item a {  
  display: block;  
  color: inherit;  
  text-decoration: none;  
}  

.el-menu-item.is-active {  
  color: #409EFF;  
  border-bottom: 2px solid #409EFF;  
}  

.el-menu-item:hover {  
  color: #409EFF;  
}  

.el-main {  
  padding-top: 60px;  
  background: transparent;  
  overflow-y: auto; // 确保主内容区域可滚动  
  z-index: 1;  
  height: calc(108vh - 60px); // 减去头部的高度  
  
}  
//备案号样式
.el-footer {
  width: 100%; // 设置宽度为100%
  margin-left: 0; // 左外边距设置为0
  margin-right: 0; // 右外边距设置为0
  background-color: #333; // 背景颜色
  color: #fff; // 文字颜色
  text-align: center; // 文本居中
  padding: 20px; // 内边距
}

.footer {
  width: 100%; // 确保footer也横向铺满
  display: flex; // 使用flex布局
  justify-content: center; // 内容居中
  align-items: center; // 垂直居中
  flex-wrap: wrap; // 允许内容换行
}

.footer img {
  max-height: 20px; // 限制图标高度
  margin-right: 5px; // 图标与文字之间的间距
}

.footer a {
  color: #fff; // 备案号颜色
  text-decoration: none; // 无下划线
  font-size: 14px; // 字体大小
  margin-right: 10px; // 备案号之间的间距
}

.footer a:hover {
  text-decoration: underline; // 鼠标悬停时显示下划线
}

  .beian-link {
    color: #fff; // 备案号颜色
    text-decoration: none; // 无下划线
    font-size: 14px; // 字体大小
  }

  .beian-link:hover {
    text-decoration: underline; // 鼠标悬停时显示下划线
  }
</style>