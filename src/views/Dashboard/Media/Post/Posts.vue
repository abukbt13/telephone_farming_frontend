<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { auth } from '@/compossables/auth.js';
import CreatenewPost from "@/components/CreatenewPost.vue";
import {commons} from "@/compossables/commons.js";
import Swal from "sweetalert2";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();

const route = useRoute();
const id = ref('');
const {AddLike,likeStatuses} =commons()

const status = ref('');

const description = ref('');
const messages = ref([]);
const message = ref('');
const videos = ref([]);
const photos = ref([]);
const posts = ref([]);
const comment = ref('');
const post_id = ref(null);
const new_group_id = ref(null);


function getPost_id ($id){
  post_id.value = $id
  likeStatuses.value = ''
}

const propsData = {
  'post_id': post_id,
  'group_id': new_group_id
};

function postResponse(msg){
   Swal.fire(
      'Success!',
       msg,
      'success'
  )
  getPosts()
}

const getPosts = async () => {
    const res = await axios.get(base_url.value + 'v1/posts', authHeader);
    if (res.status === 200) {
      posts.value = res.data.posts;
    }
    else {
      // status.value =
    }
};

onMounted(() => {
  getPosts();
  authUser();
});
</script>

<template>

  <!--    create a new post-->
  <!--    :current_post_id=post_id @postCreated="getPost"-->
  <CreatenewPost :newdata=propsData  @postResponse="postResponse" />
  <!--  end create a new post  -->


  <div>

    <div  style="background: #dddddd;"  class="p-1 sticky-top ">

        <button  data-bs-toggle="modal"  data-bs-target="#create_post" style="background:#0dcaf0;" class="btn btn-sm float-end">
          <i class="fa bi-plus" ></i>
          Create post
        </button>
      </div>


    <div v-if="status" class="bg-danger text-white text-center text-uppercase p-2 fs-3">{{ status }}</div>

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
             <img :src="storage+photo" alt="Image" class="img-fluid border-2" width="100%" >
           </div>
         </div>
         <div v-else class="">
           <div class="col col-12" v-for="(photo, index) in post.photos" :key="index">
<!--             <img src="http://127.0.0.1:8000/storage/posts/photos/67177d56037da.png" alt="">-->
             <img :src="storage+photo" alt="Image" class="img-fluid border-4">
           </div>
         </div>
       </div>

     </div>

      <p @click="likeStatuses.id =''" v-if="likeStatuses.id == post.id" style="background: orange;" class="d-flex align-items-center justify-content-between fs-2">{{likeStatuses.message}} <button class="btn btn-primary ">Close</button> </p>

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



  </div>
</template>

<style scoped>
.posts{
  margin-bottom: 3px;
  border: 1px solid pink;
}
/* Add your scoped styles here */
</style>
