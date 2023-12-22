import {defineStore } from 'pinia'
import {ref} from 'vue'
//用户模块token
export const userUserStore = defineStore('xswc-user',()=>{
    const token = ref('')
    const setToken =(newToken) => {
        token.value=newToken
    }
    const removeToken=()=>{
        token.value=' '
    }
    return{
        token,
        setToken,
        removeToken
    }
},
{persist:true}
)