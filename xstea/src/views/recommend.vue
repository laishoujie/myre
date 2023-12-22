<template>
    <pagecontainer title="推荐管理">
      <template #extra>
      <el-button type="primary" size="middle">删除选中</el-button>
    </template>
    <el-form inline>
      <el-form-item label="主讲人姓名：">
        <el-input
          v-model="formModel4.id" 
            placeholder="请输入主讲人姓名"
          ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
  
      <el-table :data="recData" height="100%" style="width: 100%">
        <el-table-column prop="id" label="学号" width="180" />
        <el-table-column prop="date" label="昵称" width="180" />
        <el-table-column prop="date" label="推荐时间" width="160" />
        <el-table-column prop="date" label="推荐理由" width="200" />
        <el-table-column prop="date" label="主讲人姓名" width="140" />
        <el-table-column prop="date" label="主题" width="180" />
        <el-table-column prop="date" label="状态" width="140" />
      </el-table>
    </pagecontainer>
  </template>
  
  <script>
  import pagecontainer from '@/components/pagecontainer.vue';
  import {ref} from 'vue'
   export default{
    name:'recommend',
    components:{pagecontainer},
    setup(){
      const recData=[
        {
          id:''
        }
      ]
      const formModel4 = ref({
      id: "",
      title: "",
      kind:"",
      summary:"",
      content:"",
      likeCount:"",
      viewsNums:"",
      img:"",
      isNotice:"",

    });
    function clear(){
      formModel4.value.id=''
    }
      return{
        recData,
        formModel4,
        clear,
      }
    }
  }
  </script>