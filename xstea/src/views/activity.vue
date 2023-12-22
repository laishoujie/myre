<template>
  <pagecontainer title="活动管理">
    <template #extra>
      <el-button type="primary" size="middle" @click="deleteAct">删除选中</el-button>
    </template>
    <el-form v-model="form" inline>
      <el-form-item label="是否精选：">
        <el-select v-model="form.type">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态：">
        <el-select v-model="form.state">
          <el-option label="已审核" value="1"></el-option>
          <el-option label="未审核" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serchActivity">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table class="table" :data="activityData" height="100%" style="width: 100%" @selection-change="selectId" row-key="id">
      <el-table-column type="selection" :reserve-selection="true" width="55" />
      <el-table-column prop="userImg2" label="活动名称" width="180" />
      <el-table-column label="活动详情" width="180">
        <template #default="{ row }">
          <el-button link type="primary" size="large" @click="details1(row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="报名人信息" width="180">
        <el-button link type="primary" size="large">查看</el-button>
      </el-table-column>
      <el-table-column prop="type" label="精选" width="180">
        <template #default="{row}">
            <span v-if="row.type==1">是</span>
            <span v-if="row.type==2">否</span>
          </template>
      </el-table-column>
      <el-table-column prop="state" label="审核" width="180">
        <template #default="{row}">
            <span v-if="row.state==1">已审核</span>
            <span v-if="row.state==2">未审核</span>
          </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
        <el-button type="primary" size="midlle" @click="details2(row)"
          >修改活动信息</el-button
        >
      </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="活动详情">
      <el-form :model="formModel2">
        <el-form-item label="学术主题">
          <el-input v-model="formModel2.userImg2" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学术简介">
          <el-input v-model="formModel2.details" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发起学院">
          <el-input v-model="formModel2.hbKeyword" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动最多人数">
          <el-input v-model="formModel2.hot" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="报名人数">
          <el-input v-model="formModel2.hbNum" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学院限制">
          <el-input v-model="formModel2.depthActivities" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="限制人数">
          <el-input v-model="formModel2.deptNums" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="举办地点">
          <el-input v-model="formModel2.address" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="formModel2.createTime" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-input v-model="formModel2.state" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="报名开始时间">
          <el-input v-model="formModel2.startTime" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="报名二维码">
          <el-input
            v-model="formModel2.applicationFilePath"
            autocomplete="off"
            :disabled="disabled"
          />
        </el-form-item>
        <el-form-item label="签到二维码">
          <el-input v-model="formModel2.signinFilePath" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="举办时间">
          <el-input v-model="formModel2.lat" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="举办状态">
          <el-input v-model="formModel2.isEnd" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人">
          <el-input v-model="formModel2.speakerName" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人介绍">
          <el-input v-model="formModel2.img" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发起人电话">
          <el-input v-model="formModel2.qphone" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否精选">
          <el-input v-model="formModel2.type" :disabled="disabled" autocomplete="off" placeholder="1"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = !dialogFormVisible"
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
import pagecontainer from "@/components/pagecontainer";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import qs from 'qs'
import http from '@/network/http'
import {store} from '@/stores/index'
export default {
  name: "activity",
  components: { pagecontainer },
  setup() {
    // const clear = ref(false)
    const selectList=[]
    const route = useRoute();
    let form = ref({
      type:'',
      state:''
    });
    let token=JSON.parse(localStorage.getItem('token'))
    let activityData = ref([]);
    let disabled=ref(true)
    onMounted(() => {
      getActivity();
    });
    function getActivity() {
      axios
        .post("http://117.50.163.249:3335/system/activity/list", {})
        .then(function (res) {
          activityData.value = res.data.rows;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function serchActivity() {
      axios
        .post("http://117.50.163.249:3335/system/activity/list", {
          "type":JSON.parse(form.value.type),
            "state":JSON.parse(form.value.state),
          headers:{
           Authorization:token
         },
        })
        .then(function (res) {
          console.log(res)
          activityData.value = res.data.rows;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    let dialogFormVisible = ref(false);
    const formModel2 = ref({
      address: "",
      applicationFilePath: "",
      cityname: "",
      createTime: "",
      datetime: "",
      deptActivities: [],
      deptNums: "",
      details: "",
      hbKeyword: "",
      hbNum: "",
      hong: "",
      hot: "",
      id: "",
      img: "",
      isEnd: "",
      lat: "",

      qphone: "",
      signinFilePath: "",
      speakerName: "",
      startTime: "",
      state: 2,
      type: 2,
      userImg2: "",
    });
    function clear() {
      console.log(form.value.type)
      form.value.type = "";
      form.value.state = "";
      getActivity()
      // console.log(localStorage.getItem('token')
    }
    function details1(row) {
      dialogFormVisible.value = true;
      formModel2.value = row;
      console.log(formModel2.value);
      clear()
    }
    function details2(row) {
      disabled.value=false
      dialogFormVisible.value = true;
      formModel2.value = row;
    }
    function confirm(){
      axios({
        method:'put',
        data:formModel2.value,
        url:'http://117.50.163.249:3335/system/activity',
        headers:{
           Authorization:token
         },
      }).then(res=>{
        console.log(res)
        dialogFormVisible.value = !dialogFormVisible
      })
    }
    function selectId(sele){
      selectList.value=[]
      if(sele.length>0){
        sele.forEach(obj=>{
          selectList.value.push(obj.id)
        })
      }
    }
    function deleteAct(){
      let data1=selectList.value
      axios
        .delete("http://117.50.163.249:3335/system/activity"+'/'+data1,{
        headers:{
          Authorization:token
        },
        })
        .then(function (res) {
          console.log(data1)
          console.log(res)
          getActivity()
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(data1)
          console.log(error);
        });
    }
    return {
      activityData,
      formModel2,
      dialogFormVisible,
      form,
      clear,
      getActivity,
      onMounted,
      details1,
      details2,
      route,
      disabled,
      confirm,
      deleteAct,
      selectId,
      selectList,
      token,
      serchActivity
      // data
    };
  },
};
</script>
<style scoped>

</style>