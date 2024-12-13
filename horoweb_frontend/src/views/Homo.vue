<template>
  <div>
    <!-- 文章列表 -->
    <div v-for="article in articleList" :key="article.id" class="article-block">
      <img src="/src/assets/images/horo.jpg" alt="Article Image" class="article-image" />
      <div class="article-title">{{ article.title }}</div>
      <div class="article-content">{{ article.content }}</div>
      <div class="article-author">作者：{{ article.userName }}</div> <!-- 添加显示作者名字的元素 -->
      <router-link :to="`/article/${article.id}`" class="view-detail-link">查看详情</router-link>
      <!-- 删除按钮，通过v-if判断是否显示 -->
      <el-button v-if="article.userId == tempId" type="text" class="update-btn" @click="goToUpdateArticle(article.id)">修改</el-button>
      <el-button v-if="article.userId == tempId" type="text" class="delete-btn" @click="confirmDelete(article.id)">删除</el-button>
    </div>

    <!-- 分页控件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalArticles">
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllArticle, removeById, updateArticle } from '@/api/article';
import { ElMessage, ElMessageBox } from 'element-plus';
//从pinia中获取用户详情
import { useInfoStore } from '@/stores/userInfo';
import { useTokenStore } from '@/stores/token';
import router from '@/router';
const userInfoStore = useInfoStore();
const tokenStore = useTokenStore();
let user = ref({
    id: '',
    username: '未登录',
    email: ''
})
user.value = userInfoStore.userInfo;
let tempId = user.value.id;
console.log("userId=" + user.value.id)

// 响应式数据  
const articleList = ref([]); // 文章列表  
const currentPage = ref(1); // 当前页码  
const pageSize = ref(10); // 每页显示的条数  
const totalArticles = ref(0); // 总文章数  

// 获取文章列表的请求  
const fetchArticles = async () => {  
  const params = {  
    pageNum: currentPage.value,  
    pageSize: pageSize.value,  
  };  
  const result = await getAllArticle(params);  
  console.log(result)  
  articleList.value = result.data.articles;  
  totalArticles.value = result.data.total;  
};  

// 处理每页显示条数变化  
const handleSizeChange = (newSize) => {  
  pageSize.value = newSize;  
  fetchArticles();  
};  

// 处理页码变化  
const handleCurrentChange = (newPage) => {  
  currentPage.value = newPage;  
  fetchArticles();  
};  

// 删除文章确认  
const confirmDelete = async (articleId) => {  
  await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {  
    confirmButtonText: '确定',  
    cancelButtonText: '取消',  
    type: 'warning',  
  });  
  // 用户确认删除  
  await removeById({ id: articleId });  
  // 删除成功后刷新列表  
  fetchArticles();  
  ElMessage({  
    type: 'success',  
    message: '删除成功!',  
  });  
};  
//更新文章
const goToUpdateArticle = (articleId) => {
    router.push({
        path: '/updateArticle/' + articleId,
        query: {
            isUpdate: 'true',
            articleId: articleId
        }
    });
};

// 组件挂载时获取文章列表  
onMounted(() => {  
  fetchArticles();  
});  
</script>  

<style scoped>
.article-block {
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    background-color: #ffffff;
    cursor: default;
    transition: box-shadow 0.3s;
    min-height: 215px;
    max-width: 90%;
    display: flex;
    align-items: flex-start;
}

.article-image {
    width: 225px;
    height: 150px;
    margin-right: 30px;
}

.article-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.article-content {
    font-size: 16px;
    color: #666;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.view-detail-link {
    position: absolute;
    bottom: 10px;
    right: 20px;
    text-decoration: none;
    color: #6c6c67;
    font-size: 14px;
}

.view-detail-link:hover {
    text-decoration: underline;
}

.article-author {
    position: absolute;
    bottom: 10px;
    right: 80px;
    text-decoration: none;
    color:  #6c6c67;
    font-size: 15px;
    font-family: Arial, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    margin-right: 15px;
    text-align: right;
    transition: all 0.3s ease;
}



.delete-btn {
    position: absolute;
    bottom: 10px;
    left: 20px;
    color: #f56c6c;
    cursor: pointer;
}
.update-btn {
    position: absolute;
    bottom: 10px;
    left: 70px;
    color: #6c95f5;
    cursor: pointer;
}
</style>