import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RequestReset from "@/views/auth/RequestReset.vue";
import DashboardView from "@/views/Dashboard/TelephoneFarmer/DashboardView.vue";
import telephone_farmer from "@/router/telephone_farmer.js";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import farm_manager from "@/router/farm_manager.js";
import Network from "@/views/Dashboard/Chat/Network.vue";
import Chats from "@/views/Dashboard/Chat/Chats.vue";
import ChatNow from "@/views/Dashboard/Chat/ChatNow.vue";
import Media from "@/views/Dashboard/Media/Index.vue";
import Posts from "@/views/Dashboard/Media/Posts.vue";
import Post from "@/views/Dashboard/Media/Post.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...telephone_farmer,
      ...farm_manager,
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
    {
      path: '/about',
      component: About,
    },
    {
      path: '/contact',
      component: Contact,
    },

    {
      path: '/network',
      component: Network,
      children:
          [
            {
              path: '/network',
              component: ChatNow
            },
            {
              path: '/network/chats/:id',
              component: Chats
            },
          ]
    },
    {
      path: '/media',
      component: Media,
      children:
          [
            {
              path: '/media',
              component: Posts
            },
            {
              path: '/media/post/:id',
              component: Post
            },
          ]
    },

  ]
})

export default router
