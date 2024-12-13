<script setup>  
import { onMounted } from 'vue';  
import Live2D from './OtherVue/Live2D.vue';  

onMounted(() => {  
  initLive2D();  
});  

function initLive2D() {  
  // 初始化2D小人的逻辑  
}  
</script>  

<template>  
  <div class="link-container">  
    <Live2D/>  
    <div class="link-item">  
      <img src="https://chatglm.cn/img/logo-collapse.d00ef130.svg" alt="智普清言" class="link-icon" />  
      <a href="https://chatglm.cn/main/alltoolsdetail?lang=zh" target="_blank" title="智普清言" rel="noopener noreferrer">智普清言</a>  
    </div>  
    <div class="link-item">  
      <img src="https://img.icons8.com/?size=100&id=5E24fZ9ORelo&format=png&color=000000" alt="哔哩哔哩" class="link-icon" />  
      <a href="https://www.bilibili.com" target="_blank" title="bilibili" rel="noopener noreferrer">哔哩哔哩</a>  
    </div>  
  </div>  
</template>  

<style scoped>
.link-container {  
  margin: 20px;  
}  

.link-item {  
  display: flex; /* 使用 flex 布局 */  
  align-items: center; /* 垂直居中对齐 */  
  margin-bottom: 10px; /* 每个链接之间的间隔 */  
}  

.link-icon {  
  width: 24px; /* 根据需要设置图标的宽度 */  
  height: 24px; /* 根据需要设置图标的高度 */  
  margin-right: 10px; /* 图标与链接之间的间距 */  
}

/* 去除链接下划线 */
.link-item a {
  text-decoration: none; /* 去除下划线 */
  color: inherit; /* 保持链接颜色与父元素一致 */
}
</style>
