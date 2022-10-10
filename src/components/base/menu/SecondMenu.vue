<template>
  <el-row class="SecondRow">
    <el-breadcrumb separator="/" style="margin-left: 20px; align-self: center">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>
<script setup>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const levelList = reactive([]);

watch(route, () => {
  getBreadcrumb();
});

const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);

  levelList.length = 0;
  const list = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
  levelList.push(...list);
};

getBreadcrumb();
</script>
<style lang="scss" scoped>
.SecondRow {
  height: 50px;
  background: white;
  display: flex;
  border-bottom: 1px rgba(233, 233, 233, 1) solid;
  ::v-deep {
    .el-breadcrumb {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #000000a5;
        }
      }
    }
  }
}
</style>
