<script setup>

import YoutubeModal from "@/views/Dashboard/LRC/Modals/YoutubeModal.vue";
import DocumentModal from "@/views/Dashboard/LRC/Modals/DocumentModal.vue";
import ScheduleModal from "@/views/Dashboard/LRC/Modals/ScheduleModal.vue";

function feedback(e){
  alert(e)
}
</script>

<template>
  <YoutubeModal @response="feedback"/>
  <DocumentModal />
  <ScheduleModal />
  <div class="d-flex">
    <div style="height: 13rem; width: 20rem" class="border p-4">
      <h2>Education resources</h2>
      <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#uploaddocument">Upload document</button>
      <router-link to="/lrc/documents" class="btn btn-primary">View</router-link>
    </div>
    <div style="height: 13rem; width: 20rem"  class="border p-4">
      <h2>Trainings</h2>
      <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#training">Schedule Training</button>
      <router-link to="/lrc/training" class="btn btn-primary">View</router-link>
    </div>
    <div style="height: 13rem; width: 20rem"  class="border p-4">
      <h2>Youtube</h2>
      <button class="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#youtube">Add Youtube</button>
      <router-link to="/lrc/youtube" class="btn btn-primary">View</router-link>
    </div>
  </div>

</template>

<style scoped>

</style>