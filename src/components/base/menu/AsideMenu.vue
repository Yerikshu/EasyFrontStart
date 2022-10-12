<template>
  <el-menu
    background-color="#001529"
    router
    text-color="#fffffa5"
    class="aside-menu-vertical"
    :default-active="$route.path"
    active-text-color="white"
    :collapse="isCollapse"
  >
    <h3
      v-if="!isCollapse"
      style="
        font-size: 20px;
        color: white;
        font-weight: 650;
        text-align: center;
        margin: 20px 0 30px 0;
      "
    >
      MercuryStart
    </h3>
    <h3
      v-else
      style="
        font-size: 20px;
        color: white;
        font-weight: 650;
        text-align: center;
        margin: 20px 0 30px 0;
      "
    >
      M
    </h3>
    <div v-for="(item, idx) of routerList" :key="'menu' + idx">
      <el-sub-menu :index="item.path" v-if="item.title === 'menu'">
        <template #title>
          <svg
            t="1665414510738"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3107"
            width="16"
            height="16"
          >
            <path
              d="M944.38 70.19h-864c-44.19 0-80 35.81-80 80v571.43c0 44.19 35.81 80 80 80h864c44.18 0 80-35.81 80-80V150.19c0-44.19-35.82-80-80-80z m5.45 603.45c0 26.26-21.29 47.55-47.55 47.55H750.12V445.41c0-26.26-21.28-47.55-47.55-47.55-26.26 0-47.55 21.29-47.55 47.55v275.78h-95.1V350.31c0-26.26-21.28-47.55-47.55-47.55-26.26 0-47.55 21.29-47.55 47.55v370.88h-95.1v-199.7c0-26.26-21.28-47.55-47.55-47.55-26.26 0-47.55 21.28-47.55 47.55v199.7H122.49c-26.26 0-47.55-21.29-47.55-47.55V198.16c0-26.26 21.29-47.55 47.55-47.55h779.79c26.26 0 47.55 21.29 47.55 47.55v475.48zM722.67 874.76H302.09c-25.25 0-45.71 20.47-45.71 45.71 0 25.25 20.47 45.71 45.71 45.71h420.58c25.24 0 45.71-20.46 45.71-45.71 0-25.24-20.47-45.71-45.71-45.71z m0 0"
              fill="#ffffff"
              p-id="3108"
            ></path>
          </svg>
          <span v-if="!isCollapse" style="margin-left: 5px; color: white"
            >首页</span
          >
        </template>
        <el-menu-item
          v-for="(cItem, cIdx) of item.children"
          :key="'subMenu' + cIdx"
          :index="cItem.path"
        >
          <span style="color: white">{{ cItem.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup>
import { ref, reactive } from "vue";
import emitter from "@/utils/mitt";

const isCollapse = ref(false);

emitter.on("collapse", () => {
  isCollapse.value = !isCollapse.value;
});

const routerList = reactive([
  {
    title: "menu",
    path: "/home",
    children: [
      {
        title: "控制台",
        path: "/home/console",
      },
    ],
  },
]);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>
.aside-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>
