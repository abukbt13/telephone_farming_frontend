<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { auth } from "@/compossables/auth.js";
import {useRoute} from "vue-router";

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

// Fetch video data on component mount
onMounted(() => {
  getYoutubeVideos();
});

</script>

<template>
  <div v-if="video">
    <h2>{{ video.title }}</h2>
    <p v-if="video.description">{{ video.description }}</p>
    <p v-else>{{ video.title }}</p>

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
