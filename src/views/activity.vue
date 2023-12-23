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
        <el-button link type="primary" size="large" @click="dialogTableVisible=true">查看</el-button>
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
          <el-select v-model="formModel2.state" :disabled="disabled">
          <el-option label="已审核" value="1"></el-option>
          <el-option label="未审核" value="2"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="报名开始时间">
          <el-input v-model="formModel2.startTime" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="报名二维码">
          <el-image
            style="width: 100px; height: 100px"
            :src="formModel2.applicationFilePath"
            fit="fill"
          ></el-image>
        </el-form-item>
        <el-form-item label="签到二维码">
          <el-image
            style="width: 100px; height: 100px"
            :src="formModel2.signinFilePath"
            fit="fill"
          ></el-image>
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
          <el-select v-model="formModel2.type" :disabled="disabled">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
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

    <el-dialog v-model="dialogTableVisible" title="报名人信息">
    <el-table :data="gridData">
      <el-table-column prop="id" label="学号" width="150" />
      <el-table-column property="name" label="姓名" width="140" />
      <el-table-column property="rename" label="昵称" />
      <el-table-column property="sex" label="性别" width="120" />
      <el-table-column property="come" label="活动状态" width="150" />
      <el-table-column property="collage" label="学院" />
    </el-table>
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
    let token=JSON.parse(sessionStorage.getItem('token'))
    let activityData = ref([]);
    let disabled=ref(true)
    const dialogTableVisible=ref(false)
    const gridData=ref([
      {
        id:'2022317220521',
        name:'来守洁',
        rename:'llai',
        sex:'女',
        come:'已签到',
        collage:'信息学院'
      },
      {
        id:'2022317220520',
        name:'张玉雪',
        rename:'Hhh',
        sex:'女',
        come:'未签到',
        collage:'信息学院'
      },
      {
        id:'2022317220522',
        name:'艾雨晴',
        rename:'lernasy',
        sex:'男',
        come:'已签到',
        collage:'水产学院'
      }
    ])
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
      disabled.value=true
      dialogFormVisible.value = true;
      formModel2.value = row;
      if(row.type=='1'){
        formModel2.value.type="是"
      }else{
        formModel2.value.type="否"
      }
      if(row.state=='1'){
        formModel2.value.state="已审核"
      }else{
        formModel2.value.state="未审核"
      }
      if(row.isEnd==1){
        formModel2.value.isEnd="已完结"
      }else{
        formModel2.value.isEnd="未完结"
      }
      clear()
    }
    function details2(row) {
      disabled.value=false
      dialogFormVisible.value = true;
      formModel2.value = row;
      if(row.type=='1'){
        formModel2.value.type="是"
      }else{
        formModel2.value.type="否"
      }
      if(row.state=='1'){
        formModel2.value.state="已审核"
      }else{
        formModel2.value.state="未审核"
      }
      if(row.isEnd==1){
        formModel2.value.isEnd="已完结"
      }else{
        formModel2.value.isEnd="未完结"
      }
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
      serchActivity,
      dialogTableVisible,
      gridData
      // data
    };
  },
};
</script>
<style scoped>

</style>