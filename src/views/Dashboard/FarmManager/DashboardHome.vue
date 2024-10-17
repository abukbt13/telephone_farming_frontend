<script setup>

import Header from "@/components/includes/Header.vue";



</script>

<template>
  <div class="">
    <Header />
  </div>
<div class="row">
    <div style="height: 100vh;background: #ddd;" class="col  col-3">
      <div   class="sidebar d-none d-md-block d-lg-block ps-2">
        <h2 class="text-uppercase">Dashboard</h2>
        <router-link  class="text-decoration-none link" to="/farm_manager"><li  class="fs-3 list-unstyled border-bottom ps-3">Home</li></router-link>
        <router-link  class="text-decoration-none link" to="/education"><li  class="fs-3 list-unstyled border-bottom ps-3">Education</li></router-link>
        <router-link  class="text-decoration-none link" to="/training"><li  class="fs-3 list-unstyled border-bottom ps-3">Trainingt</li></router-link>
        <router-link  class="text-decoration-none link" to="/youtube/videos"><li  class="fs-3 list-unstyled border-bottom ps-3">Videos</li></router-link>
        <router-link  class="text-decoration-none link" to="/network"><li  class="fs-3 list-unstyled border-bottom ps-3">Networking</li></router-link>
      </div>
    </div>
    <div class="col col-9">
      <router-view />
    </div>
</div>

</template>

<style scoped>

</style>