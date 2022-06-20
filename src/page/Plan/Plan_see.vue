<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">任务计划-查看</span>
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
          <el-table-column  prop="plan_id" label="序号" />
          <el-table-column  prop="plan_number" label="任务编号"  />
          <el-table-column prop="plan_title" label="任务题目"  />
          <el-table-column prop="plan_people" label="指派人"  />
          <el-table-column prop="plan_people_email" label="指派人邮箱"  />
          <el-table-column  prop="plan_release_time" label="发布时间" />
          <el-table-column  prop="plan_complete_time" label="完成时间" />
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button type="text" size="small" @click="handlEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handlDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-scrollbar>
    </el-card>
  </el-card>
  <el-dialog v-model="dialogFormVisible" title="编辑">
    <el-form :model="editData" label-width="120px" style="width: 100%">
      <el-form-item label="序号:" >
        <el-input v-model="editData.plan_id" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="任务编号" >
        <el-input v-model="editData.plan_number" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="任务题目:" >
        <el-input v-model="editData.plan_title" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item label="指派人:" >
        <el-input v-model="editData.plan_people" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item label="指派人邮箱:" >
        <el-input v-model="editData.plan_people_email" autocomplete="off" style="width: 40%"/>
      </el-form-item>

      <el-form-item label="发布时间:" >
        <el-input v-model="editData.plan_release_time" autocomplete="off" style="width: 40%"/>
      </el-form-item>
      <el-form-item label="完成时间:" >
        <el-input v-model="editData.plan_complete_time" autocomplete="off" style="width: 40%"/>
      </el-form-item>
<!--      <el-form-item label="任务信息:" >-->
<!--        <el-input v-model="editData.plan_msg" autocomplete="off" style="width: 40%"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="plan_new_info:" >-->
<!--        <el-input v-model="editData.plan_new_info" autocomplete="off" style="width: 40%"/>-->
<!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="EditUpdate"
        >修改</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="dialogVisible"
      title="删除提醒"
      width="30%"
  >
    <span>确认删除此条信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Del_Plan"
        >确定</el-button
        >
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
import {Get_PlansApi,Get_PlanApi,Del_PlanApi,Up_PlanApi} from "../../api/Plan";
import {ElMessage} from "element-plus";

export default {
  components:{
    CopyDocument,Refresh,Plus
  },
  data(){
    return{
      loadong:false,
      tableData:[],
      editData:{},
      formInline:{
        name: '',
        state: '',
      },
      dialogFormVisible:false,
      dialogVisible:false,
      del_planid:''
    }

  },
  mounted() {
    this.loadong = true
    var that = this
    Get_PlansApi().then((res)=>{
      console.log(res)
      if(res.code != 200){
        ElMessage({
          message:res.msg,
          type:"error"
        })
      }else{
        that.tableData =  res.data
        this.loadong = false
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
      var data  = this.editData
      console.log(data)
      Up_PlanApi(data).then((res)=>{
        if (res.code == 200){
          this.dialogFormVisible = false
          Get_PlansApi().then((res)=>{
            console.log(res)
            if(res.code != 200){
              ElMessage({
                message:res.msg,
                type:"error"
              })
            }else{
              var that = this
              that.tableData =  res.data
              ElMessage({
                message:"数据加载完成",
                type:'success'
              })
            }
          })
          ElMessage({
            message:'修改成功',
            type:"success"
          })
        }else {
          ElMessage({
            message: res.msg,
            type:"error"
          })
        }
      })
    },
    handlDel(data){
      this.dialogVisible = true
      this.del_planid = data.plan_id
    },
    Del_Plan(){
      this.dialogVisible = false
      var data = {
        "plan_id":this.del_planid
      }

      console.log(data)
      Del_PlanApi(data).then((res)=>{
        if(res.code == 200){
          Get_PlansApi().then((res)=>{
            console.log(res)
            if(res.code != 200){
              ElMessage({
                message:res.msg,
                type:"error"
              })
            }else{
              this.tableData =  res.data
            }
          })
          ElMessage({
            message:'删除成功',
            type:"success"
          })
        }else {
          ElMessage({
            message:res.msg,
            type:"error"
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
