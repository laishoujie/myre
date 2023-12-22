<script setup>
import {
  CaretBottom
} from '@element-plus/icons-vue'
</script>
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
        <el-menu-item index="/activity/activity">
            <el-icon><location /></el-icon>
            <span>活动管理</span>
        </el-menu-item>
        <el-menu-item index="/excellent/excellent">
          <el-icon><icon-menu /></el-icon>
          <span>精彩专栏管理</span>
        </el-menu-item>
        <el-menu-item index="/notice/notice" >
          <el-icon><document /></el-icon>
          <span>公告管理</span>
        </el-menu-item>
        <el-menu-item index="/activity/recommend">
          <el-icon><setting /></el-icon>
          <span>活动推荐管理</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header height="73px">
          <el-dropdown>
      <el-button type="primary">
        更多操作&nbsp;&nbsp;&nbsp;<el-icon><caret-bottom /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
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
<style scoped>
.container{
    height: 100vh;
    background-color: #fcfcfc;
}
.el-menu{
    height: 70vh;
    border-top: 1px solid #e4e1e1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.el-menu-item{
    flex: 1;
    /* text-align: center; */
}
.mb-2{
    color: #6ab0f6;
}
.el-header{
  padding-top: 20px;
    line-height: 110px;
    display: flex;
    justify-content: end;
    border-bottom: 1px solid #e4e1e1;
}
</style>