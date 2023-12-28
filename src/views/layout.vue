<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <h2 class="mb-2">&nbsp;学术晚茶</h2>
        <el-menu
          active-text-color="#79bbff"
          background-color="#d9ecff"
          class="el-menu-vertical-demo"
          text-color="#fff"
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
import { useRouter,useRoute } from "vue-router";
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
.el-aside{
  /* background-color:#3e79b5; */
  background: url(../assets/background.jpg);
}
.el-menu {
  /* background-color: #3e79b5; */
  /* border-right: 1px solid #3e79b5; */
  background: url(../assets/background.jpg);
  margin-right: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-menu-item {
  flex: 1;
  margin-top: 30px;
  border-radius: 15px;
}
.mb-2 {
  color: #053259;
}
.el-header {
  background: url(../assets/background.jpg);
  padding-top: 20px;
  line-height: 110px;
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #dfe3e9;
}
.el-main {
    overflow:visible;
    background-color: #f9f9f9;
  }
</style>
