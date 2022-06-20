<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><Share /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">任务计划-新建</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button-group>
            <el-button type="primary" @click="Add_Plan">新建</el-button>
            <el-button @click="Cancel_Plan">取消</el-button>
          </el-button-group>
        </div>
      </template>
      <el-row class="mb-4">
        <el-form :model="form" label-width="120px">
          <el-form-item label="任务名称" >
            <el-input v-model="form.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="指派人姓名" style="width: 80%">
            <el-input v-model="form.assigned_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="指派人邮箱" >
            <el-input v-model="form.assigned_email" clearable></el-input>
          </el-form-item>
          <el-form-item label="概述"   style="width: 120%">
            <el-input v-model="form.content" type="textarea"
                      :rows="4"/>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </el-card>

</template>

<script>
import {
  Share,
} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {Add_PlanApi} from '../../api/Plan'
export default {
  components:{
    Share
  },
  data(){
    return{
      form:[],
    }
  },
  methods:{
    Cancel_Plan(){
      this.form.title='';
      this.form.assigned_name="";
      this.form.assigned_email="";
      this.form.content="";
      ElMessage({
        message:'已取消',
        type:'error',
      })
    },
    Add_Plan(){
      var data = {
          "plan_title":this.form.title,
          "plan_people":this.form.assigned_name,
          "plan_people_email":this.form.assigned_email,
          "plan_msg":this.form.content
    }
      console.log(data)
      Add_PlanApi(data).then((res)=>{
        if(res.code == 200){
          ElMessage({
            message:'新建成功',
            type:"success"
          })
          this.form.title='';
          this.form.assigned_name="";
          this.form.assigned_email="";
          this.form.content="";
        }else{
          ElMessage({
            message:res.msg,
            type:"error"
          })
        }
      }).catch((error)=>{
        ElMessage({
          message:error,
          type:error
        })
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
</style>
