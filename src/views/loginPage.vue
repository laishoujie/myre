<template>
  <div class="all">
    <el-row>
      <el-col :span="6" class="bg" :offset="6"/>
    <el-col :span="6" class="col">
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
          style="width: 350px;"
          v-model="formModel.username" 
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          style="width: 350px;"
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
          message: "请输入密码",
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

<style scoped>
.col{
  height: 500px;
  width: 500px;
}
.form {
  color: #696666;
  height: 400px;
  width: 350px;
  margin-top: 100px;
  padding: 30px;
  border: 1px solid #dfdede;
  border-left: 0;
  background-color: #fdfcfc;
  border-radius: 0 15px 15px 0 ; 
}
.button {
  width: 100%;
}

.all{
  background:url(../assets/background.jpg);
  /* background-color: #7ba4c6; */
  position: fixed;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}
.bg{
  height: 461px;
  width: 550px;
  border: 1px solid #dfdede;
  border-right:0;
  background:url(../assets/login.jpg);
  background-size: 100% 100%;
  margin-top: 100px;
  border-radius:15px 0 0 15px; 
}
</style>