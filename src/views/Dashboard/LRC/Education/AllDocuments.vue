<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

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

  <table class="table table-bordered">
    <thead>
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
      <td><button class="btn btn-primary">View</button></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>