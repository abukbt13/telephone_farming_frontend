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
function feedback(e){
  alert(e)
}
onMounted(() => {
  getYoutubeVideos()
})
</script>

<template>
<!--  {{videos}}-->
  <YoutubeModal @response="feedback"/>
  <div class="table-responsive">
    <table class="table table-bordered">
    <thead>
    <tr>
      <td colspan="8" class="">
        <div class="d-flex justify-content-between">
          <h2>All youtube Videos </h2> <button data-bs-toggle="modal" data-bs-target="#youtube" class="btn btn-sm btn-secondary">Add Video</button>
        </div>
      </td>
    </tr>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Created At</th>
      <th>Updated At</th>
      <th colspan="2">Operation</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="video in videos" :key="video.id">
      <td>{{ video.id }}</td>
      <td>{{ video.title }}</td>
      <td>{{ video.description }}</td>

      <td>{{ new Date(video.created_at).toLocaleString() }}</td>
      <td>{{ new Date(video.updated_at).toLocaleString() }}</td>
      <td><button data-bs-toggle="modal" data-bs-target="#youtube" class="btn btn-secondary">Edit</button></td>
      <td><router-link to="/youtube/videos" class="btn btn-primary">View</router-link></td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<style scoped>

</style>