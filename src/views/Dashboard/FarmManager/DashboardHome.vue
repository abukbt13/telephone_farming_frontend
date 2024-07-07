<script setup>

import Header from "@/components/includes/Header.vue";



</script>

<template>
  <Header />
<div class="row">
    <div style="height: 100vh;background: #ddd;" class="col ms-2  col-3">
      <div   class="sidebar d-none d-md-block d-lg-block ps-2">
        <h2 class="text-uppercase">Dashboard</h2>
        <router-link  class="text-decoration-none link" to="/network"><li  class="fs-3 list-unstyled border-bottom ps-3">Networking</li></router-link>
      </div>
    </div>
    <div class="col col-8">
      <router-view />
    </div>
</div>

</template>

<style scoped>

</style>