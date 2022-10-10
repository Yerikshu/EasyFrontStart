import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/login",
    //   component: () => import("@/views/login/index.vue"),
    //   meta: {
    //     title: "登录",
    //   },
    // },
    {
      path: "/",
      redirect: "/home/console",
      component: () => import("/src/components/base/layout/AsideLayout.vue"),
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "/home/console",
          component: () => import("/src/views/home/ConsoleView.vue"),
          name: "console",
          meta: { title: "控制台", icon: "el-icon-s-home", affix: true },
        },
      ],
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/404",
      name: 404,
      component: () => import("/src/views/404.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    },
  ],
});

export default router;
