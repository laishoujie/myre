//封装axios
import router from '@/router'
import axios from 'axios'
import { SET } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
const http = axios.create({
  baseURL: "https://www.academictime.cn:3166",
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // config.headers.Authorization="eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjcxMmY1YWVhLTE4YzktNGRlYy05MGU5LThmOTc5ZTg5MTQwNSJ9.Qj_NHXUQBC1pAqV8c2GLQkonDsdiZ3xSKxvRdiAD8Vo3PMYs4nFhwbek4Ane8jx4kmogh7Z2zPATE1EEeSINsw"
    //请求头添加token
    // const token = localStorage.getItem('token')
    if (localStorage.getItem('token')) {
      config.headers.Authorization =JSON.parse(localStorage.getItem('token'))
      console.log(config.headers.Authorization)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    ElMessage({
      message: error.msg,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default http
