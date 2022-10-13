<template>
  <MCTable v-model:config="config" />
</template>
<script setup>
import { ref } from "vue";
import MCTable from "/src/components/base/common/MCTable.vue";

let config = ref({
  remote: false,
  tableData: [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ],
  columns: [
    {
      label: "日期",
      key: "date",
    },
    {
      label: "名字",
      key: "name",
    },
    {
      label: "地址",
      key: "address",
    },
  ],
  showOperateButton: false,
});
</script>
