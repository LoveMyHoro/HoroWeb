import request from '@/utils/request.js'
//get请求接收参数的格式：request.get('article/getById', { params: { id: idValue } });
export const getAllArticle=function(pageData){
    return request.get('article/getByPage',{params:pageData})
}
export const getArticleDetail=function(id){
    return request.get('article/getById',{params:id})
}
export const addArticle=function(articles){
    return request.post("article/addArticle",articles)
}
export const removeById=function(id){
    return request.get("article/remove",{params:id});
}
export const updateArticle=function(article){
    return request.post("article/updateArticle",article)
}