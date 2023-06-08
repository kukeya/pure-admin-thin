<script lang="ts" setup>
import { getUserInfo } from "@/api/user";
import { onMounted, reactive } from "vue";

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
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "UserInfo"
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
</script>

<template>
  <el-card>
    <el-form :model="form" label-width="120px">
      <el-form-item label="昵称：">
        <el-text>
          {{ form.nickname }}
        </el-text>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-text>
          {{ form.realName }}
        </el-text>
      </el-form-item>
      <el-form-item label="身份证号：">
        <el-text>
          {{ form.identityNum }}
        </el-text>
      </el-form-item>
      <el-form-item label="身份：">
        <el-text>
          {{ form.role }}
        </el-text>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-text>
          {{ form.email }}
        </el-text>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-text>
          {{ form.phone }}
        </el-text>
      </el-form-item>
      <el-form-item label="性别：">
        <el-text>
          {{ form.sex }}
        </el-text>
      </el-form-item>

      <el-form-item label="职业生涯：">
        <el-text>
          {{ form.busLife }}
        </el-text>
      </el-form-item>
    </el-form>
  </el-card>
</template>
