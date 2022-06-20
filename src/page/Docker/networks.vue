<template>
  <el-card shadow="always" class="card">
    <el-card style="background-color: #f3f3f3;">
      <span>
        <el-icon size="large" style="font-size: 30px"><Share /></el-icon>
        <span style="font-size: 20px;font-weight: 900;position: relative;left:15px;bottom:8px">Networks List</span>
      </span>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
            <span>
             <el-icon style="font-size: 20px"><Share /></el-icon>
            <span style="font-size: 15px;font-weight: 500;position: relative;left:15px;bottom:3px">Networks</span>
          </span>
        </div>
      </template>
      <el-table ref="tableRef" row-key="date" v-loading=loading :data="networks_form" style="width: 100%">
        <el-table-column prop="Name" label="Name" width="80" />
        <el-table-column
            width="100"
            prop="Name_tag"
        >
          <template #default="scope">
            <el-tag
                :type='primary'
                disable-transitions
            >{{ scope.row.Name_tag }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="Driver" label="Driver"  width="110" />
        <el-table-column prop="Attachable" label="Attachable" width="110" />
        <el-table-column prop="IPAM_Driver" label="IPAM_Driver"  />
        <el-table-column prop="IPV4_IPAM_Subnet" label="IPV4_IPAM_Subnet"  />
        <el-table-column prop="IPV4_IPAM_Gateway" label="IPV4_IPAM_Gateway"  />
        <el-table-column prop="Ownership" label="Ownership"  />
      </el-table>
    </el-card>
  </el-card>

</template>

<script>
import {NetWork_getallAPI} from '../../api/Docker.js'
import {
  Delete,
  Share,
} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
export default {
  components:{
    Delete,Share
  },
  data(){
    return{
      loading:true,
      networks_form:[
        {
          Name:'bridge',
          Name_tag:'System',
          Driver:'bridge',
          Attachable:'false',
          IPAM_Driver:'default',
          IPV4_IPAM_Subnet:'172.17.0.0/16',
          IPV4_IPAM_Gateway:"172.17.0.1",
          Ownership:' public'
        },
        {
          Name:'host',
          Name_tag:'System',
          Driver:'host',
          Attachable:'false',
          IPAM_Driver:'default',
          IPV4_IPAM_Subnet:'',
          IPV4_IPAM_Gateway:"",
          Ownership:' public'
        },
        {
          Name:'none',
          Name_tag:'System',
          Driver:'null',
          Attachable:'false',
          IPAM_Driver:'default',
          IPV4_IPAM_Subnet:'',
          IPV4_IPAM_Gateway:"",
          Ownership:' public'
        }
      ],
      delete_id:'',
    }
  },
  mounted() {
    var that = this
    that.loading=false
    // NetWork_getallAPI().then((res)=>{
    //   if (res.code != 200){
    //     ElMessage({
    //       message:res.msg,
    //       type:"error"
    //     })
    //   }else{
    //     console.log(res)
    //     that.networks_form = res.data
    //     that.loading = false
    //   }
    // }).catch((error)=>{
    //   ElMessage({
    //     message:error,
    //     type:"error"
    //   })
    // })
  },
  methods:{

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
