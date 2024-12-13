<template>
  <div class="music-player">
    <!-- 导航栏部分 -->
    <el-menu
      :default-active="activeIndex"
      class="navbar"
      mode="horizontal"
      background-color="#212121"
      text-color="#f5f5f5"
      active-text-color="#1ed760"
      @select="handleSelect"
    >
      <el-menu-item index="1" class="navbar-brand">
        <i class="el-icon-music"></i>Music For Life
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/service">播放器</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/service/musicBase">曲库</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/service/userInfo">个人信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/">首页</router-link>
      </el-menu-item>
    </el-menu>
    
    <!-- 音乐播放器内容 -->
    <div class="player-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';

const activeIndex = ref('1');

const handleSelect = (index, indexPath) => {
  // Handle menu item select event
  console.log(index, indexPath);
};
</script>

<style scoped>
.music-player {
  background-image: url('/src/assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
}

.player-container {
  flex: 1;
  overflow-y: auto;
  width: 100%;
}

/* Additional styles for Element Plus components */
.el-menu {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  height: 100%;
  line-height: normal;
}

.el-menu-item a {
  text-decoration: none;
  color: inherit;
}

.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
