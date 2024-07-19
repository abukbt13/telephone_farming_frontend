<script setup>

import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import axios from "axios";
import {useRouter} from "vue-router";
const posts = ref('')

const router = useRouter()
const goBack = () => {
  router.back();
};

const { base_url,storage,authUser, authHeader, multipartHeader } = auth();
const getMyPosts = async () => {
  const res = await axios.get(base_url.value + 'v1/me/posts', authHeader);
  if (res.status === 200) {
    posts.value = res.data.posts;
  }

};

onMounted(() => {
  authUser()
  getMyPosts();
});
</script>

<template>
<!--  {{posts}}-->
  <i @click="goBack" style="font-size: 33px;" class="bi ms-2  p-3 bi-arrow-left"></i>
    <h2  style="" class="text-center sticky-top">My posts</h2>
  <div  class="posts text-decoration-none" v-for="post in posts" :key="post.id">

    <div class="d-flex p-2">
      <img style="border-radius: 50%;" :src="storage+'Profile/picture/'+post.profile" width="40px" height="40"  alt="">
      <div class="">
        <h2>{{post.name}}</h2>
        <p class="">{{ post.description }}</p>
      </div>
    </div>
    <!-- Display photos if available -->
    <div  class="row mb-1 px-3">
      <div v-if="post.photos">
        <div v-if="post.photos.length > 1" class="row">
          <div class="col col-6 mb-1" v-for="(photo, index) in post.photos" :key="index">
            <img :src="storage+'posts/photos/'+photo" alt="Image" class="img-fluid border-2" width="100%" >
          </div>
        </div>
        <div v-else class="">
          <div class="col col-12" v-for="(photo, index) in post.photos" :key="index">
            <img :src="storage+'posts/photos/'+photo" alt="Image" class="img-fluid border-4"  >
          </div>
        </div>
      </div>

    </div>

    <div class="d-flex justify-content-around align-items-center">
      <div @click="getPost_id(post.id)"  data-bs-toggle="modal" data-bs-target="#comment">
        <i style="font-size: 30px; color: blue;"  data-bs-toggle="modal" data-bs-target="#comment" class="bi bi-chat-right-text-fill"></i><span style="font-size: 30px;" class="m-3">{{post.comments}}</span>
      </div>
      <div @click="AddLike(post.id)" data-bs-toggle="modal" data-bs-target="#Like">
        <i style="font-size: 30px;color: red" class="bi bi-heart"></i><span style="font-size: 30px;" class="m-3">{{post.likes}}</span>
      </div>
    </div>
    <router-link :to="'/media/post/'+post.id">
      <button style="background: #f0dada" class="btn  w-100 ">more info</button>
    </router-link>
  </div>

</template>

<style scoped>

</style>