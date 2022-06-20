<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">监控预警-查看</span>
      </span>
    </el-card>
    <el-card class="box-card">
<!--      <template #header>-->
<!--        <div class="card-header">-->
<!--          <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--            <el-form-item label="任务名称">-->
<!--              <el-input v-model="formInline.name" placeholder="请输入" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="任务状态">-->
<!--              <el-select v-model="formInline.state" placeholder="任务状态">-->
<!--                <el-option label="Zone one" value="shanghai" />-->
<!--                <el-option label="Zone two" value="beijing" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--              <el-button type="primary" @click="onSubmit"><el-icon><Refresh/></el-icon>刷新</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </div>-->
<!--      </template>-->
      <el-scrollbar height="450px">
      <el-table :data="tableData"
                v-loading="loadong"
                element-loading-text="数据加载中"
                element-loading-svg-view-box="-10, -10, 50, 50"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                style="width: 100%">
        <el-table-column  prop="monitoring_id" label="序号" width="80" />
        <el-table-column prop="monitoring_name" label="任务名称"  />
        <el-table-column  prop="monitoring_type" label="类型" width="150" />
        <el-table-column
              prop="monitoring_status"
              label="状态"
              width="200">
            <template #default="scope">
              <el-tag
                  :type="scope.row.monitoring_status === '停止' ? 'danger' : 'success'"
                  disable-transitions
              >{{ scope.row.monitoring_status }}</el-tag
              >
            </template>
          </el-table-column>
        <el-table-column prop="monitoring_detection_frequency" label="频率" width="200" />
        <el-table-column prop="monitoring_msg" label="信息" width="200" />

        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button v-show="scope.row.monitoring_status =='启动'" @click="stop_minitoring(scope.row.monitoring_id)" type="text" size="small" >停止</el-button>
            <el-button v-show="scope.row.monitoring_status =='停止'" @click="start_minitoring(scope.row.monitoring_id)" type="text" size="small" >启动</el-button>
            <el-button type="text" size="small" @click="handlEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </el-card>
  </el-card>
  <el-dialog v-model="del_Dialog" title="删除提醒" width="30%">
    <span>确认删除这条信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="del_Dialog = false">取消</el-button>
        <el-button type="primary" @click="del_monitoring"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="编辑">
    <el-form :model="editData" label-width="120px" style="width: 100%">
        <el-form-item label="序号">
          <el-input v-model="editData.monitoring_id" autocomplete="off" disabled/>
        </el-form-item>
      <el-form-item label=任务名称>
        <el-input v-model="editData.monitoring_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="editData.monitoring_type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="信息">
        <el-input v-model="editData.monitoring_msg" autocomplete="off" />
      </el-form-item>
      <el-form-item label="频率">
        <el-input v-model="editData.monitoring_detection_frequency" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="EditUpdate">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {
  CopyDocument,
  Refresh,
  Plus
} from '@element-plus/icons-vue'
import {
  get_MonitoringsApi,
  get_MonitoringApi,
  add_monitoringApi,
  stop_MonitoringApi,
  update_MonitoringApi,
  del_monitoringApi, start_MonitoringApi,
} from "../../api/Monitoring";
import {ElMessage} from "element-plus";

export default {
  components:{
    CopyDocument,Refresh,Plus
  },
  data(){
    return{
      loadong:false,
      del_Dialog:false,
      dialogFormVisible:false,
      tableData:[],
      editData:[],
      del_id:'',
      start_id:'',
      stop_id:'',
      formInline:{
        name: '',
        state: '',
      }
    }

  },
  mounted() {
    this.loadong = true
    get_MonitoringsApi().then((res)=>{
      this.loadong = false
      console.log(res)
      if(res.code != 200){
        ElMessage({
          message:res.msg,
          type:"error"
        })
      }else{
        this.tableData =  res.data
        ElMessage({
          message:"数据加载完成",
          type:'success'
        })
      }
    })
  },
  methods:{
    handlEdit(data){
      this.dialogFormVisible = true
      console.log(data)
      this.editData = data
    },
    EditUpdate(){
      var data = this.editData
      console.log(data)
      this.dialogFormVisible = false
      update_MonitoringApi(data).then((res)=>{
        console.log(res)
        if(res.code == 200){
          ElMessage({
            message:'修改成功！',
            type:'success'
          })
        }else {
          ElMessage({
            message:res.msg,
            type:'error'
          })
        }
      })
    },
    del(data){
      console.log(data)
      this.del_id = data.monitoring_id
      this.del_Dialog = true
    },
    del_monitoring(){
      this.loadong = true
      this.del_Dialog = false
      var data = {
        monitoring_id:this.del_id
      }
      console.log(data)
      del_monitoringApi(data).then((res)=>{
        console.log(res)
        this.loadong = false
        if(res.code == 200){
          ElMessage({
            message:'删除成功',
            type:"success"
          })
          get_MonitoringsApi().then((res)=>{
            console.log(res)
            this.tableData =  res.data
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      })
    },
    stop_minitoring(data_){
      this.loadong = true
      console.log(data_)
      var data={
        monitoring_id:data_
      }
      ElMessage({
        message:"正在停止",
        type:'success'
      })
      stop_MonitoringApi(data).then((res)=>{
        // console.log(res)
        this.loadong = false
        if(res.code = 200){
          ElMessage({
            message:'已停止',
            type:"success"
          })
          get_MonitoringsApi().then((res)=>{
            console.log(res)
            if(res.code != 200){
              ElMessage({
                message:res.msg,
                type:"error"
              })
            }else{
              this.tableData =  res.data
              ElMessage({
                message:"数据加载完成",
                type:'success'
              })
            }
          })
        }else{
          ElMessage({
            message:red.msg,
            type:'error'
          })
        }
      })
    },
    start_minitoring(data_){
      console.log(data_)
      this.loadong = true
      ElMessage({
        message:"正在启动",
        type:'success'
      })
      var data={
        monitoring_id:data_
      }
      console.log(data)
      start_MonitoringApi(data).then((res)=>{
        console.log(res)
        this.loadong = false
        if(res.code = 200){
          ElMessage({
            message:'已启动',
            type:"success"
          })
          get_MonitoringsApi().then((res)=>{
            console.log(res)
            if(res.code != 200){
              ElMessage({
                message:res.msg,
                type:"error"
              })
            }else{
              this.tableData =  res.data
              ElMessage({
                message:"数据加载完成",
                type:'success'
              })
            }
          })
        }else{
          ElMessage({
            message:red.msg,
            type:'error'
          })
        }
      })
    }
  }
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
