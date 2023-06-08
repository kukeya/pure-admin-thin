<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { onMounted, ref } from "vue";
import { getDynamic } from "@/api/dynamic";
defineOptions({
  name: "Welcome"
});
onMounted(() => {
  new Promise((resolve, reject) => {
    getDynamic()
      .then(res => {
        dataList.value = res.data;
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
});

const dataList = ref([]);
const columns: TableColumnList = [
  {
    label: "标题",
    prop: "title"
  },
  {
    label: "内容",
    prop: "content"
  },
  {
    label: "发布者ID",
    prop: "userId"
  }
];
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 动态 </span>
      </div>
    </template>
    <pure-table :data="dataList" :columns="columns" />
  </el-card>
</template>

<style scoped>
:deep(.el-tabs__header) {
  margin-top: 10px;
}
</style>
