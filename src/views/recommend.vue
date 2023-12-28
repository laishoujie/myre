<template>
  <pagecontainer title="推荐管理">
    <template #extra>
      <el-button type="primary" size="middle" @click="deleteRecommend">删除选中</el-button>
    </template>
    <el-form inline>
      <el-form-item label="主讲人姓名：">
        <el-input placeholder="请输入主讲人姓名" v-model="serchKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serchRecommend">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
    v-loading="loading"
      :data="recData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="100%"
      style="width: 100%"
      @selection-change="selectId"
      row-key="id"
    >
      <el-table-column type="selection" width="40" :reserve-selection="true" />
      <el-table-column prop="userId" label="学号" width="100" />
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="avatar" label="头像" width="120">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.avatar"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="推荐时间" width="100" />
      <el-table-column prop="content" label="推荐理由" width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="large" @click="details(row)"
            >查看</el-button
          >
        </template>
        </el-table-column>
      <el-table-column prop="lecturerName" label="主讲人姓名" width="120" />
      <el-table-column prop="theme" label="主题" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <span v-if="row.status == 1">已推荐</span>
          <span v-if="row.status == 2">有效推荐</span>
          <span v-if="row.status == 3">已采纳</span>
        </template>
      </el-table-column>
      <el-table-column prop="likeCount" label="点赞数" width="80" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" size="midlle" @click="turn(row)">
            修改状态
          </el-button>
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
    <el-dialog v-model="dialogVisible" title="修改状态">
      <el-select v-model="statusValue">
        <el-option label="已推荐" value="1"></el-option>
        <el-option label="有效推荐" value="2"></el-option>
        <el-option label="已采纳" value="3"></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = !dialogVisible">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible1" title="正文">
      <v-md-preview :text="formModel4.content"></v-md-preview>
    </el-dialog>
  </pagecontainer>
</template>
  
  <script>
import pagecontainer from "@/components/pagecontainer.vue";
import { ref, onMounted } from "vue";
import http from "@/network/http";
import { apiGetRecommend,turnStatus,deleteRec } from "@/api/index.js";
import { Loading } from "@element-plus/icons";
export default {
  name: "recommend",
  components: { pagecontainer },
  setup() {
    const loading=ref(true)
    const statusValue=ref('')
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(8);
    const dialogVisible = ref(false);
    const dialogVisible1 = ref(false);
    let recData = ref([]);
    let rdata=ref([])
    let serchKey = ref("");
    const formModel4 = ref({});
    onMounted(() => {
      getRecommend();
    });
    function getRecommend() {
      apiGetRecommend().then((res) => { 
        console.log(res)
        recData.value = res.rows;
        rdata.value=res.rows;
        total.value = res.total;
        loading.value=false
      });
    }
    function clear() {
      serchKey.value = "";
      getRecommend();
    }
    function turn(row) {
      dialogVisible.value = true;
      formModel4.value = row;
      console.log(row)
      if(row.status=='1'){
        statusValue.value="已推荐"
      }else if(row.status=='2'){
        statusValue.value="有效推荐"
      }else{
        statusValue.value="已采纳"
      }
    }
    function confirm() {
      console.log(formModel4.value)
      formModel4.value.status=statusValue.value
      turnStatus(formModel4.value).then((res)=>{
        getRecommend()
      });
      dialogVisible.value = false;
    }   
    function details(row){
      dialogVisible1.value = true;
      formModel4.value = row;
      const newContent = formModel4.value.content.replace(/<[^>]*>/g, "");
      formModel4.value.content = newContent;
      clear();
    } 
    function serchRecommend() {
      rdata.value=recData.value
      if (serchKey.value.length!=0) {     
        rdata.value = rdata.value.filter((data) =>
          data.lecturerName!=null
        );
        recData.value = rdata.value.filter((data) =>
          data.lecturerName.includes(serchKey.value)
        );
        total.value=recData.value.length
      }    
      }
    function handlePageChange(pageNum) {
      currentPage.value = pageNum;
    }
    const selectList = [];
    function selectId(sele) {
      selectList.value = [];
      if (sele.length > 0) {
        sele.forEach((obj) => {
          selectList.value.push(obj.id);
        });
      }
    }
    function deleteRecommend(){
      let data1 = selectList.value;
      deleteRec(data1).then((res)=>{
        getRecommend()
      })
    }
    return {
      rdata,
      recData,
      formModel4,
      clear,
      turn,
      confirm,
      serchKey,
      dialogVisible,
      dialogVisible1,
      serchRecommend,
      getRecommend,
      onMounted,
      total,
      currentPage,
      pageSize,
      handlePageChange,
      statusValue,
      deleteRecommend,
      selectId,
      loading,
      details
    };
  },
};
</script>