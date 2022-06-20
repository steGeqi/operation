<template>
  <el-container
      class="layout-container-demo">
    <el-header>
      <top_menu />
    </el-header>
    <el-container class="container" >
      <dv-border-box-9 style="padding: 0 2rem 0 2rem">
      <el-side style="background-color: #142437;">
          <left_menu />
      </el-side>
      </dv-border-box-9>
      <el-main>
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import left_menu from './componment/left_menu.vue'
import top_menu from './componment/top_menu.vue'
import { ref } from 'vue'
import { Message, Menu as IconMenu, Setting, } from '@element-plus/icons-vue'

</script>

<style scoped>
.el-header{
  padding: 0;
}
.container{
  position:absolute;
  top:4.5rem;
  bottom:0;
  right:0;
  left:0
}
.dv-border-box-9{
  width: 200px;background-color: #142437
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.layout-container-demo .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

</style>

