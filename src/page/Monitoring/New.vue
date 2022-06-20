<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><Share /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">监控预警-新建</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button-group>
            <el-button type="primary" @click="New_Build">新建</el-button>
<!--            <el-button @click="Candel">取消</el-button>-->
          </el-button-group>
        </div>
      </template>
      <el-row class="mb-4">
        <el-form :model="form" label-width="120px" style="width: 100%">
          <el-form-item label="监控类型">
            <el-select v-model="form.mon_type" placeholder="选择监控类型" @change="controlTypeChange" >
              <el-option label="cpu使用率 " value="cpu" />
              <el-option label="内存使用率" value="per" />
              <el-option label="磁盘使用率" value="disk" />
              <el-option label="端口服务" value="port" />
              <el-option label="容器服务" value="contioner" />
            </el-select>
          </el-form-item>
          <el-form-item :label= label_name  style="width: 30%" v-show="type_datacheck" >
            <el-input v-model="form.type_data"  clearable></el-input>
          </el-form-item>
          <el-form-item label="监控名称" style="width: 30%">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="频率" style="width: 30%">
            <el-input v-model="form.frequency" clearable></el-input>
          </el-form-item>
          <el-form-item label="概述" style="width: 40%">
            <el-input v-model="form.desc" type="textarea" clearable :rows="4"/>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
  </el-card>

</template>

<script lang="ts" setup>
import {
  Share,
} from '@element-plus/icons-vue'
import { reactive, ref} from 'vue'
import {add_monitoringApi} from '../../api/Monitoring'
import {ElMessage} from "element-plus";

const form = reactive({
  mon_type:'',
  type_data:'',
  name:'',
  frequency:'',
  desc:'',
})
const type_datacheck = ref( false)
const label_name = ref('')
function controlTypeChange(e) {
  type_datacheck.value = true
  if(e == 'cpu' || e == 'per' || e == 'disk'){
    label_name.value = '阈值'
    form.mon_type = e
  }else if(e == "port"){
    label_name.value = '端口号'
    form.mon_type = e
  }else if(e == 'contioner'){
    label_name.value = '容器ID'
    form.mon_type = e
  }
}
function New_Build() {
  var data = form
  console.log(data)
  add_monitoringApi(data).then((res)=>{
    console.log(res)
    if(res.code == 200){
      ElMessage({
        message:'新建成功',
        type:"success"
      })
      form.mon_type = ''
      form.type_data = ''
      form.name = ''
      form.frequency = ''
      form.desc = ''
    }else{
      ElMessage({
        message:res.msg,
        type:"error"
      })
    }
  })
}

function Candel(){
  ElMessage({
    message:'已取消',
    type:"error"
  })
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
