import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RequestReset from "@/views/auth/RequestReset.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/auth/login',
      component: Login
    },
    {
      path: '/auth/register',
      component: Register
    },
    {
      path: '/auth/reset',
      component: RequestReset
    },
  ]
})

export default router
