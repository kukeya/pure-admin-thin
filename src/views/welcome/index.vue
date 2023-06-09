<script setup lang="ts">
import { PureTable } from "@pureadmin/table";
import { onMounted, ref, reactive } from "vue";
import { getDynamic, pubDynamic } from "@/api/dynamic";
import { message } from "@/utils/message";
import { getMyOrganize } from "@/api/organize";
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

  new Promise(() => {
    getMyOrganize()
      .then(res => {
        console.log(res);
        if (res.code === "SUCCESS") {
          myOrg.value = res.data.map(el => {
            return el.organize;
          });
        }
      })
      .catch(error => {
        message(error.response.data.msg, { type: "error" });
      });
  });
});

const dataList = ref([]);
const myOrg = ref([]);
// const options = ref([]);
const postVisible = ref(false);
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
const dynamic = reactive({
  organizeId: null,
  scope: "GLOBAL",
  title: "",
  content: ""
});

const onSubmit = () => {
  if (dynamic.scope === "PRIVATE") {
    dynamic.organizeId = null;
  }
  new Promise(() => {
    pubDynamic(dynamic)
      .then(res => {
        if (res.code === "SUCCESS") {
          message("发布成功", { type: "success" });
        }
      })
      .catch(error => {
        message(error.response.data.msg, { type: "error" });
      });
  });
};
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <el-button type="primary" @click="postVisible = true"
            >发布动态</el-button
          >
        </div>
      </template>
      <pure-table :data="dataList" :columns="columns" />
    </el-card>

    <el-dialog v-model="postVisible" title="发布动态">
      <el-form :model="dynamic" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="dynamic.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="输入动态内容"
            v-model="dynamic.content"
          />
        </el-form-item>

        <el-form-item label="可见范围">
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="dynamic.scope" class="ml-4">
              <el-radio label="GLOBAL" size="large">所有人可见</el-radio>
              <el-radio label="ORGANIZE" size="large">组织内可见</el-radio>
              <el-radio label="PRIVATE" size="large">仅自己可见</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <el-form-item
          v-if="dynamic.scope === 'ORGANIZE' || dynamic.scope === 'GLOBAL'"
        >
          <el-select v-model="dynamic.organizeId" placeholder="Select">
            <el-option
              v-for="item in myOrg"
              :key="item.name"
              :id="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
:deep(.el-tabs__header) {
  margin-top: 10px;
}
</style>
