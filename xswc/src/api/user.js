import request from '@/utils/request.js'

//登录
export const loginServe=({username,password})=>
request.post('/login',{username,password})