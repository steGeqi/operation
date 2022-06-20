<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">安全组</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button-group>
            <el-button type="primary" @click="this.dialogFormVisible = true">添加规则</el-button>
            <el-button type="primary" plain>排序</el-button>
          </el-button-group>
        </div>
      </template>
      <el-scrollbar height="500px">
        <el-table :data="tableData"
                  v-loading="loadong"
                  element-loading-text="数据加载中"
                  element-loading-svg-view-box="-10, -10, 50, 50"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  style="width: 100%"
        >
          <el-table-column prop="pro" label="协议" width="400"/>
          <el-table-column prop="port" label="端口" width="400"/>
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </el-card>
  </el-card>

  <el-dialog v-model="dialogFormVisible" title="添加规则">
    <el-form :model="dialogform" label-width="120px" style="width: 100%">
      <el-form-item label="协议:" >
        <el-input v-model="dialogform.protocol" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item label="端口号:" >
        <el-input v-model="dialogform.port" autocomplete="off" style="width: 40%"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="add_group"
        >添加</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="editdialog" title="编辑" >
    <el-form :model="dialogform" label-width="120px" style="width: 100%">
      <el-form-item label="协议:" >
        <el-input v-model="editform.protocol" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item label="端口号:" >
        <el-input v-model="editform.port" autocomplete="off" style="width: 40%"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editdialog = false">取消</el-button>
        <el-button type="primary" @click="edit_group()"
        >修改</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="centerDialogVisible" title="删除提醒" width="30%" center>
    <span
    >你确定要删除这条数据吗？</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="delete_group"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  CopyDocument,
} from '@element-plus/icons-vue'
import {get_AllApi,add_GroupzApi,edit_GroupApi,delete_GroupApi} from "../../api/Safe_Group";
import {ElMessage} from "element-plus";

export default {
  components:{
    CopyDocument,
  },
  data(){
    return{
      tableData:[],
      loadong:true,
      dialogFormVisible:false,
      centerDialogVisible:false,
      dialogform:{
        port:'',
        protocol:'',
      },
      editdialog:false,
      editform:{
        port:'',
        protocol:'',
      },
      edit_before:{
        port:'',
        protocol:''
      },
      delete_id:'',
      delete_pro:''
    }
  },
  mounted() {
    var that = this
    get_AllApi().then((res)=>{
      that.tableData = res.data
      that.loadong = false
    })
  },
  methods:{
    handleEdit(data){
      this.editdialog = true
      this.editform.port = data.port
      this.editform.protocol = data.pro
      this.edit_before.port = data.port
      this.edit_before.protocol = data.pro
    },
    edit_group(){
      var data = {
        before_port:this.edit_before.port,
        before_protocol:this.edit_before.protocol,
        port: this.editform.port,
        protocol:this.editform.protocol
      }
      // console.log(data)
      this.loadong = true
      this.editdialog = false
      edit_GroupApi(data).then((res)=>{
        console.log(res)
        ElMessage({
          message:'修改成功',
          type:'success'
        })
        var that = this
        get_AllApi().then((res)=>{
          that.tableData = res.data
          that.loadong = false
        })
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:error
        })
      })
    },
    add_group(){
      var port = this.dialogform.port
      var protocol = this.dialogform.protocol
      if(port || protocol ) {
        var data = {
          port : this.dialogform.port,
          protocol:this.dialogform.protocol
        }
        console.log(data)
        this.loadong = true
        this.dialogFormVisible = false
        add_GroupzApi(data).then((res)=>{
          console.log(res)
          var that = this
          get_AllApi().then((res)=>{
            console.log(res)
            that.tableData = res.data
            that.loadong = false
          })
          this.dialogform.protocol=''
          this.dialogform.port=''
        }).catch((error)=>{
          ElMessage({
            message:error,
            type:'error'
          })
        })
      }else{
        ElMessage({
          message:'请将信息补充完整',
          type:"error"
        })
        this.dialogFormVisible = false
      }
    },
    handleDelete(data){
      console.log(data)
      this.delete_id = data.port
      this.delete_pro = data.pro
      this.centerDialogVisible = true
    },
    delete_group(){
      var data = {
        port:this.delete_id,
        protocol:this.delete_pro
      }
      console.log(data)
      this.loadong = true
      this.centerDialogVisible = false
      delete_GroupApi(data).then((res)=>{
        console.log(res)
        var that = this
        ElMessage({
          message:'删除成功',
          type:'success'
        })
        get_AllApi().then((res)=>{
          console.log(res)
          that.tableData = res.data
          that.loadong = false
        })
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:"error"
        })
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
