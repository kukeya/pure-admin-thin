<script lang="ts" setup>
import { getUserInfo, updateUserInfo } from "@/api/user";
import { message } from "@/utils/message";
import { reactive } from "vue";
import { onMounted } from "vue";
import { router } from "@/router";

onMounted(() => {
  new Promise((resolve, reject) => {
    getUserInfo()
      .then(res => {
        Object.assign(form, res.data);
        console.log("form", form);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
});

defineOptions({
  name: "Update"
});
// do not use same name with ref
const form = reactive({
  nickname: "",
  realName: "",
  role: "",
  email: "",
  sex: "",
  phone: "",
  busLife: "",
  identityNum: ""
});

const onSubmit = () => {
  new Promise((resolve, reject) => {
    updateUserInfo(form)
      .then(res => {
        if (res.code === "SUCCESS") {
          message("修改成功", { type: "success" });
        } else {
          message("更新失败", { type: "error" });
        }
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
  // console.log("submit!");
};
</script>

<template>
  <el-card>
    <el-form :model="form" label-width="120px">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.realName" />
      </el-form-item>

      <el-form-item label="性别">
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="form.sex" class="ml-4">
            <el-radio label="MALE" size="large">男</el-radio>
            <el-radio label="FEMALE" size="large">女</el-radio>
            <el-radio label="UNKNOWN" size="large">未知</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>

      <el-form-item label="身份证号：">
        <el-input v-model="form.identityNum" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item label="职业生涯">
        <el-input v-model="form.busLife" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
