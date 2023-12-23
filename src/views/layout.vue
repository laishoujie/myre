<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside width="200px">
        <h2 class="mb-2">&nbsp;学术晚茶</h2>
        <el-menu
        active-text-color="#79bbff"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          router
        >
          <el-menu-item index="/activity">
            <el-icon><SetUp /></el-icon>
            <span>活动管理</span>
          </el-menu-item>
          <el-menu-item index="/excellent">
            <el-icon><Postcard /></el-icon>
            <span>精彩专栏管理</span>
          </el-menu-item>
          <el-menu-item index="/notice">
            <el-icon><DataAnalysis /></el-icon>
            <span>公告管理</span>
          </el-menu-item>
          <el-menu-item index="/recommend">
            <el-icon><DocumentChecked /></el-icon>
            <span>活动推荐管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="73px">
          <el-dropdown>
            <el-button type="primary">
              更多操作&nbsp;&nbsp;&nbsp;
              <el-icon><CaretBottom /></el-icon>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="back">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted,config } from "vue";
export default {
  name: "layout",
  setup() {
    const router=useRouter()
    function back () {
      ElMessage.success("已退出登录")
      window.sessionStorage["token"]=''
      router.push("/login");
    };
    return {
      back,
    };
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
}
.el-menu {
  background-color: #fbfbfb;
  height: 70vh;
  border-top: 1px solid #dfe3e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-menu-item {
  flex: 1;
  /* text-align: center; */
}
.mb-2 {
  color: #708597;
}
.el-header {
  padding-top: 20px;
  line-height: 110px;
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #dfe3e9;
}
</style>