<template>
  <pagecontainer title="精彩专栏管理">
    <template #extra>
      <el-button
        type="primary"
        @click="dialogFormVisible1 = !dialogFormVisible1"
      >
        新增文章
      </el-button>
      <el-button type="primary" size="middle" @click="deleteExcellent"
        >删除选中</el-button
      >
    </template>
    <el-form inline>
      <el-form-item label="标题：">
        <el-input placeholder="请输入标题" v-model="serchKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="serchExcellent">搜索</el-button>
        <el-button @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
<el-table v-if="loading" v-loading="loading">
....
</el-table>

    <el-table
    v-lese
      :data="excellentData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      height="100%"
      @selection-change="selectId"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column prop="title" label="标题" width="140" />
      <el-table-column prop="kind" label="种类" width="120">
        <template #default="{ row }">
          <span v-if="row.kind == 1">精彩瞬间</span>
          <span v-if="row.kind == 2">科普活动</span>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面图片" width="140">
        <template #default="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.img"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="正文" width="180">
        <template #default="{ row }">
          <el-button link type="primary" size="large" @click="details1(row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="likeCount" label="点赞数" width="100" />
      <el-table-column prop="viewsNums" label="浏览量" width="100" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" size="middle" @click="turn(row)"
            >修改文章</el-button
          >
          <el-button type="primary" size="middle" @click="addNotice(row)"
            >设为公告</el-button
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
    <el-dialog v-model="dialogFormVisible1" title="新增文章">
      <el-form :model="formModel11">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formModel11.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-select v-model="formModel11.kind">
            <el-option label="精彩瞬间" value="1"></el-option>
            <el-option label="科普活动" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://117.50.163.249:3335/system/common/upload"
            :headers="head"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文" :label-width="formLabelWidth">
          <v-md-editor v-model="formModel1.content" height="400px"></v-md-editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible1 = !dialogFormVisible1"
            >取消</el-button
          >
          <el-button type="primary" @click="addExcellent"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible" title="修改文章">
      <el-form :model="formModel1">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="formModel1.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="formModel1.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-select v-model="formModel1.kind">
            <el-option label="精彩瞬间" value="1"></el-option>
            <el-option label="科普活动" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://117.50.163.249:3335/system/common/upload"
            :headers="head"
            :show-file-list="false"
            :on-success="turnSussecc"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="正文" :label-width="formLabelWidth">
          <v-md-editor v-model="formModel1.content" height="400px"></v-md-editor>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = !dialogFormVisible"
            >取消</el-button
          >
          <el-button type="primary" @click="turnExcellent"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="正文">
      <v-md-preview :text="formModel1.content"></v-md-preview>
    </el-dialog>
  </pagecontainer>
</template>
  
<script>
import pagecontainer from "@/components/pagecontainer.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "excellent",
  components: { pagecontainer },
  setup() {
    const loading=ref(true)
    const total=ref(0)
    const currentPage=ref(1)
    const pageSize=ref(2)
    let token = JSON.parse(sessionStorage.getItem("token"));
    let excellentData = ref([]);
    const form = ref({
      title: "",
    });
    let head=ref({Authorization:token})
    const dialogFormVisible = ref(false);
    const dialogFormVisible1 = ref(false);
    const dialogVisible = ref(false);
    const formLabelWidth = "140px";
    const formModel1 = ref({
      title: "",
      kind: "",
      content: "",
      img: "",
    });
    const formModel11 = ref({
      title: "",
      kind: "",
      content: "",
      img: "",
    });
    let serchKey = ref("");
    function clear() {
      serchKey.value = "";
      getExcellent();
    }
    onMounted(() => {
      getExcellent();
      // serchExcellent(currentPage.value)
      clear();
    });
    function getExcellent() {
      axios
        .get("http://117.50.163.249:3335/system/column/list", {
        })
        .then(function (res) {
          excellentData.value = res.data.rows;
          total.value = res.data.total;
          loading.value=false
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    function details1(row) {
      dialogVisible.value = true;
      formModel1.value = row;
      const newContent = formModel1.value.content.replace(/<[^>]*>/g, "");
      formModel1.value.content = newContent;
      clear();
    }
    function addExcellent() {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([formModel11.value.content]));
      reader.onload = () => {
        let base64Content = reader.result;
        axios({
          method: "post",
          data: {
            title: formModel11.value.title,
            kind: JSON.parse(formModel11.value.kind),
            content: base64Content.replace(
              "data:application/octet-stream;base64,",
              ""
            ),
            img: imageUrl.value,
          },
          url: "http://117.50.163.249:3335/system/column",
          headers: {
            Authorization: token,
          },
        }).then((res) => {
          dialogFormVisible1.value = !dialogFormVisible1;
          formModel11.value = {
            title: "",
            kind: "",
            content: "",
            img: "",
          };
          imageUrl.value=''
          getExcellent();
        });
      };
    }
    function turn(row) {
      dialogFormVisible.value = true;
      formModel1.value = row;
      console.log(row)
      if (row.kind == 1) {
        formModel1.value.kind = "精彩瞬间";
      } else {
        formModel1.value.kind = "科普活动";
      }
      imageUrl.value=row.img
    }
    function turnExcellent() {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob([formModel1.value.content]));
      reader.onload = () => {
        let base64Content = reader.result;
        if (formModel1.value.kind == "精彩瞬间") {
        formModel1.value.kind = 1;
      } else if(formModel1.value.kind = "科普活动") {
        formModel1.value.kind = 2;
      }else{
        formModel1.value.kind=formModel1.value.kind
      }
        axios({
          method: "put",
          data: {
            title: formModel1.value.title,
            kind: JSON.parse(formModel1.value.kind),
            content: base64Content.replace(
              "data:application/octet-stream;base64,",
              ""
            ),
            img: imageUrl.value,
            id: JSON.parse(formModel1.value.id),
          },
          url: "http://117.50.163.249:3335/system/column",
          headers: {
            Authorization: token,
          },
        }).then((res) => {
          console.log(res);
          dialogFormVisible.value = !dialogFormVisible;
          getExcellent()
        });
      };
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
    function deleteExcellent() {
      let data1 = selectList.value;
      const data2=[]
      axios
        .get("http://117.50.163.249:3335/system/notice/list", {})
        .then(function (res) {
          for(let j=0;j<data1.length;j++){
            for(let i=0;i<res.data.rows.length;i++){
              if(data1[j]==res.data.rows[i].specialId){
                data2.push(res.data.rows[i].noticeId)
                break
              }
            }
          }
          console.log(data2)
        })         
        .catch(function (error) {
          // 处理错误情况
          console.log(data1);
          console.log(error);
        });
        axios
        .delete("http://117.50.163.249:3335/system/column" + "/" + data1, {
          headers: {
            Authorization: token,
          },
        })
        .then(function (res) {
          console.log(res);
          getExcellent(); 
          axios
        .delete("http://117.50.163.249:3335/system/notice" + "/" + data2, {
          headers: {
            Authorization: token,
          },
        })
        .then(function (res) {   
          console.log(res)
        })
        })
         
    }
    function serchExcellent() {
      if (serchKey.value.length != 0) {
        let edata = excellentData.value;
        console.log(edata)
        excellentData.value = edata.filter((data) =>
          data.title.includes(serchKey.value)
        );
        total.value=excellentData.value.length
      }

    }
    function addNotice(row) {
      let specialId = row.id;
      axios
        .get("http://117.50.163.249:3335/system/notice/list", {})
        .then(function (res) {
          let flag = false;
          for (let i = 0; i < res.data.rows.length; i++) {
            if (res.data.rows[i].specialId == specialId) {
              flag = true;
            }
          }
          if (flag) {
            ElMessage.error("该文章已被设为公告！");
          } else {
            axios({
              method: "post",
              data: {
                specialId: specialId,
                status: 0,
              },
              url: "http://117.50.163.249:3335/system/notice",
              headers: {
                Authorization: token,
              },
            }).then((res) => {
              console.log(res);
              ElMessage.success("设置成功");
            });
          }
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        });
    }
    const imageUrl = ref("");

    const handleAvatarSuccess = (response, uploadFile) => {
       imageUrl.value = response.msg;   
    };
    const turnSussecc=(response, uploadFile)=>{
      imageUrl.value = response.msg; 
    }
    function handlePageChange(pageNum){
      currentPage.value=pageNum
    }
    return {
      excellentData,
      dialogFormVisible,
      dialogVisible,
      formLabelWidth,
      formModel1,
      clear,
      getExcellent,
      onMounted,
      addExcellent,
      details1,
      turn,
      selectList,
      selectId,
      deleteExcellent,
      form,
      serchExcellent,
      serchKey,
      turnExcellent,
      formModel11,
      dialogFormVisible1,
      addNotice,
      handleAvatarSuccess,
      imageUrl,
      turnSussecc,
      token,
      head,
      total,
      currentPage,
      pageSize,
      handlePageChange,
      loading
    };
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>