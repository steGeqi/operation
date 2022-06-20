<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3">
      <span>
        <el-icon size="large" style="font-size: 30px"><CreditCard /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">Containers</span>
      </span>
    </el-card>
    <el-card>
      <el-row class="mb-4">
        <el-col>
          <el-button-group>
            <el-button type="success" @click='Container_Start'><el-icon><VideoPlay/></el-icon>Start</el-button>
            <el-button type="danger" @click="Contaier_Stop"><el-icon><VideoPause/></el-icon>Stop</el-button>
            <el-button type="danger" @click="Container_Del"><el-icon><VideoPause/></el-icon>Remove</el-button>
            <el-button type="primary" @click="dialogFormVisible=true"><el-icon><FolderAdd/></el-icon>Add</el-button>
            <el-button type="primary" @click="Container_Restaet"><el-icon><Switch/></el-icon>Restart</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-card>
    <el-table ref="tableRef" row-key="date"
              :data="tableData"
              v-loading="loadong"
              element-loading-text="数据加载中"
              element-loading-svg-view-box="-10, -10, 50, 50"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 100%">
      <el-table-column prop="container_id" label="ID" width="150" />
      <el-table-column prop="container_name" label="Name" width="150">
        <template #default="scope">
          <div @click='Details(scope.row)'>{{scope.row.container_name}}</div>
        </template>
      </el-table-column>>
      <el-table-column
          prop="container_status"
          label="State"
          width="100"
      >
        <template #default="scope">
          <el-tag
              :type="scope.row.container_status === 'Exited' ? 'danger' : 'success'"
              disable-transitions
          >{{ scope.row.container_status }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="container_IMAGE" label="Image"  />
      <el-table-column prop="container_time" label="Created"  />
      <el-table-column prop="container_port" label="Publish Ports"  />
    </el-table>
  </el-card>

  <el-dialog v-model="dialogFormVisible" title="新建容器" draggable>
    <el-form :model="NewBuild_form" label-width="120px">
      <el-form-item label="容器名称:" >
        <el-input v-model="NewBuild_form.container_name" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item
          v-for="(domain, index) in NewBuild_form.volume"
          :label="'挂载目录' + index"
          :key="domain.key"
          :prop="'volume.' + index + '.value'"
      >
        <el-row :gutter="20">
          <el-col :span="20"><el-input v-model="domain.value"></el-input></el-col>
          <el-col :span="4" ><el-button @click.prevent="removeDomain(domain)"  type="danger">删除</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain" type="primary" >新建挂载目录</el-button>
      </el-form-item>
      <el-form-item label="端口号:">
        <el-input style="width: 15%" v-model="NewBuild_form.port">
        </el-input>
      </el-form-item>
      <el-form-item
          v-for="(domain, index) in NewBuild_form.env"
          :label="'环境变量' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
      >
        <el-row :gutter="20">
          <el-col :span="20"><el-input v-model="domain.value"></el-input></el-col>
          <el-col :span="4" offset="4"><el-button @click.prevent="removePath(domain)"  type="danger">删除</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="addPath" type="primary" >新建环境变量</el-button>
      </el-form-item>
      <el-form-item label="镜像:">
        <el-input style="width: 40%" v-model="NewBuild_form.image">
        </el-input>
      </el-form-item>
      <el-form-item label="其他参数：" >
        <el-input v-model="NewBuild_form.other_info" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="Container_Add"
        >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
<!--  详情弹窗-->
  <el-dialog v-model="details_dialog" title="容器详情">
    <el-descriptions :column="1" border  v-loading="details_loading" >
      <el-descriptions-item label="ID" label-align="center" align="center" width="150px">{{details_data.ID}}</el-descriptions-item>
      <el-descriptions-item label="Name" label-align="center" align="center" width="150px">{{details_data.Name}}</el-descriptions-item>
      <el-descriptions-item label="IP address" label-align="center" align="center" width="150px">{{details_data.IP_address}}</el-descriptions-item>
      <el-descriptions-item label="Status" label-align="center" align="center" width="150px">{{details_data.status}}</el-descriptions-item>
      <el-descriptions-item label="Created" label-align="center" align="center" width="150px">{{details_data.Created}}</el-descriptions-item>
      <el-descriptions-item label="Start time" label-align="center" align="center" width="150px">{{details_data.Created}}</el-descriptions-item>
      <el-descriptions-item label="image" label-align="center" align="center" width="150px">{{details_data.image}}</el-descriptions-item>
      <el-descriptions-item label="Port configuration" label-align="center" align="center" width="150px">{{details_data.Port_configuration}}</el-descriptions-item>
      <el-descriptions-item label="CMD" label-align="center" align="center" width="150px">{{details_data.CMD}}</el-descriptions-item>
      <el-descriptions-item label="ENTRYPOINT" label-align="center" align="center" width="150px">{{details_data.ENTRYPOINT}}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>

</template>

<script>
import {
  CreditCard,
  VideoPlay,
  VideoPause,
  Switch,
  FolderAdd,
} from '@element-plus/icons-vue'
import {
  Container_getallAPI,
  Container_detailsAPI,
  Container_startAPI,
  Container_stopAPI,
  Container_delAPI,
  Contaier_reaAPI,
  Container_addAPI
} from "../../api/Docker.js"
import {ElMessage} from "element-plus";
export default {
  components:{
    CreditCard,
    VideoPlay,
    VideoPause,
    Switch,
    FolderAdd,
  },
  data(){
    return{
      loadong:true,
     tableData:[],
      NewBuild_form:{
        container_name:'',
        volume: [{
          value: '',
        }],
        port:'',
        env:[{
          value: '',
        }],
        image:'',
        other_info:'',
      },
      dialogFormVisible:false,
      details_dialog:false,
      operation_id:"",
      details_loading:false,
      details_data:{
        ID:'',
        Name:'',
        IP_address:'',
        status:'',
        Created:'',
        Start_time:'',
        image:'',
        Port_configuration:'',
        CMD:'',
        ENTRYPOINT:'',
      }
     }
  },
  mounted() {
    Container_getallAPI().then((res) =>{
      console.log(res)
      this.loadong =false
      this.tableData = res.data
    }).catch((error)=>{
      ElMessage({
        message:error,
        type:'error'
      })
    })
  },
  methods:{
    handleCurrentChange(val) {
      // console.log(val)
      this.operation_id = val.container_id
    },
    Details(row_data){
      this.details_dialog = true
      this.details_loading = true
      // console.log(row_data.container_id)
      var data =
          {
            "container_id":row_data.container_id
          }
      console.log(data)
      Container_detailsAPI(data).then((res)=>{
        console.log(res.data)
        this.details_data = {
          ID:res.data.ID,
          Name:res.data.Name,
          IP_address:res.data.NetworkSettings.Networks.bridge.IPAddress,
          status:'',
          Created:res.data.Created,
          Start_time:'',
          image:res.data.Image,
          Port_configuration:'',
          CMD:res.data.Config.Cmd,
          ENTRYPOINT:res.data.Config.Entrypoint[0],
        }
        this.details_loading = false
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
      this.details_dialog = true
    },
    Container_Start(){
      var data =
          {
            "container_id":this.operation_id
          }
      //console.log(data)
      Container_startAPI(data).then((res)=>{
        if(res.code == 200){
          this.loadong = true
          ElMessage({
            message:"启动成功",
            type:"success"
          })
          Container_getallAPI().then((res) =>{
            console.log(res)
            this.loadong =false
            this.tableData = res.data
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
    },
    Contaier_Stop(){
      var data =
          {
            "container_id":this.operation_id
          }
      //console.log(data)
      Container_stopAPI(data).then((res)=>{
        if(res.code == 200){
          this.loadong = true
          ElMessage({
            message:"停止成功",
            type:"success"
          })
          Container_getallAPI().then((res) =>{
            console.log(res)
            this.loadong =false
            this.tableData = res.data
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
    },
    Container_Del(){
      var data =
          {
            "container_id":this.operation_id
          }
      //console.log(data)
      Container_delAPI(data).then((res)=>{
        if(res.code == 200){
          this.loadong = true
          ElMessage({
            message:"删除成功",
            type:"success"
          })
          Container_getallAPI().then((res) =>{
            console.log(res)
            this.loadong =false
            this.tableData = res.data
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
    },
    Container_Restaet(){
      var data =
          {
            "container_id":this.operation_id
          }
      //console.log(data)
      Contaier_reaAPI(data).then((res)=>{
        this.loadong = true
        if(res.code == 200){
          ElMessage({
            message:"重启成功",
            type:"success"
          })
          Container_getallAPI().then((res) =>{
            console.log(res)
            this.loadong =false
            this.tableData = res.data
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
      })
    },
    Container_Add(){
      this.dialogFormVisible = false
      console.log(this.NewBuild_form)
      var data = this.NewBuild_form
      console.log(data)
      Container_addAPI(data).then((res)=>{
        console.log(res)
        Container_getallAPI().then((res) =>{
          console.log(res)
          this.loadong =false
          this.tableData = res.data
        }).catch((error)=>{
          ElMessage({
            message:error,
            type:'error'
          })
        })
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:'error'
        })
      })
    },
    addDomain() {
      this.NewBuild_form.volume.push({
        value: '',
        key: Date.now()
      });
    },
    removeDomain(item) {
      var index = this.NewBuild_form.volume.indexOf(item)
      if (index !== -1) {
        this.NewBuild_form.volume.splice(index, 1)
      }
    },
    addPath() {
      this.NewBuild_form.env.push({
        value: '',
        key: Date.now()
      });
    },
    removePath(item) {
      var index = this.NewBuild_form.env.indexOf(item)
      if (index !== -1) {
        this.NewBuild_form.env.splice(index, 1)
      }
    },
  }
}
</script>

<style scoped>
.card{
  margin: 2rem;
}
</style>
