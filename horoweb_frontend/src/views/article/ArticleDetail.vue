<template>
  <div v-if="article" class="article-header">
    <el-page-header @back="goBack" content="文章详情" class="page-header" />
    <h1 class="article-title">{{ article.title }}</h1>
  </div>
  <div v-if="article" class="article-container">
    <transition name="fade">
      <div>
        <MdPreview :modelValue="article.article" />
        <MdCatalog :scrollElement="scrollElement" />
      </div>
    </transition>
    <Live2D/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticleDetail } from '@/api/article';
import { ElPageHeader, ElDivider } from 'element-plus';
import Live2D from '../OtherVue/Live2D.vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const route = useRoute();
const router = useRouter();
const article = ref(null);
const scrollElement = ref(document.documentElement);

const fetchArticleDetail = async () => {
  const id = route.params.id;
  const result = await getArticleDetail({ id });
  article.value = result.data;
};

const goBack = () => {
  router.go(-1);
};

onMounted(fetchArticleDetail);
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}


.page-header {
  margin-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.article-header {
  /* 添加以下行来设置背景图 */
  height: 300px;
  background-image: url('/src/assets/images/zll.png'); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图覆盖整个元素 */
  background-position: center; /* 背景图居中 */
  background-repeat: no-repeat; /* 不重复背景图 */
  /* 你可以添加其他背景样式，比如 background-color, background-attachment 等 */
}
.article-title {
  font-size: 2.5rem;
  margin-top:80px;
  color: #fdfdfd;
  text-align: center;
}
</style>
