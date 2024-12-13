//1.导入创建实例的方法
import { createApp } from 'vue'
//2.导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//3.导入路由
import router from './router'
//4.导入页面美化组件
import Particles from 'particles.vue3'
//5.导入pinia创建函数保存token
import { createPinia } from 'pinia'
//6.导入pinia的持久化插件长久保存token
import { createPersistedState } from 'pinia-persistedstate-plugin'
//7.导入Vuetify
import vuetify from './plugins/vuetify.js'
import App from './App.vue'
//8.导入element-plus中文包
import locale from'element-plus/dist/locale/zh-cn.js'

const app=createApp(App)
const pinia=createPinia();
const persist=createPersistedState()
//pinia使用persist
pinia.use(persist)
app.use(pinia)
app.use(ElementPlus,{locale})
app.use(router)
app.use(Particles)
app.use(vuetify)
app.mount('#app')
