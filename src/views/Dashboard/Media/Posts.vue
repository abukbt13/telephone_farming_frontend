<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { auth } from '@/compossables/auth.js';

const { base_url,storage, authHeader, multipartHeader } = auth();
const route = useRoute();
const id = ref('');
const description = ref('');
const messages = ref([]);
const message = ref('');
const status = ref('');
const videos = ref([]);
const photos = ref([]);
const posts = ref([]);

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

const getPosts = async () => {
  try {
    const res = await axios.get(base_url.value + 'v1/posts/', authHeader);
    if (res.status === 200) {
      posts.value = res.data.posts;
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    status.value = 'Failed to fetch posts';
  }
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <div>
    <div class="align-items-center d-flex justify-content-center">
      <h1 class="modal-title" id="createpost">Create a post</h1>
      <i style="font-size: 49px" class="fa bi-plus" data-bs-toggle="modal" data-bs-target="#create_post"></i>
    </div>

    <div v-if="status" class="bg-danger text-white text-center text-uppercase p-2 fs-3">{{ status }}</div>
    <hr>

    <div v-for="post in posts" :key="post.id">
      <p>{{ post.description }}</p>

      <!-- Display photos if available -->
      <div v-if="post.photos && post.photos.length > 0">
        <div class="picture">
          <div class="" v-for="(photo, index) in post.photos" :key="index">
            <img :src="storage+'posts/photos/'+photo" alt="Image" style="width: 300px; height: 250px;" >
          </div>
        </div>
      </div>

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
                <p>
                  Add Videos <br>
                  <i class="bi bi-camera-video"></i><br>
                  <input @change="uploadVideos" multiple type="file">
                </p>
              </div>

              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picture {
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Alternatively, you can use grid-column-gap instead of gap */
   grid-column-gap: 0px;
}

/* Add your scoped styles here */
</style>
