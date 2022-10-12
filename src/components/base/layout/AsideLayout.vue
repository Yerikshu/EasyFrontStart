<template>
  <el-container style="height: 100%">
    <AsideMenu style="max-width: 250px" />
    <el-container style="width: calc(100% - 100px)">
      <el-header style="background-color: white; padding: 0px" height="64px">
        <TopMenu />
      </el-header>
      <el-header style="background-color: white; padding: 0px" height="50px">
        <SecondMenu />
      </el-header>
      <el-main style="background-color: #f0f2f5">
        <div style="background-color: white; height: 100%; overflow: auto">
          <!-- <router-view v-if="reloadFlag"> </router-view> -->
          <router-view > </router-view>
        </div>
      </el-main>
      <el-footer style="padding: 0px; height: 60px; background-color: #f0f2f5">
        <Footer />
        </el-footer>
    </el-container>
  </el-container>
</template>
<script setup>
import TopMenu from "/src/components/base/menu/TopMenu.vue";
import AsideMenu from "/src/components/base/menu/AsideMenu.vue";
import SecondMenu from "/src/components/base/menu/SecondMenu.vue";
import Footer from "./Footer.vue";

// const reloadFlag = ;
</script>
