<template>
    <div class="article-container">
      <el-page-header @back="goBack" content="新增文章" class="page-header" />
      <el-form
        :model="articleForm"
        ref="articleFormRef"
        :rules="rules"
        label-width="80px"
        class="article-form"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="articleForm.title"
            placeholder="请输入文章标题"
            clearable
          />
        </el-form-item>
        <el-divider />
        <el-form-item label="内容" prop="article">
          <!-- 使用Markdown编辑器替换原有的textarea -->
          <MdEditor v-model="articleForm.article" />
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click="submitForm"
            @keyup.enter="submitForm"
          >
            提交
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { addArticle } from '@/api/article';
  import { ElMessage } from 'element-plus';
  import { useTokenStore } from "@/stores/token.js";
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  
  const router = useRouter();
  const articleForm = ref({
    title: '',
    article: '',
  });
  
  const articleFormRef = ref();
  const rules = {
    title: [
      { required: true, message: "请输入标题", trigger: "blur" },
      { min: 1, message: "标题不能为空", trigger: "blur" },
    ],
    article: [
      { required: true, message: "请输入内容", trigger: "blur" },
      { min: 1, message: "文章内容不为空", trigger: "blur" },
    ],
  };
  
  const submitForm = async () => {
    try {
      await articleFormRef.value.validate();
      const res = await addArticle(articleForm.value);
      ElMessage.success("新增文章成功！");
      resetForm(); // Reset form after successful submission
      router.push('/'); // Navigate to home or another route as needed
    } catch (error) {
      if (error instanceof Error) {
        ElMessage.error(`新增文章失败：${error.message}`);
      } else {
        ElMessage.error("表单验证失败，请检查输入");
      }
    }
  };
  
  const resetForm = () => {
    articleForm.value = { title: '', article: '' }; // Reset form fields
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  .article-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #ffffff;
  }
  
  .page-header {
    margin-bottom: 20px;
  }
  
  .article-form {
    padding: 20px;
  }
  
  .el-divider {
    margin: 20px 0;
  }
  
  .btn {
    margin-right: 10px; /* Adjust margin for better spacing */
  }
  </style>
  