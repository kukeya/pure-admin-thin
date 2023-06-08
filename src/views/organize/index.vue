<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { onMounted, ref, reactive } from "vue";
import { getMyOrganize, createOrganize, getMember } from "@/api/organize";
import { message } from "@/utils/message";

defineOptions({
  name: "Organize"
});

onMounted(() => {
  new Promise((resolve, reject) => {
    getMyOrganize()
      .then(res => {
        dataList.value = res.data.map(el => {
          return el.organize;
        });
        console.log("dataList", dataList);
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

const addOrganize = () => {
  dialogFormVisible.value = false;
  new Promise((resolve, reject) => {
    createOrganize(newOrg)
      .then(res => {
        if (res.code === "SUCCESS") {
          message("申请成功，等待审核", { type: "success" });
        } else {
          message("申请失败", { type: "error" });
        }
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const newOrg = reactive({
  name: "",
  description: "",
  fileIds: null
});

function handleMember(row) {
  new Promise((resolve, reject) => {
    getMember(row.id)
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
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" text @click="dialogFormVisible = true">
            新增组织
          </el-button>
        </div>
      </template>
      <pure-table :data="dataList" :columns="columns">
        <template #operation="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleMember(row)"
          >
            查看成员
          </el-button>
        </template>
      </pure-table>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="申请新增组织">
      <el-form :model="newOrg">
        <el-form-item label="组织名" :label-width="formLabelWidth">
          <el-input v-model="newOrg.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组织描述" :label-width="formLabelWidth">
          <el-input v-model="newOrg.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addOrganize"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-tabs__header) {
  margin-top: 10px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
