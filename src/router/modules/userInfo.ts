export default {
  path: "/userInfo",
  meta: {
    title: "用户信息"
  },
  children: [
    {
      path: "/userInfo/index",
      name: "UserInfo",
      component: () => import("@/views/userInfo/index.vue"),
      meta: {
        title: "用户信息"
      }
    },
    {
      path: "/userInfo/update",
      name: "Update",
      component: () => import("@/views/userInfo/update.vue"),
      meta: {
        title: "修改信息"
      }
    }
  ]
};
