<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import YoutubeModal from "@/views/Dashboard/LRC/Modals/YoutubeModal.vue";
import Header from "@/components/includes/Header.vue";

const search = ref('')
const { base_url,storage,authUser, authHeader, multipartHeader} = auth();

const videos = ref([])
const getYoutubeVideos = async () => {
  const res = await axios.get(base_url.value + 'v1/youtube', authHeader);
  if (res.status === 200) {
    videos.value = res.data.videos;
  }
};
function feedback(e){
  alert(e)
  getYoutubeVideos()
}
onMounted(() => {
  getYoutubeVideos()
})
</script>

<template>
  <Header />
  <YoutubeModal @response="feedback"/>
  <div style="background:green;" class="m-2 p-2 d-md-flex  d-lg-flex justify-content-around align-items-center">
   <div class="d-flex justify-content-between align-items-center">
     <h5>
       YouTube Videos
     </h5>
     <span class="input-group ms-3 w-auto">
          <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
          <input type="text" v-model="search" class="form-control" placeholder="search ..." aria-label="Username" aria-describedby="basic-addon1">
          <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-lg"></i></span>
      </span>
   </div>
    <div class="d-flex justify-content-between w-auto">
      <button  data-bs-toggle="modal" data-bs-target="#youtube"  class="btn mx-4 btn-primary">Click to upload Link</button>
      <router-link to="/me" class="btn mx-4 btn-success">My Videos</router-link>
    </div>
  </div>
  <div  class="videos">
    <div style="border: 2px solid red;padding:8px;" v-for="video in videos" :key="video" class="mb-1 video">
      <h5  class="text-center">Title</h5>
      <p class="text-center">{{ video.title }}</p>
        <h5 class="text-center">Description</h5>
        <p v-if="video.description !== ''" class="text-center">
        {{ video.description }}
      </p>
        <p v-else class="text-center">
          {{ video.title }}
        </p>
        <router-link style="background: green;color: white;" :to="'/youtube/videos/' + video.id" class="btn w-100">WaTch</router-link>
      </div>
  </div>
</template>

<style scoped>
.videos{
  margin: 1rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.video{
  max-width: 24%;
  min-width: 17%;
}
@media screen and (min-width: 500px) and (max-width: 1000px) {
  .video{
    max-width: 40%;
    min-width: 40%;
  }
}
@media screen and (min-width: 200px) and (max-width: 500px) {
  .video{
    max-width: 100%;
    min-width: 100%;
  }
}
</style>