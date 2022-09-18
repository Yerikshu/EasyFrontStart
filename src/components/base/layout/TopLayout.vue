<template>
  <el-container>
    <el-header style="background-color: #fff; padding: 0px"> </el-header>
    <el-main>
      <div style="border-radius: 10px; background-color: #fff; padding: 5px">
        <router-view v-if="reloadFlag" />
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { ref } from "vue";
export default {
  name: "TopLayout",
  components: {},
  setup() {
    const reloadFlag = ref(true);
    return reloadFlag;
  },
};
</script>
