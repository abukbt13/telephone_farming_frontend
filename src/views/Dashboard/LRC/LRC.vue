<script setup>

import {ref} from "vue";
import {auth} from "@/compossables/auth.js";
import axios from "axios";
import Swal from "sweetalert2";
const {base_url,storage,authHeader} = auth()

const new_document = ref('');
const title = ref('')
const description = ref('')
const training_time = ref('')
const training_date = ref('')
const venue = ref('')
const instructor = ref('')
const category = ref('')
function uploadFile(e) {
  new_document.value = e.target.files[0];
}
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
const scheduleEvent = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('venue', venue.value);
  formData.append('training_time', training_time.value);
  formData.append('instructor', instructor.value);
  formData.append('training_date', training_date.value);
  formData.append('category', category.value);
  formData.append('description', description.value);

  const res = await axios.post(base_url.value + 'v1/schedule', formData, authHeader);
  if (res) {
    await  Swal.fire(
        'Success!',
        'Scheduled Successfully',
        'success'
    )
  }
}

</script>

<template>
  <div class="d-flex">
    <div style="height: 13rem; width: 20rem" class="border p-4">
      <h2>Education resources</h2>
      <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#uploaddocument">Upload document</button>
      <router-link to="/education/documents" class="btn btn-primary">View</router-link>
    </div>
    <div style="height: 13rem; width: 20rem"  class="border p-4">
      <h2>Trainings</h2>
      <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#training">Schedule Training</button>
      <router-link to="/education/training" class="btn btn-primary">View</router-link>
    </div>
  </div>
  <!-- Modal -->
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
  <div class="modal fade" id="training" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Shedule Training</h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form  @submit.prevent="scheduleEvent" class="m-2">
            <div class="">
              <label for="">
                Title/About
              </label>
              <input type="text" class="form-control"  v-model="title" >
            </div>
            <div class="">
              <label for="">
                Venue
              </label>
              <input type="text" class="form-control" v-model="venue">
            </div>
            <div class="">
              <label for="">
                time
              </label>
              <input type="time" class="form-control" v-model="training_time">
            </div>
            <div class="">
              <label for="">
                Date
              </label>
              <input type="date" class="form-control" v-model="training_date">
            </div>
            <div class="">
              <label for="">
                Instructor
              </label>
              <input type="text" class="form-control" v-model="instructor">
            </div>
            <div class="">
              <label for="">
                Category
              </label>
              <select v-model="category" class="form-control">
                <option value="vegetable_farming">Vegetable Farming</option>
                <option value="catle_keeping">Cattle Keeping</option>
                <option value="bee_keeping">Bee Keeping</option>
                <option value="fish_Farming">Fish Farming</option>
              </select>
            </div>
            <div class="">
              <label for="">
                Description
              </label>
            <textarea class="form-control" v-model="description"></textarea>
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