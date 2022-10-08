<template>
  <el-row class="SecondRow">
    <el-breadcrumb separator="/" style="margin-left: 20px; align-self: center">
      <el-breadcrumb-item v-for="item in list" :key="item.path">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>
<script>
export default {
  name: "SecondMenu",
  setup() {
    let list = [];

    return {
      list,
    };
  },
};
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
