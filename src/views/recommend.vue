<template>
  <pagecontainer title="推荐管理">
    <template #extra>
      <el-button type="primary" size="middle">删除选中</el-button>
    </template>
    <el-form inline>
      <el-form-item label="主讲人姓名：">
        <el-input v-model="id" placeholder="请输入主讲人姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serch">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="recData" height="100%" style="width: 100%">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="id" label="学号" width="160" />
      <el-table-column prop="name" label="昵称" width="120" />
      <el-table-column prop="time" label="推荐时间" width="110" />
      <el-table-column prop="reason" label="推荐理由" width="140" />
      <el-table-column prop="speakerName" label="主讲人姓名" width="130" />
      <el-table-column prop="title" label="主题" width="170" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="{row}">
            <span v-if="row.status==0">已推荐</span>
            <span v-if="row.status==1">有效推荐</span>
            <span v-if="row.status==2">已采纳</span>
          </template>
      </el-table-column>
      <el-table-column prop="like" label="点赞数" width="100" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="midlle" @click="turn(row)">
            修改状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="修改状态">
      <el-select v-model="formModel4.status">
          <el-option label="已推荐" value="0"></el-option>
          <el-option label="有效推荐" value="1"></el-option>
          <el-option label="已采纳" value="2"></el-option>
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
import { ref,onMounted } from "vue";
export default {
  name: "recommend",
  components: { pagecontainer },
  setup() {
    const dialogVisible = ref(false);
    const recData1 = [
      {
        id: "2022317220521",
        title: "陌上谁人依旧 固守流年 ——初心与坚守",
        name: "llai",
        status: "2",
        time: "2023-12-15",
        reason: "好好好",
        speakerName: "马克思主义学院艺术部",
        like:100
      },
      {
        id: "2022317220521",
        title: "陌上谁人依旧 固守流年 ——初心与坚守",
        name: "llai-",
        status: "2",
        time: "2023-12-15",
        reason: "好好好",
        speakerName: "马克思主义学院艺术部",
        like:120
      },
    ];
    const recData=ref([])
    let id = ref("");
    const formModel4 = ref({
      id: "",
      title: "",
      name: "",
      status: "",
      time: "",
      reason: "",
      speakerName: "",
    });
    onMounted(()=>{
      getRecommend()
    })
    function getRecommend(){
      recData.value=recData1
    }
    function clear() {
      id.value = "";
      getRecommend()
    }
    function turn(row) {
      dialogVisible.value = true;
      formModel4.value = row;
    }
    function confirm() {
      dialogVisible.value = false;
    }
    function serch(){
      if(id.value.length!=0){
        let rdata=recData1
        recData.value=rdata.filter(data=>data.speakerName.includes(id.value))

      }
    }
    return {
      recData,
      recData1,
      formModel4,
      clear,
      turn,
      confirm,
      id,
      dialogVisible,
      serch,
      getRecommend,
      onMounted
    };
  },
};
</script>