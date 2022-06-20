<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument/></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">Container Logs</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>
             <el-icon style="font-size: 20px"><CopyDocument /></el-icon>
            <span style="font-size: 15px;font-weight: 500;position: relative;left:15px;bottom:3px">Log viewer setting</span>
          </span>
        </div>
      </template>
    </el-card>
    <el-card class="box-card_1">
      <template #header>
        <div class="card-header">
            <span>
             <el-icon style="font-size: 20px"><CopyDocument /></el-icon>
            <span style="font-size: 15px;font-weight: 500;position: relative;left:15px;bottom:3px">Logs</span>
          </span>
        </div>
      </template>
      <el-scrollbar height="220px">
        <el-descriptions>
          <el-descriptions-item>
           {{log_data}}
          </el-descriptions-item>
        </el-descriptions>
      </el-scrollbar>
    </el-card>
  </el-card>

</template>

<script>
import {
  CreditCard,
  Delete,
  Download,
  CopyDocument,
} from '@element-plus/icons-vue'
import {get_LogsApi} from '../../api/Journal.js'
export default {
  name: "journal",
  components:{
    CreditCard,Delete,Download,CopyDocument
  },
  data(){
    return{
      log_data:""
    }
  },
  mounted() {
    get_LogsApi().then((res)=>{
      console.log(res)
      this.log_data = res.data
    })
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
