<script setup>

import Header from "@/components/includes/Header.vue";



</script>

<template>
  <Header />
<div class="row">
    <div style="height: 100vh;background: #ddd;" class="col ms-2  col-3">
      <h2>Dashboard</h2>
      <ul class="list-unstyled">
        <li class="text-uppercase" data-bs-toggle="modal" data-bs-target="#progress">Add progress</li>
      </ul>
    </div>
    <div class="col col-8">
      <router-view />
    </div>
</div>

</template>

<style scoped>

</style>