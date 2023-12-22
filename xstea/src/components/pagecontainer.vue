<template>
    <el-card class="pagecontainer">
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
  </template>
<script>
export default{
    name:'pagecontainer',
    props:['title'],
}
</script>
  <style lang="css" scoped>
.pagecontainer {
    min-height: 100%;
    /* box-sizing: border-box; */
  }
.header {
      display: flex;
      align-items: center;
      justify-content: space-between;
}
  </style>