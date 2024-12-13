import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    //port:80,//前端端口
    open:true,
    proxy:{
      '/api':{//获取路径中包含了api的源
        target:'http://localhost:8080',
        //target:'http://www.horoweb.cn',//后台服务所在源
        changeOrigin:true,//修改源
        rewrite:(path)=>path.replace(/^\/api/,'')//将api替换为''
      }
    }
  }
})
