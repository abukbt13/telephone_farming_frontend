<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import DocumentModal from "@/views/Dashboard/LRC/Modals/DocumentModal.vue";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();

const documents = ref([])
const getDocuments = async () => {
  const res = await axios.get(base_url.value + 'v1/education', authHeader);
  if (res.status === 200) {
    documents.value = res.data.documents;
  }
};

onMounted(() => {
  getDocuments()
})
</script>

<template>
<!--{{documents}}-->
<DocumentModal />
 <div class="table-responsive">
   <table class="table table-bordered">
     <thead>
     <tr>
       <td colspan="8" class="">
         <div class="d-flex justify-content-between">
           <h2>All Documents </h2> <button data-bs-toggle="modal" data-bs-target="#uploaddocument"   class="btn btn-sm btn-secondary">Add Document</button>
         </div>
       </td>
     </tr>
     <tr>
       <th>ID</th>
       <th>Title</th>
       <th>Description</th>
       <th>Document</th>
       <th>Created At</th>
       <th>Updated At</th>
       <th colspan="2">Operation</th>
     </tr>
     </thead>
     <tbody>
     <tr v-for="document in documents" :key="document.id">
       <td>{{ document.id }}</td>
       <td>{{ document.title }}</td>
       <td>{{ document.description }}</td>
       <td>
         <a href="bh" target="_blank">{{ document.document }}</a>
       </td>
       <td>{{ new Date(document.created_at).toLocaleString() }}</td>
       <td>{{ new Date(document.updated_at).toLocaleString() }}</td>
       <td><router-link to="/education" class="btn btn-primary">View</router-link></td>
       <td><button data-bs-toggle="modal" data-bs-target="#uploaddocument" class="btn btn-secondary">edit</button></td>
     </tr>
     </tbody>
   </table>
 </div>
</template>

<style scoped>

</style>