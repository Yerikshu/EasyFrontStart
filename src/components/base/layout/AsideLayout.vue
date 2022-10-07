<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <TopMenu />
        </el-header>
        <el-main style="background-color: #f0f2f5">
          <div style="padding: 5px">
            <router-view> </router-view>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import TopMenu from "/src/components/base/menu/TopMenu.vue";
import AsideMenu from "/src/components/base/menu/AsideMenu.vue";
</script>
