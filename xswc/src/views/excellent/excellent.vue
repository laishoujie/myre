<template>
    <page-container title="精彩专栏管理">
    <template #extra>
        <el-button type="primary">
            新增文章
        </el-button>
    </template>
    <el-form inline>
        <el-form-item label="标题：">
          <el-select>
            <el-option label="是" value="111"></el-option>
            <el-option label="否" value="222"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-table :data="tableData" height="100%" style="width: 100%">
        <el-table-column prop="date" label="标题" width="160" />
        <el-table-column prop="date" label="种类" width="120" />
        <el-table-column prop="date" label="封面图片" width="140" />
        <el-table-column prop="date" label="简介" width="160" />
        <el-table-column prop="date" label="正文" width="160" />
        <el-table-column prop="date" label="点赞数" width="120" />
        <el-table-column prop="date" label="浏览量" width="120" />
        <el-table-column label="操作" >
            <template #default>
            <el-button type="primary" size="middle">删除</el-button>   
            <el-button type="primary" size="middle">设为公告</el-button>
            </template>               
        </el-table-column>
      </el-table>
</page-container>    
</template>
  
<script setup>
  </script>