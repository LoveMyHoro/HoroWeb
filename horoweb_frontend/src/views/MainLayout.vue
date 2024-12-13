<template>  
  <div class="common-layout">  
    <el-container>  
      <el-header>  
        <div class="navbar-container">  
          <div class="navbar-logo">赫萝的个人网站</div>  
          <el-menu  
            :default-active="activeIndex"  
            class="el-menu-demo"  
            mode="horizontal"  
            @select="handleSelect"  
          >  
            <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>  
            <el-menu-item index="2"><router-link to="/about">关于</router-link></el-menu-item>  
            <el-menu-item index="3"><router-link to="/image">美图</router-link></el-menu-item>  
            <el-menu-item index="4"><router-link to="/link">网链</router-link></el-menu-item>  
            <el-menu-item index="5"><a href="#" @click.prevent="goToServicePage">音乐</a></el-menu-item>  
            <el-menu-item index="6"><a href="#" @click.prevent="goToLoginPage">返回登录页</a></el-menu-item>  
          </el-menu>  
        </div>  
      </el-header>  

      <!-- Video Section -->  
      <video  
        v-if="isHome"  
        src="/src/assets/videos/02.mp4"  
        class="background-video"  
        autoplay  
        loop  
        muted  
      ></video>  

      <el-container class="content-container">  
        <el-aside width="300px">  
          <div class="user-module">  
            <el-popover  
              placement="bottom"  
              width="200"  
              trigger="hover"  
              popper-class="custom-tooltip"  
            >  
              <template #reference>  
                <img  
                  src="/src/assets/images/music.jpg"  
                  alt="User Avatar"  
                  class="user-avatar"  
                />  
              </template>  
              <ul>  
                <li @click="goToProfilePage">个人资料</li>  
                <li @click="goToSettingsPage">设置</li>  
                <li @click.prevent="goToLoginPage">退出</li>  
              </ul>  
            </el-popover>  
            <div class="user-info">  
              <h3>{{ user.username }}</h3>  
            </div>  
            <el-button type="primary" class="add-article-button" @click="goToArticleEditPage">新增文章</el-button>  
          </div>  
          <Live2D />  
        </el-aside>  
        <el-main>  
          <router-view />  
        </el-main>  
      </el-container>  

      <el-footer>  
        <div class="footer">  
          <img src="/src/assets/images/gongan.png" alt="">  
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=41071102000771" rel="noreferrer" target="_blank" class="beian-link">豫公网安备41071102000771号</a>  
          <a :href="beianUrl" target="_blank" class="beian-link">{{ beianNumber }}</a>  
        </div>  
      </el-footer>  
    </el-container>  
  </div>  
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import Live2D from '@/views/OtherVue/Live2D.vue';
import router from '@/router';
import { getUserInfo } from '@/api/user';
// 备案号
const beianUrl = ref('http://beian.miit.gov.cn/');
const beianNumber = ref('豫ICP备2024098729号-1');
let user = ref({
  id: '',
  username: '未登录',
  email: ''
});

// 从pinia中获取用户信息
import { useInfoStore } from '@/stores/userInfo';
const userInfoStore = useInfoStore();
user.value = userInfoStore.userInfo;
console.log(user.value);

const goToServicePage = () => {
  window.location.href = '/service';
};

const goToProfilePage = () => {
  router.push('/userInfo'); // 假设个人资料的路由是 '/profile'
};

const goToSettingsPage = () => {
  router.push('/settings'); // 假设设置页面的路由是 '/settings'
};

const activeIndex = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

// 跳转文章编辑页面
const goToArticleEditPage = () => {
  // router.push('/newArticle'); // 假设文章编辑页面的路由是 '/newArticle'
  window.location.href = '/newArticle';
};

const goToLoginPage = () => {
  window.location.href = '/login'; // 假设登录页面的路径是 /login
};

// 视频资源路径，可根据实际情况修改
const videoSrc = ref('/src/assets/videos/miku.mp4');
const isHome = ref(router.currentRoute.value.path === '/home');

// 监听路由变化以更新 isHome 变量
watch(
  () => router.currentRoute.value,
  async (newRoute) => {
    isHome.value = newRoute.path === '/home';
    await nextTick(); // 确保 DOM 更新
  }
);
</script>

<style scoped lang="scss">
// 基础布局样式
.common-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // 设置最小高度为视口高度，确保能撑开页面
}

// 头部导航栏样式
.el-header {
  // 原本颜色： #c2cdbe;
  // background-color: rgba(255, 255, 255, 0.5); // 白色半透明
  background-color: rgba(255, 255, 255, 0.2);
  color: #333;
  display: flex;
  align-items: center;
  height: 60px;
  position: sticky; // 改为sticky，使其在滚动时固定在顶部
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-radius: 0; // 如果需要圆角，可以设置为大于0的值
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

.el-menu--horizontal >.el-menu-item {
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

// 侧边栏样式
.el-aside {
  background-color: #f4f4f4;
  width: 300px;
  height: calc(100vh - 60px); // 减去导航栏高度
  overflow-y: auto;
  position: sticky; // 使用 sticky 定位
  top: 60px; // 导航栏高度
  left: 0;
  z-index: 10; // 确保侧边栏在背景图上方
}

// 主区域样式
.el-main {
  background-color: #fff;
  flex-grow: 1;
  margin-left: 10px;
  overflow-y: auto;
  padding-top: 60px; // 与导航栏高度匹配
}

// 用户模块样式
.user-module {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 10px;
}

.user-info {
  text-align: center;
}

.user-info h3 {
  margin: 0;
  font-size: 16px;
  color: #0e0e0e;
}

.tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 100;
  top: 90px; // 根据需要调整位置
  left: 10px; // 根据需要调整位置
}

.tooltip ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tooltip li {
  padding: 5px 10px;
  cursor: pointer;
}

.tooltip li:hover {
  background-color: #f0f0f0; // 悬浮时的背景颜色
}

// 自定义tooltip样式
.custom-tooltip {
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.custom-tooltip ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.custom-tooltip li {
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f5f7fa; // 悬浮时的背景颜色
  }
}

// 备案号样式
.el-footer {
  width: 100%; // 设置宽度为100%
  margin-left: 0; // 左外边距设置为0
  margin-right: 0; // 右外边距设置为0
  background-color: #333; // 背景颜色
  color: #fff; // 文字颜色
  text-align: center; // 文本居中
  padding: 20px; // 内边距
  margin-top: auto; // 让footer自动占据剩余空间，将其推到页面底部
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

.background-video {  
  width: 100%;  
  height: 800px; // 设置视频的具体高度  
  object-fit: cover;  
  position: relative; // 改为相对定位，避免绝对定位造成重叠  
  z-index: 1; // 确保视频位于内容下方  
  margin-top: -60px;
}

.content-container {  
  position: relative; // 确保内容区域相对于其容器进行定位  
  z-index: 2; // 确保内容位于视频之上  
  padding-top: 20px; // 为内容顶部添加一些空间  
}
</style>