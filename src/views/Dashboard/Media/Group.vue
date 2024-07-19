<script setup>
import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {comment} from "postcss";
import CreatenewPost from "@/components/CreatenewPost.vue";

const { base_url,storage, authUser, authHeader, multipartHeader } = auth();
const route = useRoute();
const group_id = route.params.id
const group = ref([]);
const posts = ref([]);
const status = ref('');

const comments = ref([]);
const newcomment = ref('')
const username = ref('')
const profile = ref('')
 const new_group_id = ref(group_id)
const AddLike = async ()=>  {

  const res = await axios.get(base_url.value + 'v1/posts/'+post_id+'/likes', authHeader);
  if (res.data.status === 'success') {
    status.value = res.data.message;
    getPost();
  } else {
    status.value = res.data.message;
  }
}
const CommentPost = async () => {
  if (newcomment.value === '') {
    alert('Type a message');
    return;
  }

  const formData = new FormData();
  formData.append('comment', newcomment.value);

  const res = await axios.post(base_url.value + 'v1/posts/'+post_id+'/comments', formData, authHeader);
  if (res.data.status === 'success') {
    status.value = res.data.message;
    getPost();
  } else {
    status.value = 'Something went wrong';
  }

};
const getGroup = async () => {
  const res = await axios.get(base_url.value + 'v1/groups/'+group_id, authHeader);
  if (res.status === 200) {
    group.value = res.data.group;
  }

};

const getPosts = async () => {
  const res = await axios.get(base_url.value + 'v1/posts', authHeader);
  if (res.status === 200) {
    posts.value = res.data.posts;
  }
};

onMounted(() => {
  getPosts();
  getGroup();
  authUser();
})

</script>

<template>
  <div class=" d-flex flex-column align-items-center">
    <div class="card">
<!--      <img src="/img_2.png" class="card-img-top" alt="...">-->
      <div  class="card-body d-flex align-items-center">
        <div class="">
          <img v-if="group.profile" style="border-radius: 50%;" :src="storage+'Groups/profiles/'+group.profile"  width="200" height="200"  alt="">

          <img v-else src="/pic.jpg" class="rounded-circle" width="200" height="200" alt="">
        </div>
        <div class="ms-3">
          <h5 class="card-title">{{ group.name }}</h5>
          <p class="card-text">
            {{group.description}}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div  style="background: #dddddd;"  class="p-1 sticky-top">
     <div class="p-2 m">
       <p class="modal-title" id="createpost">What is new or interesting</p>
       <p class="modal-title" id="createpost">Share something today
         <button  data-bs-toggle="modal" data-bs-target="#create_post" style="background:#0dcaf0;" class="btn float-end btn-sm">
           <i class="fa bi-plus" ></i>
           Create post
          </button>
       </p>
     </div>

    </div>
     <CreatenewPost :new_group_id=new_group_id @postCreated="getPosts" />

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
      <a :href="'media/post/'+post.id">
        <button style="background: #f0dada" class="btn  w-100 ">more info</button>
      </a>
    </div>

  </div>


<!--  //create a post-->
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

</template>

<style scoped>

</style>