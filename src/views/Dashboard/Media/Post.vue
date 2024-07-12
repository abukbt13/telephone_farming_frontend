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
const comments = ref([]);

const getPost = async () => {
    const res = await axios.get(base_url.value + 'v1/posts/'+post_id, authHeader);
    if (res.status === 200) {
      post.value = res.data.post;
      comments.value=res.data.comments
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
  <div  class="row mb-1">
    <a style="font-size: 32px;" href="/media">
      <i class="bi bi-arrow-left"></i>
    </a>

    <p class="fs-3">{{ post.description }}</p>
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
<!--    {{comments}}-->
    <p  v-if="comments.length>0" class="fs-4 ps-4" v-for="comment in comments" :key="comment">
      <img style="border-radius: 50%;" :src="storage+'Profile/picture/'+comment.profile" width="40px" height="40"  alt="">

      {{comment.comment}}.
    </p>
  </div>

</template>

<style scoped>

</style>