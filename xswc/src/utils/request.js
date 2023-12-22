import axios from "axios";
import { userUserStore } from "@/stores//user.js";
import { ElMessage } from "element-plus";
import router from '@/router'
const baseURL = 'http://localhost:5173/api'
const instance = axios.create({
    baseURL,//基础地址
    timeout:10000//超时时间
  });
  instance.interceptors.request.use(
    (config)=>{
        //携带token
        const usestore=userUserStore()
        if(usestore.token)
        {
            config.headers.Authorization=usestore.token  
        }
        return config       
    },
   ( err)=>Promise.reject(err)
  )
  instance.interceptors.response.use(
    (res)=>{
        return res
    },
    (err)=>{
        // ElMessage.error(err.response.data.message || '异常')
        return Promise.reject(err)
    }
  )
  export default instance
  export {baseURL}