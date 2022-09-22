import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: "/",
      name: "home",
      redirect: '/home',
      component: () => import("@/components/base/layout/AsideLayout"),
      meta:{
        title: "首页"
      },
      children:[
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          name: 'Home',
          meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
        },
        {
          path: "/index/about",
          name: "about",
          component: () => import("@/views/AboutView"),
          meta:{
            "概要"
          }
        }
      ]
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
      component: () => import("@/views/404"),
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    }
  ],
});

export default router;
