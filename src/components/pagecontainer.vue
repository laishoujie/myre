<template>
  <div style="height: 600px;">
    <el-card class="pagecontainer" :key="route.path">
      <template #header>
        <div class="header">
          <span>{{ title }}</span>
          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </div>
      </template>
       <slot>11</slot>
    </el-card>
    </div>
  </template>
<script>
import { useRoute } from 'vue-router';
export default{
    name:'pagecontainer',
    props:['title'],
    setup(){
      const route=useRoute()
      return{
        route
      }
    }
}
</script>
  <style lang="css" scoped>
.pagecontainer {
    min-height: 100%;
  }
.header {
      display: flex;
      align-items: center;
      justify-content: space-between;
}
  </style>
  <style>
  .fade-enter, .fade-leave-to {
  opacity: 0;
  display: none;
}
  </style>