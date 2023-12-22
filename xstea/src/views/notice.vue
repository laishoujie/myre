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
        <el-button type="primary" @click="serchNotice">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="noticeData"
      height="100%"
      style="width: 100%"
      @selection-change="selectId"
      row-key="id"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="img" label="封面图片" width="180" />
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
    <el-dialog v-model="dialogVisible" title="修改公告状态">
        <el-input v-model="formModel3.status" placeholder="0正常1关闭"/>
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
    let token = JSON.parse(localStorage.getItem("token"));
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
      getNotice();
    }
    onMounted(() => {
      getNotice();
    });
    function getNotice() {
      axios
        .get("http://117.50.163.249:3335/system/notice/list", {})
        .then(function (res) {
          noticeData.value = res.data.rows;
          console.log(noticeData.value);
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function serchNotice() {
      let ndata = noticeData.value;
      if (form.value.status == "") {
        noticeData.value = ndata;
      } else {
        noticeData.value = ndata.filter(
          (data) => data.status == form.value.status
        );
        console.log(noticeData.value);
      }
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
          getNotice();
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(data1);
          console.log(error);
        });
    }
    function turn(row){
      dialogVisible.value = true;
      formModel3.value = row;
    }
    function confirm(){
        axios({
        method:'put',
        data:{
        specialId:JSON.parse(formModel3.value.specialId),
        noticeId:JSON.parse(formModel3.value.noticeId),
        status:JSON.parse(formModel3.value.status)
      },
        url:'http://117.50.163.249:3335/system/notice',
        headers:{
           Authorization:token
         },
      }).then(res=>{
        getNotice()
        dialogVisible.value = !dialogVisible
      })
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
      token
    };
  },
};
</script>