<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from 'element-plus'
// import http from "@/network/http";
export default {
  name: "login",
  setup() {
    const router = useRouter()
    const formModel = ref({
      username: "",
      password: "",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
    };
    function getLogin(){
      let username=formModel.value.username
      let password=formModel.value.password
      axios.post('http://117.50.163.249:3335/login', {
    username: username,
    password: password
  })
  .then(function (res) {
    console.log(res);
    if(res.data.code===200){
      ElMessage.success('登录成功')
     window.sessionStorage["token"] = JSON.stringify(res.data.token);
     router.push('/')
    }else{
      ElMessage.success(res.data.msg)
    }
  })
  .catch(function (error) {
    console.log(error);
  });
    }
    return{
      useRouter,
      formModel,
      rules,
      getLogin,

      // log,
      // res
    }
  },
};
</script>

<template>
  <div class="all">
    <el-row>
    <el-col :span="6" :offset="9">
      <!-- 登录 -->
      <el-form
        :model="formModel"
        :rules="rules"
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
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
           v-model="formModel.password"
            type="password"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <div>
        </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="getLogin"
            class="button"
            type="primary"
            auto-insert-space
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <div></div>
  </div>
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

.all{
  background:url(../assets/login.jpg);
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>