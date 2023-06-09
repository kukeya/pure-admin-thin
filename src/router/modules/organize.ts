// 最简代码，也就是这些字段必须有
export default {
  path: "/organize",
  meta: {
    title: "组织"
  },
  children: [
    {
      path: "/organize/index",
      name: "Organize",
      component: () => import("@/views/organize/index.vue"),
      meta: {
        title: "我的组织"
      }
    },
    {
      path: "/organize/allOrganize",
      name: "AllOrganize",
      component: () => import("@/views/organize/allOrganize.vue"),
      meta: {
        title: "所有组织"
      }
    },
    {
      path: "/organize/orgManage",
      name: "OrgManage",
      component: () => import("@/views/organize/orgManage.vue"),
      meta: {
        title: "组织管理"
      }
    }
  ]
};
