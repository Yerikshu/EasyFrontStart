<template>
  <el-row
    style="
      height: 100%;
      margin: 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px rgba(233, 233, 233, 1) solid;
    "
  >
    <div style="margin-left: 20px; color: gray; align-self: center">
      <el-icon
        style="font-size: 20px; cursor: pointer; position: relative; top: 2px"
        @click="changeAside"
      >
        <fold v-if="changeIcon"> </fold>
        <expand v-else></expand>
      </el-icon>
    </div>

    <span style="text-align: right; margin-right: 10px">
      <div
        style="
          display: inline-block;
          margin-right: 20px;
          text-align: left;
          position: relative;
          top: 10px;
        "
      >
        <el-button>管理</el-button>
      </div>
    </span>
  </el-row>
</template>
<script setup>
import { ref } from "vue";
import emitter from "../../../utils/mitt";

const changeAside = () => {
  changeIcon.value = !changeIcon.value;
  emitter.emit("collapse");
};
const changeIcon = ref(true);
</script>
