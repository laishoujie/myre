//封装axios
import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const http = axios.create({
  baseURL: "https://www.academictime.cn:3166",
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization =JSON.parse(sessionStorage.getItem('token'))
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
