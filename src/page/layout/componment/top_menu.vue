<template>
  <div class="top_mean">
    <div style="position:relative;bottom: 0">
      <el-row>
        <el-col :span="6" :offset="0"><DvDecoration8 :color="datavcolor" />
        </el-col>
        <el-col :span="6" :offset="3">
          <el-row>
            <el-col :span="12" :offset="9">
              <h2 style="position: relative;bottom: 0;color: #cdddf7">运维系统</h2>
            </el-col>
          </el-row>
          <DvDecoration5 style="height: 30px" :color="datavcolor" />
        </el-col>
        <el-col :span="6" :offset="3">
          <DvDecoration8  :reverse="true"  :color="datavcolor" />
        </el-col>
      </el-row>
    </div>
    <DvDecoration-10
        style="width:100%;height:10px;"  :color="datavcolor10"/>
  </div>
</template>

<script>
export default {
  name: "top_menu",
  data: function (){
    return{
      datavcolor:['#0e94eb','#0e94eb'],
      datavcolor10:['#0e94eb','#142437']
    }

  }
}
</script>

<style scoped>
.top_mean{
  height: 4.5rem;
  background-color: #142437;
}

</style>
