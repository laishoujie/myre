<template>
    <page-container title="推荐管理">
      <el-form inline>
        <el-form-item label="主讲人姓名：">
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
        <el-table-column prop="date" label="学号" width="160" />
        <el-table-column prop="date" label="昵称" width="160" />
        <el-table-column prop="date" label="推荐时间" width="140" />
        <el-table-column prop="date" label="推荐理由" width="180" />
        <el-table-column prop="date" label="主讲人姓名" width="120" />
        <el-table-column prop="date" label="主题" width="180" />
        <el-table-column prop="date" label="状态" width="140" />
        <el-table-column label="操作" >
            <el-button type="primary" size="small">删除</el-button>      
        </el-table-column>
      </el-table>
    </page-container>
  </template>
  
  <script setup>

  </script>