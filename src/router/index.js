import { createRouter, createWebHistory } from "vue-router";
import { useUsersStore } from "../stores/usersStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "login",
      path: "/",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      name: "signup",
      path: "/signup",
      component: () => import("@/views/SignUp.vue"),
    },
    {
      name: "dashboard",
      path: "/login/dashboard",
      component: () => import("@/views/DashboardAdmin.vue"),
    },
    {
      name: "users",
      path: "/login/dashboard/users",
      component: () => import("@/views/MyUsers.vue"),
    },
    {
      name: "settings",
      path: "/login/dashboard/settings",
      component: () => import("@/views/SettingsPage.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUsersStore();

  if (to.name === "dashboard") {
    if (!userStore.isAuthenticated || userStore.currentUser !== "admin") {
      return { name: "login" };
    }
  }

  if (to.name === "login" && userStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;
