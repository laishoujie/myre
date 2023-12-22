<template>
    <page-container title="公告管理">
      <el-form inline>
        <el-form-item label="文章状态：">
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
        <el-table-column prop="date" label="文章标题" width="180" />
        <el-table-column prop="date" label="封面图片" width="180" />
        <el-table-column prop="date" label="公告状态" width="180" />
        <el-table-column prop="date" label="创建者" width="180" />
        <el-table-column prop="date" label="创建时间" width="180" />
        <el-table-column label="操作">
            <el-button type="primary" size="midlle">删除</el-button>      
        </el-table-column>
      </el-table>
    </page-container>
  </template>
  
  <script setup>
  </script>