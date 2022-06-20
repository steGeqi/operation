<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><CopyDocument /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">基本信息</span>
      </span>
    </el-card>
    <el-scrollbar height="600px">
      <el-card class="box-card" v-for="card in Net_Work">
        <template #header>
          <div class="card-header">
            <span>
             <el-icon style="font-size: 20px"><CopyDocument /></el-icon>
            <span style="font-size: 15px;font-weight: 700;position: relative;left:15px;bottom:3px">网络信息</span>
          </span>
          </div>
        </template>
        <el-row :gutter="20" >
          <el-col :span="8" v-for="item in card">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content">{{String(item[0])}}</div></el-col>
              <el-col :span="12"><div class="msg" >{{String(item[1])}}</div></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" v-for="card in Cpu_info">
        <template #header>
          <div class="card-header">
            <span>
             <el-icon style="font-size: 20px"><CopyDocument /></el-icon>
            <span style="font-size: 15px;font-weight: 700;position: relative;left:15px;bottom:3px">CPU信息</span>
          </span>
          </div>
        </template>
        <el-row :gutter="20" >
          <el-col :span="8" v-for="item in card">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content">{{String(item[0])}}</div></el-col>
              <el-col :span="12"><div class="msg" >{{String(item[1])}}</div></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-scrollbar>
  </el-card>

</template>
<script>
import {Baszic_getAPI,Basic_getCpuAPI} from '../../api/Main'
import {
  CreditCard,
  Delete,
  Download,
  CopyDocument,
} from '@element-plus/icons-vue'
import cpuechart from "./cpu_echart";
export default {
  components:{
    CreditCard,
    Delete,
    Download,
    CopyDocument,
  },
  data(){
    return{
      Net_Work:[],
      Cpu_info:[],
    }
  },
  mounted() {
    Baszic_getAPI().then((res)=>{
      console.log(res.data)
      var items = res.data
      for (var i = 0; i < items.length; i++ ){
        var item = res.data[i]
        var item_data = []
        item_data.push(Object.keys(item))
        item_data.push(Object.values(item))
        var group = []
        for(var j = 0;j < item_data[0].length;j++){
          var group_item = []
          group_item.push([item_data[0][j]])
          group_item.push([item_data[1][j]])
          group.push(group_item)
        }
        this.Net_Work.push(group)
      }
    })
    Basic_getCpuAPI().then((res)=>{
      console.log("cpu 信息")
      console.log(res.data)
      var items = res.data
      for (var i = 0; i < items.length; i++ ){
        var item = res.data[i]
        var item_data = []
        item_data.push(Object.keys(item))
        item_data.push(Object.values(item))
        console.log(item_data)
        var group = []
        for(var j = 0;j < item_data[0].length;j++){
          var group_item = []
          group_item.push([item_data[0][j]])
          group_item.push([item_data[1][j]])
          group.push(group_item)
        }
        this.Cpu_info.push(group)
      }
    })
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
.box-card{
  margin-bottom:2rem ;
}

.el-col {
  margin-top: 10px;
}

.grid-content {
  text-align: center;
  border-radius: 4px;
  min-height: 10px;
  color: darkgray;
  position: relative;
  left:10px;
}
.msg{
  min-height: 15px;
  color: #142437;
  font-weight: 500;
}
</style>
