import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/first",
      name: "first",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/FirstView.vue"),
    },
    {
      path: "/second",
      name: "second",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/SecondView.vue"),
    },
    {
      path: "/third",
      name: "third",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ThirdView.vue"),
    },
    {
      path: "/fourth",
      name: "fourth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/FourthView.vue"),
    },
    {
      path: "/fiveth",
      name: "fiveth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/1/FivethView.vue"),
    },
    {
      path: "/computed",
      name: "computed",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/ComputedTrain.vue"),
    },
    {
      path: "/lifecycle",
      name: "lifecycle",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AppLifecycle.vue"),
    },
    {
      path: "/pinia",
      name: "pinia",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AppPinia.vue"),
      children: [
        {
          path: ":slug",
          component: () => import("@/views/pinia/PiniaSlug.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/form",
      name: "form",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/FormBuilderView.vue"),
    },
    {
      path: "/create-form",
      name: "createForm",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/formBuilder/FormCreate.vue"),
    },
    {
      path: "/view-form",
      name: "viewForm",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/FormBuilderView.vue"),
    },
    {
      path: "/roadmap",
      name: "roadmap",
      component: () => import("@/views/roadmap/RoadMap.vue"),
      children: [
        {
          path: "roadmap-Pinia-main", // ❗️убери `/` вначале
          component: () => import("@/views/roadmap/roadmap-pinia/RoadmapPiniaMain.vue"),
          children: [
            {
              path: "create-form",
              component: () => import("@/views/roadmap/roadmap-pinia/form/RoadmapPiniaСreate.vue"),
            },
            {
              path: "form-list",
              component: () =>
                import("@/views/roadmap/roadmap-pinia/form/RoadmapPiniaFormlist.vue"),
            },
            {
              path: "forms-list/:id",
              component: () =>
                import("@/views/roadmap/roadmap-pinia/form/RoadmapPiniaFormview.vue"),
              props: true,
            },
            {
              path: "form-list/edit/:id",
              component: () =>
                import("@/views/roadmap/roadmap-pinia/form/RoadmapPiniaFormedit.vue"),
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: "/todo",
      name: "todo",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/todo/TodoList.vue"),
    },
  ],
});

export default router;
