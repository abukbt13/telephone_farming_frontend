<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

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

  <table class="table table-bordered">
    <thead>
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
      <td><button class="btn btn-primary">View</button></td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>