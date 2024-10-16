<script setup>

import axios from "axios";
import {onMounted, ref, watch} from "vue";
import {auth} from "@/compossables/auth.js";
import {Modal} from "bootstrap";
import Header from "@/components/includes/Header.vue";
import {youtube} from "@/compossables/youtube.js";
import Swal from "sweetalert2";
const { base_url,storage,authUser,AuthenticatedUser,currentUser, authHeader, multipartHeader} = auth();
const { searchVideo,searched_videos,searched_results} = youtube();

const title = ref('');
const search = ref('')
const category = ref('')
const description = ref('');
const link = ref('');
const status = ref('');


const isTitleValid = (title) => {
  const words = title.trim().split(/\s+/);
  return words.length <= 5;
};

const isDescriptionValid = (description) => {
  const words = description.trim().split(/\s+/);
  return words.length <= 30;
};

const extractYoutubeLink = (link) => {
  link = link.trim(); // Trim spaces from the link

  // Regex to capture YouTube video ID from different types of URLs
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=)|youtu\.be\/)([\w-]{11})/;

  const match = link.match(youtubeRegex); // Match the link against the regex

  if (match && match[1]) {
    const videoId = match[1]; // Extract the video ID
    return `https://www.youtube.com/watch?v=${videoId}`; // Return the valid YouTube link
  } else {
    return null; // Return null if no valid video ID is found
  }
};
const saveYoutubeVideo = async () => {

  if (!isTitleValid(title.value)) {
    alert('Title should not be longer than 5 words.')
    return;
  }

  if (!isDescriptionValid(description.value)) {
    alert('Description should not be greater than 30 words.')
    return;
  }

  const validLink = extractYoutubeLink(link.value);
  if (!validLink) {
    emit('response', 'Please provide a valid YouTube link.');
    return;
  }
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('title', title.value);
  formData.append('link', link.value);
  formData.append('user_id', currentUser.id);
  formData.append('category', category.value);
  function clearForm(){
    description.value = ''
    title.value = ''
    link.value = ''
  }
    const res = await axios.post(base_url.value + 'v1/youtube', formData, authHeader);
    if (res.data.status === 'success') {
      clearForm()
      // Display the success message
      await Swal.fire(
          'Success!',
          'Video saved Successfully',
          'success'
      );
      const modalElement = document.getElementById('youtube');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();
      getYoutubeVideos()
    } else {
      status.value = res.data.message; // Handle failure case
    }
};

const videos = ref([])
function clearSearch(){
  searched_videos.value = "";
  search.value = "";
}
const getYoutubeVideos = async () => {
  const res = await axios.get(base_url.value + 'youtube/me',authHeader);
  if (res.status === 200) {
    videos.value = res.data.videos;
  }
};
const SearchQuery = async () =>{
  if(search.value === ''){
    alert('Enter search keyword ...')
    return;
  }
  const formData = new FormData();
  formData.append("search", search.value);
  formData.append("category", 'general');
  await searchVideo(formData)
}

onMounted(() => {
  AuthenticatedUser()
  getYoutubeVideos()
  authUser()
})
</script>

<template>
<!--  {{currentUser}}}-->
  <Header />

  <div style="background:green;" class="m-2 p-2 d-md-flex  d-lg-flex justify-content-around align-items-center">
    <div class="d-flex justify-content-between align-items-center">
      <h5>
        YouTube Videos
      </h5>
      <span class="input-group ms-3 w-auto">
          <span v-if="search"  @click="clearSearch() " class="input-group-text" id="basic-addon1"><i class="bi bi-x-lg"></i></span>
       <input type="text"
              v-model="search"
              class="form-control"
              placeholder="Search..."
              aria-label="Username"
              aria-describedby="basic-addon1"
       >
       <span  class="input-group-text" id="basic-addon1"><i @click="SearchQuery" class="bi bi-search"></i></span>
      </span>
    </div>
    <div class="d-flex justify-content-between w-auto">
      <button  data-bs-toggle="modal" data-bs-target="#youtube"  class="btn mx-4 btn-primary">Click to upload Link</button>
      <router-link to="/youtube/videos" class="btn mx-4 btn-success">All Videos</router-link>
    </div>
  </div>
  <div  class="home">
      <div v-if="searched_videos" class="d-flex flex-column align-items-center justify-content-around">
        <p>Clear search <button @click="clearSearch" class="btn btn-close"></button></p>
        <p>Your searches</p>
      </div>
    <div v-if="searched_videos" class="videos ">


      <br>
      <!--      <div  class="">-->
      <div  style="border: 2px solid red;padding:8px;" v-for="video in searched_videos" :key="video" class="mb-1 video">
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
      <!--      </div>-->
      <!--      <div v-else class="bg-danger text-uppercase text-white">-->
      <!--        <p class="p-3"> No videos</p>-->
      <!--      </div>-->
    </div>
    <div v-else class="videos">
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
  </div>

  <div class="modal fade" id="youtube" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload YouTube Link  </h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="" v-if="status">
            <p class="p-2 bg-danger text-uppercase text-white">{{status}}</p>
          </div>
          <form  @submit.prevent="saveYoutubeVideo" class="m-2">
            <div class="">
              <label for="">
                Title
              </label>
              <input type="text" class="form-control"  v-model="title" >
            </div>
            <div class="">
              <label for="">
                Description
              </label>
              <textarea  v-model="description"  rows="5" class="form-control"></textarea>
            </div>
            <div class="">
              <label for="">
                Link
              </label>
              <input type="text" class="form-control"  v-model="link" >
            </div>
            <div class="">
              <label for="">
                Category
              </label>
              <select required v-model="category" class="form-control">
                <option disabled="" selected="" value="">Select an category</option>
                <option value="others">Others</option>
                <option value="poultry_farming">Poultry farming</option>
                <option value="vegetable_farming">Vegetable farming</option>
                <option value="horticulture">Horticulture</option>
                <option value="bee_keeping">Bee keeping</option>
                <option value="fish_farming">Fish farming</option>
                <option value="livestock_farming">Livestock farming (Cattle, sheep, goat)</option>
                <option value="mixed_farming">Mixed farming</option>
              </select>
            </div>

            <div class="mt-2">
              <button  type="submit" class="btn btn-primary mt-2 w-25 float-end">Save Link</button>
            </div>
          </form>
        </div>
      </div>
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