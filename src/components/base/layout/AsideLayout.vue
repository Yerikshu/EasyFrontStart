<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <TopMenu />
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import TopMenu from '../menu/TopMenu.vue';
export default {
  name: "AsideLayout",
  components: { TopMenu },
  setup() {},
};
</script>
