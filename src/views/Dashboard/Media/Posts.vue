<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { auth } from '@/compossables/auth.js';

const { base_url,storage, authHeader, multipartHeader} = auth();
const route = useRoute();
const id = ref('');
const description = ref('');
const messages = ref([]);
const message = ref('');
const status = ref('');
const videos = ref([]);
const photos = ref([]);
const posts = ref([]);
const comment = ref('');
const post_id = ref('');

function uploadPictures(e) {
  const files = e.target.files;
  photos.value = []; // Clear the array before adding new files
  for (let i = 0; i < files.length; i++) {
    photos.value.push(files[i]);
  }
}

function uploadVideos(e) {
  const files = e.target.files;
  videos.value = []; // Clear the array before adding new files
  for (let i = 0; i < files.length; i++) {
    videos.value.push(files[i]);
  }
}

const createPost = async () => {
  if (description.value === '') {
    alert('Type a message');
    return;
  }

  const formData = new FormData();
  formData.append('description', description.value);

  for (let i = 0; i < photos.value.length; i++) {
    formData.append('photos[]', photos.value[i]);
  }

  for (let i = 0; i < videos.value.length; i++) {
    formData.append('videos[]', videos.value[i]);
  }

  try {
    const res = await axios.post(base_url.value + 'v1/posts/', formData, multipartHeader);
    if (res.data.status === 'success') {
      status.value = res.data.message;
      getPosts();
    } else {
      status.value = 'Something went wrong';
    }
  } catch (error) {
    console.error('Error creating post:', error);
    status.value = 'Failed to create post';
  }
};

function getPost_id ($id){
  post_id.value = $id
  console.log(post_id)
}
const AddLike = async ($id)=>  {
  post_id.value = $id
  const res = await axios.get(base_url.value + 'v1/posts/'+post_id.value+'/likes', authHeader);
  if (res.data.status === 'success') {
    status.value = res.data.message;
    getPosts();
  } else {
    status.value = res.data.message;
  }
}
const CommentPost = async () => {
  if (comment.value === '') {
    alert('Type a message');
    return;
  }

  const formData = new FormData();
  formData.append('comment', comment.value);

    const res = await axios.post(base_url.value + 'v1/posts/'+post_id.value+'/comments', formData, authHeader);
    if (res.data.status === 'success') {
      status.value = res.data.message;
      getPosts();
    } else {
      status.value = 'Something went wrong';
    }

};

const getPosts = async () => {
    const res = await axios.get(base_url.value + 'v1/all/posts/', authHeader);
    if (res.status === 200) {
      posts.value = res.data.posts;
    }
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div>
    <div  style="background: #dddddd;"  class="p-1 sticky-top  d-flex justify-content-between align-items-center">
        <p class="modal-title" id="createpost">What is on your mind</p>
        <button  data-bs-toggle="modal" data-bs-target="#create_post" style="background:#0dcaf0;" class="btn btn-sm">
          <i class="fa bi-plus" ></i>
          Create post
        </button>
      </div>

    <div v-if="status" class="bg-danger text-white text-center text-uppercase p-2 fs-3">{{ status }}</div>


    <div  class="posts text-decoration-none" v-for="post in posts" :key="post.id">

      <div class="d-flex ">
        <img style="border-radius: 50%;" :src="storage+'Profile/picture/'+post.profile" width="40px" height="40"  alt="">
        <div class="">
          <h2>{{post.name}}</h2>
          <p class="d-flex flex-column">{{ post.description }}</p>
        </div>
      </div>
      <!-- Display photos if available -->
     <div  class="row mb-1">
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
      <a :href="'media/post/'+post.id">
        <button style="background: #f0dada" class="btn  w-100 ">more info</button>
      </a>
    </div>

    <div class="modal fade" id="create_post" tabindex="-1" aria-labelledby="createpost" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="m-3">
            <form @submit.prevent="createPost">
              <h3>Description</h3>
              <textarea v-model="description" cols="4" rows="4" class="form-control"></textarea>

              <div class="d-flex mt-2">
                <p>
                  Add photos <br>
                  <i class="bi bi-images"></i><br>
                  <input @change="uploadPictures" multiple type="file">
                </p>
<!--                <p>-->
<!--                  Add Videos <br>-->
<!--                  <i class="bi bi-camera-video"></i><br>-->
<!--                  <input @change="uploadVideos" multiple type="file">-->
<!--                </p>-->
              </div>

              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="comment" tabindex="-1" aria-labelledby="createpost" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Comment</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="m-3">
            <form @submit.prevent="CommentPost">
              <h3>Description</h3>
              <textarea v-model="comment" cols="4" rows="4" class="form-control"></textarea>
              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts{
  margin-bottom: 3px;
  border: 1px solid pink;
}
/* Add your scoped styles here */
</style>
