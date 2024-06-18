import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RequestReset from "@/views/auth/RequestReset.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import telephone_farmer from "@/router/telephone_farmer.js";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...telephone_farmer,
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

    // {
    //   path: '/lrc/dashboard',
    //   component: DashboardView,
    // },
    // {
    //   path: '/lrc/dashboard',
    //   component: DashboardView,
    // },


  ]
})

export default router
