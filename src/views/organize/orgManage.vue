<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { onMounted, ref, reactive } from "vue";
import {
  getMyOrganize,
  getMember,
  getApplyMsg,
  acceptUserApply,
  acceptOrganizeCreate
} from "@/api/organize";
import { message } from "@/utils/message";

defineOptions({
  name: "OrgManage"
});

onMounted(() => {
  new Promise((resolve, reject) => {
    getMyOrganize()
      .then(res => {
        dataList.value = res.data.map(el => {
          if (el.role === "ADMIN") {
            return el.organize;
          }
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });

  // new Promise(() => {
    
  // })
});

const dataList = ref([]);
const applyCreateMsgs = ref([]);
const applyMsgs = ref([]);
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

const applyColumns: TableColumnList = [
  {
    label: "申请ID",
    prop: "id"
  },
  {
    label: "用户ID",
    prop: "userId"
  },
  {
    label: "描述",
    prop: "comment"
  },
  {
    label: "操作",
    width: "120",
    fixed: "right",
    slot: "operation"
  }
];

const dialogApplyVisible = ref(false);
const dialogMemberVisible = ref(false);
const formLabelWidth = "140px";
const newOrg = reactive({
  name: "",
  description: "",
  fileIds: null
});

function handleMsg(row) {
  dialogApplyVisible.value = true;
  new Promise((resolve, reject) => {
    getApplyMsg(row.id)
      .then(res => {
        if (res.code === "SUCCESS") {
          applyMsgs.value = res.data;
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

// function handleMsg(row) {
//   dialogApplyVisible.value = true;
//   new Promise((resolve, reject) => {
//     getApplyMsg(row.id)
//       .then(res => {
//         if (res.code === "SUCCESS") {
//           applyMsgs.value = res.data;
//         } else {
//           message(res.msg, { type: "error" });
//         }
//         resolve(res);
//       })
//       .catch(error => {
//         console.log(error);
//         message(error.response.data.msg, { type: "error" });
//         reject(error);
//       });
//   });
// }

function handleAcc(row) {
  new Promise(() => {
    acceptUserApply({ applyId: row.id })
      .then(res => {
        message(res.code, { type: "success" });
      })
      .catch(error => {
        message(error.response.data.msg, { type: "error" });
      });
  });
}

const handleAccCreate = row => {
  new Promise(() => {
    acceptOrganizeCreate({ id: row.id })
      .then(res => {
        message(res.code, { type: "success" });
      })
      .catch(error => {
        message(error.response.data.msg, { type: "error" });
      });
  });
};
</script>

<template>
  <div>
    <!-- 申请加入管理 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>申请加入管理</h1>
        </div>
      </template>
      <pure-table :data="dataList" :columns="columns">
        <template #operation="{ row }">
          <el-button link type="primary" size="small" @click="handleMsg(row)">
            查看组织消息
          </el-button>
        </template>
      </pure-table>
    </el-card>

    <!-- 申请创建管理 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>申请创建管理</h1>
        </div>
      </template>
      <pure-table :data="dataList" :columns="columns">
        <template #operation="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleAccCreate(row)"
          >
            同意
          </el-button>
        </template>
      </pure-table>
    </el-card>

    <!-- 同意加入弹窗 -->
    <el-dialog v-model="dialogApplyVisible" title="申请信息">
      <pure-table :data="applyMsgs" :columns="applyColumns">
        <template #operation="{ row }">
          <el-button link type="primary" size="small" @click="handleAcc(row)">
            同意
          </el-button>
          <!-- <el-button link type="primary" size="small" @click="handleRej(row)">
            查看组织消息
          </el-button> -->
        </template>
      </pure-table>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-tabs__header) {
  margin-top: 10px;
}
.el-card {
  margin-bottom: 30px;
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
