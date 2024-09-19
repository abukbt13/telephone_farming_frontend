<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { auth } from "@/compossables/auth.js";
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
const {base_url, authHeader} = auth();
const route = useRoute();
const id = route.params.id;
const video = ref(null);

// Function to fetch video data
const getYoutubeVideos = async () => {
  const res = await axios.get(base_url.value + 'v1/youtube/' + id, authHeader);
  if (res.status === 200) {
    video.value = res.data.video;
  }
};

// Extract YouTube video ID
const videoId = computed(() => {
  if (video.value) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = video.value.link.match(regex);
    return match ? match[1] : null;
  }
  return null;
});

function copyLink(link) {
  navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
}
function  goBack() {
  router.back();
}

// Fetch video data on component mount
onMounted(() => {
  getYoutubeVideos();
});

</script>

<template>
  <div v-if="video">
    <div  class="m-2 d-block d-md-flex align-items-center gap-4">
      <div class="">
        <button  @click="goBack" class="btn btn-primary"><i class="bi bi-arrow-left"></i>
          Go Back</button>
      </div>
      <div class="">
        <h5>Title: <span class="text-primary" > <br>{{ video.title }}</span></h5>
        <p v-if="video.description">Description: <br> <span class="text-primary">{{ video.description }}</span></p>
        <p v-else><span class="text-primary">{{ video.title }}</span></p>
      </div>
      <div class="d-flex">
       <p>
         {{video.link}}
       </p>
        <p @click="copyLink(video.link)" class="ms-3">
          <i class="bi bi-copy"></i>
        copy link
        </p>
      </div>
    </div>

    <!-- Embed YouTube video -->
    <iframe style="width: 100vw; height: 100vh;" v-if="videoId"
            :src="`https://www.youtube.com/embed/${videoId}`"
            frameborder="0"
            allowfullscreen>
    </iframe>
    <p v-else>No valid video link found.</p>
  </div>
</template>

<style scoped>

</style>
