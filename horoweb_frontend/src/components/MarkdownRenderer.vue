<!-- MarkdownRenderer.vue -->
<template>
    <div v-html="renderedContent" class="article-content"></div>
  </template>
  
  <script>
  import { marked } from 'marked'; // 假设已安装marked库
  
  export default {
    props: {
      markdown: {
        type: String,
        required: true
      }
    },
    computed: {
      renderedContent() {
        return marked(this.markdown);
      }
    }
  };
  </script>
  