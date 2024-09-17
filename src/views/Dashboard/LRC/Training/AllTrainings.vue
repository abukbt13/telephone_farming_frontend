<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import DocumentModal from "@/views/Dashboard/LRC/Modals/DocumentModal.vue";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();

const schedules = ref([])
const getschedules = async () => {
  const res = await axios.get(base_url.value + 'v1/schedule', authHeader);
  if (res.status === 200) {
    schedules.value = res.data.schedules;
  }
};

onMounted(() => {
  getschedules()
})
</script>

<template>
  <!--{{schedules}}-->
<DocumentModal />

  <table class="table table-bordered">
    <thead>
    <tr>
      <td colspan="8" class="">
        <div class="d-flex justify-content-between">
          <h2>All Training </h2> <button class="btn btn-sm btn-secondary">Schedule Training</button>
        </div>
      </td>
    </tr>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Description</th>
      <th>Created At</th>
      <th>Updated At</th>
      <th colspan="2">Operation</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="schedule in schedules" :key="schedule.id">
      <td>{{ schedule.id }}</td>
      <td>{{ schedule.title }}</td>
      <td>{{ schedule.description }}</td>

      <td>{{ new Date(schedule.created_at).toLocaleString() }}</td>
      <td>{{ new Date(schedule.updated_at).toLocaleString() }}</td>
      <td><button  data-bs-toggle="modal" data-bs-target="#training" class="btn btn-secondary">Edit</button></td>
      <td><router-link to="/training" class="btn btn-primary">View</router-link></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>