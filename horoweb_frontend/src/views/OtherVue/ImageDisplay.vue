<template>
  <div class="image-container">
    <!-- 条件渲染：当imageUrl为空时显示加载动画 -->
    <div v-if="!imageUrl" class="loading-animation">
      加载中...
    </div>
    <!-- 当imageUrl有值时显示图片 -->
    <img v-else :src="imageUrl" alt="Random ACG Image" class="fixed-size-image" />
  </div>
  <!-- 使用Element Plus的按钮组件 -->
  <ElButton class="toggle-image-button" @click="fetchImage" type="primary">切换图片</ElButton>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElButton } from 'element-plus';

const imageUrl = ref('');
const api = "https://www.loliapi.com/acg/pc/";

const fetchImage = async () => {
  imageUrl.value = ''; // 清空图片URL以显示加载动画
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    imageUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

onMounted(fetchImage);
</script>

<style>
/* 添加样式以固定图片大小 */
.fixed-size-image {
    width: 900px; /* 设置图片宽度 */
    height: auto; /* 设置图片高度 */
    object-fit: cover; /* 保持图片的宽高比，并覆盖整个容器 */
}

/* Element Plus按钮样式 */
.toggle-image-button {
    margin-top: 20px; /* 添加一些顶部外边距 */
    width: 150px; /* 设置按钮宽度 */
    padding: 10px; /* 设置按钮内边距 */
    font-size: 16px; /* 设置按钮文字大小 */
    cursor: pointer; /* 设置鼠标悬停时为指针形状 */
}

/* 加载动画样式 */
.loading-animation {
  width: 900px; /* 与图片宽度相同 */
  height:500px; /* 设置一个合适的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 背景颜色 */
  color: #333; /* 文字颜色 */
  font-size: 24px; /* 文字大小 */
}
</style>
