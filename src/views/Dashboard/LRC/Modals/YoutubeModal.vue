<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import {ref} from "vue";
import {auth} from "@/compossables/auth.js";

const {base_url,storage,authHeader} = auth()



const title = ref('')
const new_document = ref('');
const description = ref('')
const link = ref('')


const saveYoutubeVideo = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('title', title.value);
  formData.append('link', link.value);

  const res = await axios.post(base_url.value + 'v1/youtube', formData, authHeader);
  if (res) {
    await  Swal.fire(
        'Success!',
        'Video saved Successfully',
        'success'
    )
  }
}

</script>

<template>
  <div class="modal fade" id="youtube" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Shedule Training</h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form  @submit.prevent="saveYoutubeVideo" class="m-2">

            <div class="">
              <label for="">
                Title
              </label>
              <input type="text" class="form-control"  v-model="title" >
            </div>
            <div class="">
              <label for="">
                Description
              </label>
              <textarea  v-model="description"  rows="5" class="form-control"></textarea>
            </div>
            <div class="">
              <label for="">
                Link
              </label>
              <input type="text" class="form-control"  v-model="link" >
            </div>

            <div class="mt-2">
              <button data-bs-dismiss="modal"  type="submit" class="btn btn-primary mt-2 w-25 float-end">Schedule</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>