import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import RequestReset from "@/views/auth/RequestReset.vue";
import telephone_farmer from "@/router/telephone_farmer.js";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import farm_manager from "@/router/farm_manager.js";
import Network from "@/views/Dashboard/Chat/Network.vue";
import Chats from "@/views/Dashboard/Chat/Chats.vue";
import ChatNow from "@/views/Dashboard/Chat/ChatNow.vue";
import Media from "@/views/Dashboard/Media/Index.vue";
import Posts from "@/views/Dashboard/Media/Post/Posts.vue";
import Post from "@/views/Dashboard/Media/Post/Post.vue";
import User from "@/views/auth/User.vue";
import Groups from "@/views/Dashboard/Media/Group/Groups.vue";
import Group from "@/views/Dashboard/Media/Group/Group.vue";
import GroupHome from "@/views/Dashboard/Media/Group/GroupHome.vue";
import Settings from "@/views/Dashboard/Media/Group/Settings.vue";
import MyPosts from "@/views/Dashboard/Media/Post/MyPosts.vue";
import Training from "@/views/Core/Training.vue";
import EducationResource from "@/views/Core/EducationResource.vue";
import lrc from "@/router/lrc.js";
import ReadDocument from "@/views/Dashboard/ReadDocument.vue";
import TrainingDetails from "@/views/Dashboard/TrainingDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...telephone_farmer,
      ...farm_manager,
      ...lrc,
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
      path: '/auth/user',
      component: User
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
      path: '/training',
      component: Training,
    },
      {
      path: '/training/:id',
      component: TrainingDetails,
    },
    {
      path: '/education',
      component: EducationResource,
    },
      {
      path: '/education/:id',
      component: ReadDocument,
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
            {
              path: '/media/me/posts',
              component: MyPosts
            },
          ]
    },
      {
          path: '/media/groups',
          component: GroupHome,
          children:
              [
                  {
                      path: '/media/groups',
                      component: Groups
                  },
                  {
                      path: '/media/group/:id',
                      component: Group
                  },
                  {
                      path: '/media/me/group/:id',
                      component: Settings
                  },
              ]
      },
  ]
})

export default router
