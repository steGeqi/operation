<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument/></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">Image List</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
             <el-icon style="font-size: 20px"><Download /></el-icon>
            <span style="font-size: 15px;font-weight: 500;position: relative;left:15px;bottom:3px">Pull image</span>
          </span>
        </div>
      </template>
      <el-form :model="pull_image">
        <el-form-item label="Image" label-width="65px">
          <el-input v-model="pull_image.image" placeholder="e.g.myImage:myTag">
            <template #prepend>docker.io</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="Pull_Image()"><el-icon><Download/></el-icon>Pull the image</el-button>
    </el-card>
    <el-card class="box-card_1">
        <template #header>
          <div class="card-header">
            <span>
             <el-icon style="font-size: 20px"><CopyDocument /></el-icon>
            <span style="font-size: 15px;font-weight: 500;position: relative;left:15px;bottom:3px">Image</span>
          </span>
          </div>
        </template>
      <el-row class="mb-4">
        <el-button-group>
          <el-button type="danger" @click="DelDialog = true"> <el-icon><Delete /></el-icon>Remove</el-button>
        </el-button-group>
      </el-row>
      <el-scrollbar height="220px">
          <el-table
              highlight-current-row
              @current-change="handleCurrentChange"
              v-loading="loading"
              element-loading-text="数据加载中"
              element-loading-svg-view-box="-10, -10, 50, 50"
              ref="tableRef"
              row-key="date"
              :data="image_form"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              style="width: 100%">
            <el-table-column type="index" label="Number" width="90" />
<!--            <el-table-column prop="image_id" label="Id" width="400"/>-->
            <el-table-column prop="image_id" label="Name" width="400">
              <template #default="scope">
                <div @click='Details(scope.row)'>{{scope.row.image_id}}</div>
              </template>
            </el-table-column>>
            <el-table-column prop="image_size" label="Size" width="120" />
            <el-table-column
                prop="image_tag"
                label="Tags"
                width="250"
            >
              <template #default="scope">
                <el-tag
                    :type='primary'
                    disable-transitions
                >{{ scope.row.image_tag }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="image_created" label="Create_time"  />
          </el-table>
      </el-scrollbar>
    </el-card>
  </el-card>
  <el-dialog v-model="details_dialog" title="容器详情">
    <el-descriptions :column="1" border  v-loading="details_loading" >
      <el-descriptions-item label="ID" label-align="center" align="center" width="150px">{{details_data.ID}}</el-descriptions-item>
      <el-descriptions-item label="image tag" label-align="center" align="center" width="150px">{{details_data.image_tag}}</el-descriptions-item>
      <el-descriptions-item label="Size" label-align="center" align="center" width="150px">{{details_data.Size}}</el-descriptions-item>
      <el-descriptions-item label="Created" label-align="center" align="center" width="150px">{{details_data.Created}}</el-descriptions-item>
      <el-descriptions-item label="Build" label-align="center" align="center" width="150px">{{details_data.Build}}</el-descriptions-item>
      <el-descriptions-item label="CMD" label-align="center" align="center" width="150px">{{details_data.CMD}}</el-descriptions-item>
      <el-descriptions-item label="ENTRYPOINT" label-align="center" align="center" width="150px">{{details_data.ENTRYPOINT}}</el-descriptions-item>
      <el-descriptions-item label="EXPOSE" label-align="center" align="center" width="150px">{{details_data.EXPOSE}}</el-descriptions-item>
      <el-descriptions-item label="VOLUME" label-align="center" align="center" width="150px">{{details_data.VOLUME}}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <el-dialog v-model="DelDialog" title="删除提醒" width="30%" center>
    <span>确认删除这条信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DelDialog = false">取消</el-button>
        <el-button type="primary" @click="Del_imsge()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ImageAPI,Pull_ImageAPI,Img_DeleteAPI,Image_DetailsAPI} from '../../api/Docker.js'
import {
  CreditCard,
  Delete,
  Download,
  CopyDocument,
} from '@element-plus/icons-vue'
import {Cpu_usage_echarts} from "../main/cpu_usage";
import * as echarts from "echarts";
import {Memort_usage} from "../main/Memory_usage";
import {ElMessage} from "element-plus";
export default {
  components:{
    CreditCard,Delete,Download,CopyDocument
  },
  data(){
    return{
      DelDialog:false,
      image_form:[],
      image_id:'',
      pull_image:{
        image:''
      },
      loading:true,
      details_dialog:false,
      details_loading:false,
      details_data:{
        image_tag:'',
        ID:'',
        Size:'',
        Created:'',
        Build:'',
        CMD:'',
        ENTRYPOINT:'',
        EXPOSE:'',
        VOLUME:''
      },
      del_id:'',
    }
  },
  created() {
    var that = this
    ImageAPI().then(function (res){
      // console.log(res)
      that.image_form = res.data
      // console.log(that.image_form)
      that.loading = false
    });
  },
  methods:{
    Pull_Image(){
      var image_name = this.pull_image.image
      if(image_name == '' || image_name == null){
        ElMessage({
          message:"请填写镜像名称",
          type:'error',
        })
      }else{
        Pull_ImageAPI(this.pull_image.image).then((res)=>{
          console.log(res)
          if(res.code == 200){
            this.pull_image.image = '';
            ElMessage({
              message:'正在下载中',
              type:"success",
            })
            this.loading = true
            var that = this
            ImageAPI().then((res)=>{
              that.image_form = res.data
              // console.log(that.image_form)
              that.loading = false
            }); //刷新页面
          } else {
            ElMessage({
              message:res.data.msg,
              type:'warning'
            })
          }
        }).catch((error)=>{
          ElMessage({
            message:error,
            type:'error'
          })
        })
      }

    },
    Details(data_){
      this.details_dialog = true
      this.details_loading = true
      console.log(data_)
      this.image_size = data_.image_size
      this.image_tag = data_.image_tag
      var data = {
        image_id:data_.image_id
      }
      // console.log(data)
      Image_DetailsAPI(data).then((res)=>{
        console.log(res.data)
        this.details_loading = false
        this.details_data.ID = res.data.config.Image
        this.details_data.CMD = res.data.config.Cmd[0]+res.data.config.Cmd[1]+res.data.config.Cmd[2]
        this.details_data.VOLUME = res.data.config.Volumes
        this.details_data.Created = res.data.created
        this.details_data.ENTRYPOINT =res.data.config.Entrypoint[0]
        this.details_data.Build ="Docker"+res.data.docker_version+'on'+res.data.os+','+res.data.architecture
        this.details_data.EXPOSE = typeof (Object.keys(res.data.config.ExposedPorts))
        this.details_data.Size = this.image_size
        this.details_data.image_tag = this.image_tag
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.del_id = val.image_id
      console.log(this.del_id)
    },
    Del_imsge(){
      var data = {
        image_id:this.del_id
      }
      console.log(data)
      Img_DeleteAPI(data).then((res)=>{
        console.log(res)
        this.DelDialog = false
        ElMessage({
          message:'正在删除',
          type:"success"
        })
        this.loading = true
        var that = this
        ImageAPI().then(function (res){
          console.log(res)
          this.image_form = res.data
          console.log(that.image_form)
          that.loading = false
        });
      })
    }
  },
}
</script>

<style scoped>
.card{
  margin: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card_1{
  position: relative;
  top: 2rem;
}
</style>
