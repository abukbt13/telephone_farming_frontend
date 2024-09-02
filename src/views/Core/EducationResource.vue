<script setup>

import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import {useRoute, useRouter} from "vue-router";

const documents = ref([]);
const route = useRoute()
const router = useRouter()
const {base_url,storage,authHeader} = auth()
const  getDocument = async () => {
  const res = await axios.get(base_url.value + 'v1/education', authHeader)
  if(res){
    documents.value = res.data.documents
  }
}
const downloadDocument = async (id) => {
  try {
    const response = await axios.get(base_url.value + 'v1/education/download/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'downloadedFile';
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    // The browser will prompt the user to select the download location here
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading the document:', error);
  }
};

  function  goBack() {
      router.back();
    }

onMounted(()=> {
  getDocument()
})
</script>

<template>
<Header />
  <i @click="goBack"
     style="opacity: 1; z-index: 1; font-size: 24px; font-weight: 900; position: absolute; left: 1rem; top: 3.2rem;
          text-shadow: 1px 1px 2px white, -1px -1px 2px black;color: white; background-color: grey; padding: 0px 0.5rem"
     class="bi bi-arrow-90deg-left">
  </i>
  <div class="m-2 document grid-container" >
    <div class="card grid-item" v-for="document in documents" :key="document">
      <div class="card-body position-relative">
      <div class="">
        <h2 class="">Title</h2>
        <p>{{document.title}}</p>
        <h5 class="d-flex justify-content-between">Description<i class="bi bi-file-earmark-word"></i>
          <i class="bi bi-file-earmark-pdf"></i>

        </h5>
        <p class="card-text pb-4">
          {{document.description}}
        </p>
      </div>
        <div class="d-flex fixed-bottom position-absolute justify-content-evenly">
          <router-link  :to="'/education/'+document.id" class="btn-link bg-success text-decoration-none">Read</router-link>
          <button @click="downloadDocument(document.id)"  class="btn-link text-decoration-none bg-primary">Download</button>
        </div>
       </div>
    </div>
  </div>
</template>

<style scoped>
.btn-link{
  text-decoration: none;
  padding: 7px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  display: block;
  transition: 0.4s ease-in-out;
}
.btn-link:hover{
  color: white;
  transform: translateX(-30%);
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  gap: 1rem;
}

.grid-item {
  min-width:22vw;
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>