<script setup>

import axios from "axios";
import Swal from "sweetalert2";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";
import {Modal} from "bootstrap";

const {base_url,storage,authHeader} = auth()
const routes = useRoute()
const farms = ref('')
const description = ref('')
const picture = ref('')
const activity_name = ref('')
const farm_id = ref('')
const Allprogress = ref([])
farm_id.value = routes.params.id
function pictureUpload(e){
  picture.value=e.target.files[0];
}

const  getProgress = async () => {
  const res = await axios.get(base_url.value + 'fm/farm/'+farm_id.value, authHeader)
  if(res){
    Allprogress.value = res.data.progresses
  }
}

const addProgress = async () => {
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('picture', picture.value);
  formData.append('activity_name', activity_name.value);
  formData.append('farm_id', farm_id.value);

  const res = await axios.post(base_url.value + 'fm/farm/progress', formData,authHeader);

  if (res.data.status === 'success') {
    await  Swal.fire(
        'Success!',
        'Farm created Successfully',
        'success'
    )
    const modalElement = document.getElementById('progress');
    const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
    bootstrapModal.hide();
    getProgress()
  }
}

onMounted(()=> {
  getProgress()
})
</script>

<template>
<!--  {{Allprogress}}-->

      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>
                Farm Progresses
                <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#progress">Add Progress</button>
              </h2>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Picture</th>
            <th>Title/activity</th>
            <th>Description</th>
            <th>Picture</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(All, index) in Allprogress" :key="All">
            <td class=" ">{{ index }}</td>
            <td class="">
              <img :src="storage  + All.photos" class="img img-fluid" width="200" height="200">
            </td>
            <td class="border text-center align-middle">{{ All.activity_name }}</td>
            <td class="border text-center align-middle">{{ All.description }}</td>

            <td class="border text-center align-middle"><button class="btn bg-secondary">More Info</button></td>
          </tr>
          </tbody>
        </table>
      </div>




  <div class="modal fade" id="progress" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Progress</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addProgress">
            <div class="mb-3">
              <label class="form-label">Activity name</label>
              <input type="text" class="form-control" v-model="activity_name">
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea cols="4"  v-model="description" class="form-control"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Progress</label>
              <input type="file" @change="pictureUpload" class="form-control" >
            </div>
            <button type="submit"  class="btn btn-primary">Add Farm</button>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>
<!---->
<style scoped>

</style>