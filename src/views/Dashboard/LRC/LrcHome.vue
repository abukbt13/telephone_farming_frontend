<script setup>

import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {auth} from "@/compossables/auth.js";

const {base_url,storage,authHeader} = auth()

const new_document = ref('');
const title = ref('');
const description = ref('');
function uploadFile(e) {
  new_document.value = e.target.files[0];
}
const saveDocument = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('document', new_document.value);
  formData.append('title', title.value);

  const res = axios.post(base_url.value + 'v1/education', formData, authHeader);

  if (res.data.status === 'success') {
    await Swal.fire(
        'Success!',
        'Document created Successfully',
        'success'
    );
  }
}

</script>

<template>
<Header />
  {{documents}}
 <div style="width: 25%;" class="">
   <form  @submit.prevent="saveDocument" class="m-2">
     <div class="">
       <label for="">
         Title
       </label>
       <input type="text" class="form-control"  v-model="title">
     </div>
     <div class="">
       <label for="">
         Description
       </label>
       <input type="text" class="form-control" v-model="description">
     </div>

     <div class="mt-2">
       <input @change="uploadFile" style="display: block;" type="file" placeholder="Upload education material ...">
       <button  type="submit" class="btn btn-primary mt-2">Upload</button>

     </div>
   </form>
 </div>
</template>

<style scoped>

</style>