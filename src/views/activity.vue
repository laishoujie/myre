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

    <el-table v-loading="loading" class="table" :data="activityData" height="100%" style="width: 100%" @selection-change="selectId" row-key="id">
      <el-table-column type="selection" :reserve-selection="true" width="55" />
      <el-table-column prop="userImg2" label="活动名称"/>
      <el-table-column label="活动详情" width="140">
        <template #default="{ row }">
          <el-button link type="primary" size="large" @click="details1(row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="报名人信息" width="140">
        <template #default="{ row }">
         <el-button link type="primary" size="large" @click="signInfo(row)">查看</el-button>
      </template>
      </el-table-column>
      <el-table-column prop="type" label="精选" width="120">
        <template #default="{row}">
            <span v-if="row.type==1">是</span>
            <span v-if="row.type==2">否</span>
          </template>
      </el-table-column>
      <el-table-column prop="state" label="审核" width="120">
        <template #default="{row}">
            <span v-if="row.state==1">已审核</span>
            <span v-if="row.state==2">未审核</span>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="{ row }">
        <el-button type="primary" size="midlle" @click="details2(row)"
          >修改活动信息</el-button
        >
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
    <el-dialog v-model="dialogDetFormVisible" title="活动详情">
      <el-form :model="formModel2">
        <el-form-item label="学术主题">
          <el-input v-model="formModel2.userImg2" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学术简介">
          <el-input v-model="formModel2.details" :disabled="disabled" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"/>
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
            :src="imageUrl1"
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
          <el-select v-model="formModel2.isEnd" :disabled="disabled">
          <el-option label="未完结" value="1"></el-option>
          <el-option label="已完结" value="2"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="主讲人">
          <el-input v-model="formModel2.speakerName" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人介绍">
          <el-input v-model="formModel2.img" :disabled="disabled" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"/>
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
          <el-button @click="dialogDetFormVisible = !dialogDetFormVisible"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="dialogDetFormVisible = !dialogDetFormVisible"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible" title="修改活动信息">
      <el-form :model="formModel2">
        <el-form-item label="学术主题">
          <el-input v-model="formModel2.userImg2" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学术简介">
          <el-input v-model="formModel2.details" :disabled="disabled" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"/>
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
          <el-upload
            class="avatar-uploader"
            action="http://117.50.163.249:3335/system/common/upload"
            :headers="head"
            :show-file-list="false"
            :on-success="turnSussecc1"
          >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="签到二维码">
          <el-upload
            class="avatar-uploader"
            action="http://117.50.163.249:3335/system/common/upload"
            :headers="head"
            :show-file-list="false"
            :on-success="turnSussecc2"
          >
          <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="举办时间">
          <el-input v-model="formModel2.lat" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="举办状态">
          <el-select v-model="formModel2.isEnd" :disabled="disabled">
          <el-option label="未完结" value="1"></el-option>
          <el-option label="已完结" value="2"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="主讲人">
          <el-input v-model="formModel2.speakerName" :disabled="disabled" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人介绍">
          <el-input v-model="formModel2.img" :disabled="disabled" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"/>
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
      <el-table-column prop="userName" label="学号" width="100" />
      <el-table-column property="name" label="姓名" width="100" />
      <el-table-column property="nickName" label="昵称" />
      <el-table-column property="sex" label="性别" width="100">
        <template #default="{row}">
            <span v-if="row.sex==1">女</span>
            <span v-if="row.sex==2">男</span>
          </template>
      </el-table-column>
      <el-table-column property="status" label="活动状态" width="120">
        <template #default="{row}">
            <span v-if="row.status==1">未签到</span>
            <span v-if="row.status==2">已签到</span>
            <span v-if="row.status==3">失约</span>
          </template>
        </el-table-column>
      <el-table-column property="faculty" label="学院" />
    </el-table>
  </el-dialog>
  </pagecontainer>
</template>
  <script>
import pagecontainer from "@/components/pagecontainer";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios"
export default {
  name: "activity",
  components: { pagecontainer },
  setup() {
    const loading=ref(true)
    const total=ref(0)
    const max=ref(0)
    const currentPage=ref(1)
    const pageSize=ref(8)
    const selectList=[]
    const route = useRoute();
    let form = ref({
      type:'',
      state:''
    });
    let token=JSON.parse(sessionStorage.getItem('token'))
    let head=ref({Authorization:token})
    let activityData = ref([]);
    let disabled=ref(true)
    const dialogTableVisible=ref(false)
    const gridData=ref([])
    onMounted(() => {
      getActivity(currentPage.value);
    });
    function getActivity(pageNum) {
      axios
        .post("http://117.50.163.249:3335/system/activity/list", {
          "pageSize":pageSize.value,
          "pageNum":pageNum
        })
        .then(function (res) {
          activityData.value = res.data.rows;
          total.value = res.data.total;
          max.value=res.data.total
          loading.value=false
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function handlePageChange(pageNum){
      currentPage.value=pageNum
      if(total.value==max.value){
        getActivity(pageNum)
      }else{
        serchActivity(pageNum)
      }
      
    }
    function serchActivity(pageNum) {
      let type=ref('')
      let state=ref('')
      if(form.value.type){
        type.value=JSON.parse(form.value.type)
      }else{
        type.value=""
      }
      if(form.value.state){
        state.value=JSON.parse(form.value.state)
      }else{
        state.value=""
      }
      axios
        .post("http://117.50.163.249:3335/system/activity/list", {
          "type":type.value,
            "state":state.value,
            "pageSize":pageSize.value,
            "pageNum":pageNum,
          headers:{
           Authorization:token
         },
        })
        .then(function (res) {
          console.log(res)
          activityData.value = res.data.rows;
          total.value = res.data.total;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    let dialogFormVisible = ref(false);
    let dialogDetFormVisible = ref(false);
    const imageUrl1 = ref("");
    const imageUrl2 = ref("");
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
      getActivity(currentPage.value);
    }
    function details1(row) {
      disabled.value=true
      dialogDetFormVisible.value = true;
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
        formModel2.value.isEnd="未完结"
      }else{
        formModel2.value.isEnd="已完结"
      }
      imageUrl1.value=row.applicationFilePath
      imageUrl2.value=row.signinFilePath
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
        formModel2.value.isEnd="未完结"
      }else{
        formModel2.value.isEnd="已完结"
      }
      imageUrl1.value=row.applicationFilePath
      imageUrl2.value=row.signinFilePath
    }
    function confirm(){
      formModel2.value.applicationFilePath=imageUrl1.value
      formModel2.value.signinFilePath=imageUrl2.value
      if(formModel2.value.type="是"){
        formModel2.value.type=1
      }else if(formModel2.value.type="否"){
        formModel2.value.type=2
      }else{
        formModel2.value.type=formModel2.value.type
      }
      if(formModel2.value.state="已审核"){
        formModel2.value.state=1
      }else if(formModel2.value.state="未审核"){
        formModel2.value.state=2
      }else{
        formModel2.value.state=formModel2.value.state
      }
      if(formModel2.value.isEnd="未完结"){
        formModel2.value.isEnd=1
      }else if(formModel2.value.isEnd="已完结"){
        formModel2.value.isEnd=2
      }else{
        formModel2.value.isEnd=formModel2.value.isEnd
      }
      axios({
        method:'put',
        data:formModel2.value,
        url:'http://117.50.163.249:3335/system/activity',
        headers:{
           Authorization:token,
           CacheControl: 'no-cache'
         },
      }).then(res=>{
        console.log(res)
        getActivity(currentPage.value)
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
          getActivity(currentPage.value)
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(data1)
          console.log(error);
        });
    }
    const turnSussecc1=(response, uploadFile)=>{
      imageUrl1.value = response.msg;
    }
    const turnSussecc2=(response, uploadFile)=>{
      imageUrl2.value = response.msg
    }
    function signInfo(row){
      dialogTableVisible.value=true
      axios
        .get("http://117.50.163.249:3335/system/activity"+'/'+row.id, {
          headers:{
            Authorization:token
          }
        })
        .then(function (res) {
          console.log(res)
          gridData.value=res.data.data.tblUserActivities
        })
        .catch(function (error) {
          // 处理错误情况
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
      gridData,
      turnSussecc1,
      turnSussecc2,
      imageUrl1,
      imageUrl2,
      dialogDetFormVisible,
      head,
      total,
      currentPage,
      pageSize,
      handlePageChange,
      max,
      signInfo,
      loading
      // data
    };
  },
};
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
