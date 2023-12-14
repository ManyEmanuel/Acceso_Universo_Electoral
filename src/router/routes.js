import { isAuthenticatedGuard } from "src/store/acceso_store";
const routes = [
  {
    path: "",
    name: "login",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("pages/Login.vue"),
  },
  {},
  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/Panel",
        name: "Panel",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "",
        name: "Principal",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/Registro",
    name: "Registro",
    component: () => import("../modulos/ciudadano_registro/pages/Registro.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
