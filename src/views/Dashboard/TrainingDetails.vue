<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {auth} from "@/compossables/auth.js";
import Header from "@/components/includes/Header.vue";

const {base_url,storage,authHeader} = auth()
const  details =ref('')
const route = useRoute()
const id =ref('')
const router = useRouter()
id.value =route.params.id
const  getTrainingDetails = async () => {
  const res = await axios.get(base_url.value + 'v1/schedule/'+id.value, authHeader)
  if(res){
    details.value = res.data.shedule
  }
}
function  goBack() {
  router.back();
}

onMounted(()=> {
  getTrainingDetails()
})
</script>

<template>

  <Header />
  <i @click="goBack"
     style="opacity: 1; z-index: 1; font-size: 44px; font-weight: 900; position: absolute; left: 1rem; top: 2rem;
          color: #0d0dcf; background: transparent;"
     class="bi bi-arrow-left">
  </i>
  <div class="m-4 p-2">
    <h2>Shedule details</h2>
    <ul>
      <li class="">
        <h2>Title</h2>
        <p>{{details.title}}</p>
      </li>
      <li class="">
        <h2>Description</h2>
        <p>{{details.description}}</p>
      </li>
      <li class="">
        <h2>Venue</h2>
        <p>{{details.venue}}</p>
      </li>
      <li class="">
        <h2>Time</h2>
        <p>{{details.training_time}}</p>
      </li>
      <li class="">
        <h2>Instructor</h2>
        <p>{{details.instructor}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
}
</style>