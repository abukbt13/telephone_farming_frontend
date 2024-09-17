<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";
import {auth} from "@/compossables/auth.js";

const {base_url,storage,authHeader} = auth()
function uploadFile(e) {
  new_document.value = e.target.files[0];
}


const title = ref('')
const new_document = ref('');
const description = ref('')
const link = ref('')


const saveDocument = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('document_file', new_document.value);
  formData.append('title', title.value);

  const res = await axios.post(base_url.value + 'v1/education', formData, authHeader);
  if (res) {
    await  Swal.fire(
        'Success!',
        'Document saved Successfully',
        'success'
    )
  }
}
</script>

<template>
  <div class="modal fade" id="uploaddocument" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload Document</h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
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
              <textarea class="form-control" rows="5" v-model="description"></textarea>
            </div>

            <div class="mt-2">
              <input @change="uploadFile" style="display: block;" type="file" placeholder="Upload education material ...">
              <button  type="submit" class="btn btn-primary mt-2 w-25 float-end">Upload</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>