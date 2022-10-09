<template>
  <el-menu
    background-color="#001529"
    router
    text-color="#fffffa5"
    :default-active="$route.path"
    active-text-color="white"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <h3 v-if="!isCollapse">
      <span
        style="
          font-size: 20px;
          color: white;
          font-weight: 650;
          margin-left: 30px;
        "
        >EASYFRAME</span
      >
    </h3>
    <h3 v-else>
      <span
        style="
          font-size: 20px;
          color: white;
          font-weight: 650;
          margin-left: 30px;
        "
        >E</span
      >
    </h3>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";

const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
} */
</style>
