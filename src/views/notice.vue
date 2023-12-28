<template>
  <pagecontainer title="公告管理">
    <template #extra>
      <el-button type="primary" size="middle" @click="deleteNotice"
        >删除选中</el-button
      >
    </template>
    <el-form inline>
      <el-form-item label="公告状态：">
        <el-select v-model="form.status">
          <el-option label="正常" value="0"></el-option>
          <el-option label="关闭" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serchNotice(currentPage)">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
    v-loading="loading"
      :data="noticeData"
      height="100%"
      style="width: 100%"
      @selection-change="selectId"
      row-key="id"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="img" label="封面图片" width="180">
        <template #default="{row}">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.img"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="公告状态" width="180">
        <template #default="{ row }">
          <span v-if="row.status == 0">正常</span>
          <span v-if="row.status == 1">关闭</span>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建者" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作">
        <template #default="{row}">
        <el-button type="primary" size="midlle" @click="turn(row)"> 修改公告状态 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      @current-change="handlePageChange"
    ></el-pagination>
    <el-dialog v-model="dialogVisible" title="修改公告状态">
      <el-select v-model="statusValue">
          <el-option label="正常" value="0"></el-option>
          <el-option label="关闭" value="1"></el-option>
        </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = !dialogVisible"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="confirm"
          >
            确认
          </el-button>
        </span>
      </template>    
    </el-dialog>
  </pagecontainer>
</template>
  
  <script>
import pagecontainer from "@/components/pagecontainer.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "notice",
  components: { pagecontainer },
  setup() {
    const loading=ref(true)
    const statusValue=ref('')
    const total=ref(0)
    const max=ref(0)
    const currentPage=ref(1)
    const pageSize=ref(8)
    let token = JSON.parse(sessionStorage.getItem("token"));
    const selectList = [];
    let dialogVisible = ref(false);
    let noticeData = ref([]);
    let form = ref({
      status: "",
    });
    const formModel3 = ref({
      noticeId: "",
      specialId: "",
      status: "",
    });
    function clear() {
      form.value.status = "";
      getNotice(currentPage.value);
    }
    onMounted(() => {
      getNotice(currentPage.value);
    });
    function getNotice(pageNum) {
      axios
        .get("http://117.50.163.249:3335/system/notice/list", {
          params:{
            pageSize:pageSize.value,
            pageNum:pageNum,
          }
        })
        .then(function (res) {
          noticeData.value = res.data.rows;
          total.value = res.data.total;
          max.value=res.data.total;
          loading.value=false
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function serchNotice(pageNum) {
      axios
        .get("http://117.50.163.249:3335/system/notice/list", {
          params:{
            pageSize:pageSize.value,
            pageNum:pageNum,
            status:form.value.status
          }
        })
        .then(function (res) {
          noticeData.value = res.data.rows;
          total.value = res.data.total;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function selectId(sele) {
      selectList.value = [];
      if (sele.length > 0) {
        sele.forEach((obj) => {
          selectList.value.push(obj.noticeId);
        });
      }
    }
    function deleteNotice() {
      let data1 = selectList.value;
      axios
        .delete("http://117.50.163.249:3335/system/notice" + "/" + data1, {
          headers: {
            Authorization: token,
          },
        })
        .then(function (res) {
          getNotice(currentPage.value);
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function turn(row){
      dialogVisible.value = true;
      formModel3.value=row
      if(row.status==0){
        statusValue.value="正常"
      }else{
        statusValue.value="关闭"
      }
    }
    function confirm(){
        axios({
        method:'put',
        data:{
        specialId:JSON.parse(formModel3.value.specialId),
        noticeId:JSON.parse(formModel3.value.noticeId),
        status:JSON.parse(statusValue.value)
      },
        url:'http://117.50.163.249:3335/system/notice',
        headers:{
           Authorization:token
         },
      }).then(res=>{
        getNotice(currentPage.value)
        dialogVisible.value = !dialogVisible
      })
    }
    function handlePageChange(pageNum){
      currentPage.value=pageNum
      if(total.value==max.value){
        getNotice(pageNum)
      }else{
        serchNotice(pageNum)
      }
      
    }
    return {
      formModel3,
      noticeData,
      getNotice,
      onMounted,
      clear,
      form,
      serchNotice,
      selectId,
      deleteNotice,
      selectList,
      confirm,
      turn,
      dialogVisible,
      token,
      total,
      currentPage,
      pageSize,
      handlePageChange,
      statusValue,
      loading
    };
  },
};
</script>