import request from '@/utils/request.js'
export const musicUpload=function(musciData){
    return request.post('music/upload',musciData)
}
export const getMusicList=function(){
    return request.post('music/getMusicList')
}
export const musicSearch=function(keyword){
    console.log(keyword)
    return request.get('music/search',{params:keyword})
}
