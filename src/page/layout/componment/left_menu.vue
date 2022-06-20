<template>
  <el-menu
      active-text-color="#ff0000"
      background-color="#142437"
      text-color="#07a9e4"
      :router="true"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>概况</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/main" style="width:80%">
          <el-icon><icon-menu /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/Basic">
          <el-icon><icon-menu /></el-icon>
          <span>基本信息</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>Docker</span>
      </template>
      <el-menu-item index="/Containers">
        <el-icon><CreditCard /></el-icon>
        <span>容器</span>
      </el-menu-item>
      <el-menu-item index="/Image">
        <el-icon><CopyDocument /></el-icon>
        <span>镜像</span>
      </el-menu-item>
      <el-menu-item index="/Networks">
        <el-icon><Share /></el-icon>
        <span>网络</span>
      </el-menu-item>
    </el-sub-menu >
    <el-sub-menu index="3">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>监控预警</span>
      </template>
      <el-menu-item index="/Monitoring_NEW" >
        <el-icon><icon-menu /></el-icon>
        <span>新建</span>
      </el-menu-item>
      <el-menu-item index="/Monitoring_See">
        <el-icon><icon-menu /></el-icon>
        <span>查看</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>任务计划</span>
      </template>
      <el-menu-item index="/Plan_New">
        <el-icon><icon-menu /></el-icon>
        <span>新建</span>
      </el-menu-item>
      <el-menu-item index="/Plan_See">
        <el-icon><icon-menu /></el-icon>
        <span>查看</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/Journal">
      <el-icon><icon-menu /></el-icon>
      <span>日志</span>
    </el-menu-item>
    <el-menu-item index="/Safe_Group">
      <el-icon><icon-menu /></el-icon>
      <span>安全组</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  CreditCard,
  CopyDocument,
  Share,
  Connection,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)



</script>

<style scoped>
</style>

