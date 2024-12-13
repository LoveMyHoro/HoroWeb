import { createRouter, createWebHistory} from "vue-router"
import Register from '@/views/user/Register.vue'; // 注册组件  
import Login from '@/views/user/Login.vue'; // 登录组件，可能需要的  
import Home from '@/views/Homo.vue'//主页
import MainLayout from "@/views/MainLayout.vue";
import About from "@/views/About.vue";
import Service from "@/views/music/Service.vue";
import ArticleDetail from "@/views/article/ArticleDetail.vue";//文章详情页
import MusicHome from "@/views/music/MusicHome.vue";
import MusicBase from "@/views/music/MusicBase.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import Live2D from "@/views/OtherVue/Live2D.vue";
import ImageDisplay from "@/views/OtherVue/ImageDisplay.vue"
import Link from "@/views/Link.vue"
import NewArticle from "@/views/article/NewArticle.vue";
import MusicSearch from "@/views/music/MusicSearch.vue";


// 这里展现有哪些路由路径
const routes = [
    {
        path: '/',
        redirect: () => {
          // 当重定向发生时，直接修改window.location.href
          window.location.href = '/navigation.html';
          return '/navigation.html'; // 返回值实际上不会被执行，因为已经通过window.location.href改变了地址
        }
    },
    {
        path: '/home',
        component: MainLayout,
        children:[
            {path:'/home',component:Home},
            {path:'/about',component:About},
            {path:'/image',component:ImageDisplay},
            {path:'/link',component:Link}
        ]

    },
    {
        path: '/login', 
        name: 'login' ,
        component: Login  
    },
    {
        path: '/register', 
        name: 'register',  
        component: Register  
    },
    {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: ArticleDetail
    },
    {
        path:'/service',
        component:Service,
        redirect:'/service/musicHome',
        children:[
            {path:'musicHome',component:MusicHome},
            {path:'musicSearch',component:MusicSearch},
            {path:'musicBase',component:MusicBase},
        ]
    },
    {
        path:'/live2d',
        component:Live2D
    },
    {
        path:'/newArticle',
        component:NewArticle
    },
    {
        path: '/updateArticle/:articleId',
        name: 'UpdateArticle',
        component: NewArticle,
        props: (route) => ({ isUpdate: true, articleId: route.params.articleId })
    },
    {path:'/userInfo',component:UserInfo}
]

// createRouter() 来创建路由
const router = createRouter({
    routes, // 路由路径哪些
    history: createWebHistory(),
})

// 导出这个变量
export default router
