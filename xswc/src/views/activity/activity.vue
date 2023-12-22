<template>
  <page-container title="活动管理">
    <el-form inline>
      <el-form-item label="是否精选：">
        <el-select>
          <el-option label="是" value="111"></el-option>
          <el-option label="否" value="222"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select>
          <el-option label="已审核" value="已审核"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="100%" style="width: 100%">
      <el-table-column prop="date" label="活动名称" width="180" />
      <el-table-column label="活动详情" width="180">
        <el-button link type="primary" size="large">查看</el-button>
      </el-table-column>
      <el-table-column label="报名人信息" width="180">
        <el-button link type="primary" size="large">查看</el-button>
      </el-table-column>
      <el-table-column prop="date" label="精选" width="180" />
      <el-table-column prop="date" label="审核" width="180" />
      <el-table-column label="操作">
          <el-button type="primary" size="midlle">删除</el-button>      
      </el-table-column>
    </el-table>
  </page-container>
</template>

<script setup>

</script>


  
  