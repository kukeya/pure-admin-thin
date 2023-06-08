<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { onMounted, ref } from "vue";
import { getAllOrganize, applyOrganize } from "@/api/organize";
import { message } from "@/utils/message";

defineOptions({
  name: "AllOrganize"
});

onMounted(() => {
  new Promise((resolve, reject) => {
    getAllOrganize()
      .then(res => {
        dataList1.value = res.data;
        // console.log("dataList2", res.data);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
});

const dataList1 = ref([]);
const columns: TableColumnList = [
  {
    label: "ID",
    prop: "id"
  },
  {
    label: "组织",
    prop: "name"
  },
  {
    label: "描述",
    prop: "description"
  },
  {
    label: "操作",
    width: "120",
    fixed: "right",
    slot: "operation"
  }
];

function handleApply(row) {
  new Promise((resolve, reject) => {
    applyOrganize({
      organizeId: row.id,
      comment: "string",
      fileIds: null
    })
      .then(res => {
        if (res.code === "SUCCESS") {
          message("申请成功，等待审核", { type: "success" });
        } else {
          message(res.msg, { type: "error" });
        }
        resolve(res);
      })
      .catch(error => {
        console.log(error);
        message(error.response.data.msg, { type: "error" });
        reject(error);
      });
  });
}
</script>

<template>
  <el-card>
    <pure-table :data="dataList1" :columns="columns">
      <template #operation="{ row }">
        <el-button link type="primary" size="small" @click="handleApply(row)">
          加入
        </el-button>
      </template></pure-table
    >
  </el-card>
</template>
