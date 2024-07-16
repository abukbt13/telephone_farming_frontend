<script setup>
import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {comment} from "postcss";

const { base_url,storage, authHeader, multipartHeader } = auth();
const route = useRoute();
const post_id = route.params.id
const post = ref([]);
const status = ref('');
const comments = ref([]);
const newcomment = ref('')
const username = ref('')
const profile = ref('')
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
const getPost = async () => {
    const res = await axios.get(base_url.value + 'v1/post/'+post_id, authHeader);
    if (res.status === 200) {
      post.value = res.data.post;
      comments.value=res.data.comments
      username.value=res.data.user.name
      profile.value=res.data.user.profile
    }

};

onMounted(() => {
  getPost();
});
</script>

<template>
  <div class="">
<!--    {{post}}-->
  </div>
  <div  class="row mb-1 px-2">
    <a style="font-size: 32px;" href="/media">
      <i class="bi bi-arrow-left"></i>
    </a>

    <div class="d-flex p-2">
      <img style="border-radius: 50%;" :src="storage+'Profile/picture/'+profile" width="40px" height="40"  alt="">
      <div class="">
        <h2>{{username}}</h2>
        <p class="fs-3">{{ post.description }}</p>
      </div>
    </div>
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
    <div class="d-flex justify-content-around align-items-center">
      <div @click="getPost_id(post_id)"  data-bs-toggle="modal" data-bs-target="#comment">
        <i style="font-size: 30px; color: blue;"  data-bs-toggle="modal" data-bs-target="#comment" class="bi bi-chat-right-text-fill"></i><span style="font-size: 30px;" class="m-3">{{post.comments}}</span>
      </div>
      <div @click="AddLike()" data-bs-toggle="modal" data-bs-target="#Like">
        <i style="font-size: 30px;color: red" class="bi bi-heart"></i><span style="font-size: 30px;" class="m-3">{{post.likes}}</span>
      </div>
    </div>
<!--    {{comments}}-->
    <p  v-if="comments.length>0" class="pt-2" v-for="comment in comments" :key="comment">
      <img style="border-radius: 50%;" :src="storage+'Profile/picture/'+comment.profile" width="40px" height="40"  alt="">
      {{comment.comment}}.
    </p>
  </div>


<!--  modal for comment-->
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
            <textarea v-model="newcomment" cols="4" rows="4" class="form-control"></textarea>
            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Comment</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>