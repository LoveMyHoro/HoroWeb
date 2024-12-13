<template>
  <div class="header-container">
      <el-page-header
          @back="goBack"
          :content="isUpdate.value? '更新文章' : '新增文章'"
          class="page-header"
      />
  </div>
  <el-form ref="articleFormRef" :model="articleForm" :rules="rules" class="article-form-container">
      <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="article">
          <MdEditor v-model="articleForm.article" />
      </el-form-item>
      <el-form-item style="margin: 0;">
          <div class="button-container">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
          </div>
      </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { addArticle, getArticleDetail, updateArticle } from '@/api/article';
import { ElMessage } from 'element-plus';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';


const router = useRouter();
const route = useRoute();
const isUpdate = ref(route.query.isUpdate === 'true');
const articleForm = ref({
  title: '',
  article: '',
  userName:''
});

const articleFormRef = ref();
const rules = {
  title: [
      { required: true, message: "请输入标题", trigger: "blur" },
  ],
  article: [
      { required: true, message: "请输入内容", trigger: "blur" },
  ],
};

const fetchArticleById = async () => {
  if (isUpdate.value) {
      const id = route.query.articleId;
      console.log("更新文章的id"+id)
      const result = await getArticleDetail({id:id});
      articleForm.value = {
          title: result.data.title,
          article: result.data.article
      };
  }
};

onMounted(() => {
  fetchArticleById();
});

const submitForm = async () => {
  try {
      await articleFormRef.value.validate();
      if (isUpdate.value) {
          const articleId = route.query.articleId;
          await updateArticle({...articleForm.value, id: articleId });
          ElMessage.success("文章更新成功！");
      } else {
          await addArticle(articleForm.value);
          ElMessage.success("新增文章成功！");
      }
      resetForm();
      router.push('/home');
  } catch (error) {
      ElMessage.error(error instanceof Error? `操作失败：${error.message}` : "表单验证失败，请检查输入");
  }
};

const resetForm = () => {
  articleForm.value = { title: '', article: '' };
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.page-header {
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.article-form-container {
  margin-top: 20px;
}
</style>