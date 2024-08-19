<script setup>

import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

const documents = ref([]);

const {base_url,storage,authHeader} = auth()
const  getDocument = async () => {
  const res = await axios.get(base_url.value + 'v1/education', authHeader)
  if(res){
    documents.value = res.data.documents
  }
}

onMounted(()=> {
  getDocument()
})
</script>

<template>
<Header />
  <div class="m-2" v-for="document in documents" :key="document">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h2 class="card-title">Title</h2>
        <p>{{document.title}}</p>
        <h5 class="card-title">Description</h5>
        <p class="card-text">
          {{document.description}}
        </p>
        <router-link style="text-decoration: none;border: none;background: #3f1be1; padding: 10px;font-size: 20px;color: white;font-family: FreeMono;font-weight: 1000;" to="#"  class="">View</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>