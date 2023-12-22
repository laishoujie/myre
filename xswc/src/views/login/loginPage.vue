<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import {loginServe} from '@/api/user.js'
import { userUserStore } from "@/stores/user";
import {useRouter} from 'vue-router'
const form=ref()
const formModel = ref({
  username:'',
  password:''
});
const rules={
  username:[{
    required:true,
  message:'请输入用户名',
  trigger:'blur'
  }   
  ],
  password:[{
    required:true,
  message:'请输入用户名',
  trigger:'blur'
  }   
  ], 
}
const userStore = userUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  console.log(formModel.value)
  // const res = await loginServe(formModel.value)
  // userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

</script>

<template>
  <el-row>
    <el-col :span="6" :offset="9">
      <!-- 登录 -->
      <el-form
      :model="formModel"
      :rules="rules"
        ref="form"
        size="large"
        aria-autocomplete="off"
        class="form"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
          v-model="formModel.username"
          :prefix-icon="User" 
          placeholder="请输入用户名"> </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
           v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="password">
            <el-checkbox>记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style scoped>
.form {
  margin-top: 100px;
  padding: 15px;
  border: 1px solid #f5f5f5;
  background-color: #f9f9f9;
  border-radius: 15px;
}
.button {
  width: 100%;
}
.password {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>