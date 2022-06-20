<template>
  <dv-loading>Loading...</dv-loading>
  <div id="main">
    <div id="header">
      <el-row :gutter="10">
        <el-col :span="4">
          <dv-border-box-1>
            <div class="header_card">
              <h5>上次开机时间</h5>
              <h2>{{ last_run_time }}</h2>
            </div>
          </dv-border-box-1>
        </el-col>
        <el-col :span="4" >
            <dv-border-box-1  style="height:8rem">
              <div class="header_card">
                <div class="header_card_box2" >
                  <h5>CPU核数</h5>
                  <h3>{{this.cpu_cores}}</h3>
                </div>
                <div class="header_card_box2">
                  <h5>内存总量</h5>
                  <h3>{{this.ram_total}}</h3>
                </div>
              </div>
            </dv-border-box-1>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <dv-border-box-1  style="height:8rem">
              <div class="header_card">
                <h5>CPU使用率</h5>
                <div class="myChartBox">
                  <div id="cpuChart"></div>
                </div>
              </div>
            </dv-border-box-1>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <dv-border-box-1  style="height:8rem">
              <div class="header_card">
                <h5>内存使用率</h5>
                <div class="myChartBox">
                  <div id="MemChart"></div>
                </div>
              </div>
            </dv-border-box-1>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <dv-border-box-1  style="height:8rem">
              <div class="header_card">
                <h5>最大分区使用率</h5>
                <div class="myChartBox">
                  <div id="ParChart"></div>
                </div>
              </div>
            </dv-border-box-1>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <dv-border-box-1  style="height:8rem">
              <div class="header_card">
                <h5>磁盘使用率</h5>
                <div class="myChartBox">
                  <div id="DiskChart"></div>
                </div>
              </div>
            </dv-border-box-1>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <dv-border-box-11 title="CPU使用率（%）" style="height:18rem ">
            <div class="EchartBox">
              <div id="CpuEchart">
              </div>
            </div>
          </dv-border-box-11>
        </el-col>
        <el-col :span="12" >
          <dv-border-box-11 title="磁盘使用率（%）" style="height:18rem">
            <div class="EchartBox">
              <div id="SystemEchart">

              </div>
            </div>
          </dv-border-box-11>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <dv-border-box-11 title="内存信息使用率（%）" style="height:18rem">
            <div class="EchartBox">
              <div id="MemEchart"></div>
            </div>
          </dv-border-box-11>
        </el-col>
        <el-col :span="12" >
          <dv-border-box-11 title="各分区可用空间" style="height:18rem">
            <el-table
                  :data="partitionData"
                  :header-cell-style="{textAlign: 'center',background:'#020024',color:'white'}"
                  :cell-style="{ textAlign: 'center',background:'#020024',color:'white'}"
                  style="width: 90%;position: relative;left:5%;top: 20%;"
              >
                <el-table-column prop="part" label="文件系统" width="130" />
                <el-table-column prop="belong" label="所属分区" width="130" />
                <el-table-column prop="used" label="已用空间" />
                <el-table-column prop="all" label="总空间"  />
              <el-table-column prop="percet" label="使用率" />
              </el-table>
          </dv-border-box-11>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {Cpu_usage_echarts} from "./cpu_usage";
import {Memort_usage} from "./Memory_usage";
import {Disk_usage} from "./disk_usage";
import {Par_usage} from "./partition_usage";
import {Main} from "../../api/Main";
import * as echarts from 'echarts';
import {ElMessage} from "element-plus";
export default {
  data() {
    return {
      partitionData:[
          {
            part:'/dev/vda1',
            belong:'/',
            used:'8.7G',
            all:'59G',
            percet:'16%',
          }
      ],
      cpu_cores:'',
      ram_total:'',
      last_run_time:'',
      cpu_free:'',
      res_free_ram:'',
      disk_usage:'',
      max_par_usage:'',
      cpu_echarts_data:[],
      pro_echarts_data:[],
      sys_echarts_data:[],
      cpu_data:100,
      mem_data:100,
      disk_data:100,
      intervalFlag:'',
    }
  },
  mounted() {
    var that  = this
    this.Cpu_chart()
    Main().then(function (res){
      console.log(res.data)
      that.cpu_cores = res.data.cpu_cores
      that.last_run_time = res.data.last_run_time
      that.ram_total = res.data.ram_total.toFixed(2)
      var cpu_usage = 100 - Number(res.data.cpu_free)
      var memort_usage = 100 - Number(res.data.res_free_ram)
      var disk_usage = res.data.disk_usage[0]
      var disk_usageLength = disk_usage.length
      disk_usage = Number(disk_usage.substring(disk_usageLength-3,disk_usageLength-1))
      var par_usage = Number(res.data.max_par_usage.substring(0,2))
      that.Top_chart(cpu_usage,memort_usage,disk_usage,par_usage);
      ElMessage({
        message:'数据加载成功',
        type:'success',
        center:true,
      })
    })
  },
  methods:{
    Top_chart(cpu_usage,memort_usage,disk_usage,par_usage){
      const cpu_usage_echarts = document.getElementById('cpuChart')
      var cpu_usage = Cpu_usage_echarts(cpu_usage);
      const cpuusage = echarts.init(cpu_usage_echarts)
      cpuusage.setOption(cpu_usage)

      const memoryusage = document.getElementById('MemChart')
      const memorycard = echarts.init(memoryusage)
      memort_usage = Memort_usage(memort_usage)
      memorycard.setOption(memort_usage)

      const par_usage_echarts = document.getElementById('ParChart')
      var par_usage = Par_usage(par_usage);
      const parusage = echarts.init(par_usage_echarts)
      parusage.setOption(par_usage)

      const disk_usage_echarts = document.getElementById('DiskChart')
      var disk_usage = Disk_usage(disk_usage);
      const diskusage = echarts.init(disk_usage_echarts)
      diskusage.setOption(disk_usage)

    },
    Cpu_chart(){
      const cpu_usage_echarts = document.getElementById('CpuEchart')
      const mem_usage_echarts = document.getElementById('MemEchart')
      const sys_usage_echarts = document.getElementById('SystemEchart')
      const cpuusage = echarts.init(cpu_usage_echarts)
      const memusage = echarts.init(mem_usage_echarts)
      const sysusage = echarts.init(sys_usage_echarts)

      var cpu_usage = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis:
          {
            type: 'value',
            splitLine: {
              show: true
            }
          },
        series: [
          {
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.cpu_echarts_data
          },
        ]
      };
      var mem_usage = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis:
            {
              type: 'value',
              splitLine: {
                show: true
              }
            },
        series: [
          {
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.pro_echarts_data
          },
        ]
      };
      var sys_usage = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis:
            {
              type: 'value',
              splitLine: {
                show: true
              }
            },
        series: [
          {
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.sys_echarts_data
          },
        ]
      };
      let value1 = 0
      let value2 = 0
      let value3 = 0
      var that = this
      function randomData() {
        Main().then((res)=>{
          console.log(res)
          that.cpu_data = res.data.cpu_free
          that.mem_data = res.data.res_free_ram

          var disk_usage = res.data.disk_usage[0]
          var disk_usageLength = disk_usage.length
          that.disk_data = Number(disk_usage.substring(disk_usageLength-3,disk_usageLength-1))
        })
        const now = new Date()
        console.log(that.cpu_data)
        value1 = 100 - that.cpu_data
        value2 = 100 - that.mem_data
        value3 = that.disk_data
        const obj = {
          obj1 :{
            name: now.toString(),
            value: [
              now, Math.round(value1)
            ]
          },
          obj2:{
            name: now.toString(),
            value: [
              now, Math.round(value2)
            ]
          },
          obj3:{
            name: now.toString(),
            value: [
              now, Math.round(value3)
            ]
          }
        }
        return obj
      }
      this.intervalFlag = setInterval(function(){
        const obj = randomData()
        console.log(obj)
        if(4 < that.cpu_echarts_data.length) {
          that.cpu_echarts_data.shift()
          that.pro_echarts_data.shift()
          that.sys_echarts_data.shift()
        }
        that.cpu_echarts_data.push(obj.obj1)
        that.pro_echarts_data.push(obj.obj2)
        that.sys_echarts_data.push(obj.obj3)
        cpuusage.setOption({
          series: [{
            data:that.cpu_echarts_data
          }]
        });
        memusage.setOption({
          series: [{
            data:that.pro_echarts_data
          }]
        });
        sysusage.setOption({
          series: [{
            data:that.sys_echarts_data
          }]
        });

      },5000)
      cpuusage.setOption(cpu_usage)
      memusage.setOption(mem_usage)
      sysusage.setOption(sys_usage)
    },
  },
  beforeUnmount(){
    clearInterval(this.intervalFlag);
    this.intervalFlag = null;
  },
}
</script>
<style scoped>
#main{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(2,0,36);
}
#header{
  padding: 20px;
}
.header_card{
  position: relative;
  top: 1rem;
  left: 1rem;
  height: 6rem;
  width: 11rem;
  text-align: center;
}
.header_card h2{
  padding-top: 5px;
  position: relative;
  top:0.5rem ;
  color: #cdddf7;
}
.header_card h3{
  color: #cdddf7;
}
.header_card h5{
  color: #01e4f4;
}
.header_card_box2{
  padding-top:5px;
}
.myChartBox{
  width: 11rem;
  height: 9rem;
}
#cpuChart{
  position: relative;
  top:-1rem;
  width:100%;
  height:100%;
}
#MemChart{
  position: relative;
  top:-1rem;
  width:100%;
  height:100%;
}
#ParChart{
  position: relative;
  top:-1rem;
  width:100%;
  height:100%;
}
#DiskChart{
  position: relative;
  top:-1rem;
  width:100%;
  height:100%;
}

.EchartBox{
  position: relative;
  top: 3.5rem;
  left: 1rem;
  width: 39rem;
  height: 13rem;
}
#MemEchart{
  width: 100%;
  height: 100%;
}
#CpuEchart{
  width: 100%;
  height: 100%;
}
#SystemEchart{
  width: 100%;
  height: 100%;
}

.el-table ,.el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent;
}



</style>
