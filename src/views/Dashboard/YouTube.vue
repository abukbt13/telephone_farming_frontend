<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import YoutubeModal from "@/views/Dashboard/LRC/Modals/YoutubeModal.vue";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();

const videos = ref([])
const getYoutubeVideos = async () => {
  const res = await axios.get(base_url.value + 'v1/youtube', authHeader);
  if (res.status === 200) {
    videos.value = res.data.videos;
  }
};

onMounted(() => {
  getYoutubeVideos()
})
</script>

<template>
  <h2 class="border p-2 text-center bg-primary text-uppercase">YouTube Videos Here</h2>
  <div  class="videos">
    <div  v-for="video in videos" :key="video" class="card mb-1">
      <h5 class="card-header">{{ video.title }}</h5>
      <div class="card-body">
        <p v-if="video.description !== ''">
        {{ video.description }}
      </p>
        <p v-else>
          {{ video.title }}
        </p>
        <router-link :to="'/youtube/videos/' + video.id" class="btn btn-primary">WaTch</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.videos{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.videos .card{
  width: 24%;
}
@media screen and (min-width: 800px) and (max-width: 1000px) {
  .videos .card {
    width: 32%;
  }
}
@media screen and (min-width: 500px) and (max-width: 800px) {
  .videos .card {
    width: 49%;
  }
}
@media screen and (min-width: 1px) and (max-width: 500px) {
  .videos .card {
    width: 95%;
  }
}
</style>