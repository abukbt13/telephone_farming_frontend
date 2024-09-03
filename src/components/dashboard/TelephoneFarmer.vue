<script setup>

</script>

<template>

  <div   class="sidebar d-none d-md-block d-lg-block ps-2">
    <p class="text-uppercase fs-4 ms-3">Dashboard</p>
    <router-link  class="text-decoration-none link" to="/telephone_farmer/dashboard"><li  class="fs-3 list-unstyled border-bottom ps-3">Home</li></router-link>
    <router-link  class="text-decoration-none link" to="/network"><li  class="fs-3 list-unstyled border-bottom ps-3">Networking</li></router-link>
    <router-link  class="text-decoration-none link" to="/education"><li  class="fs-3 list-unstyled border-bottom ps-3">Education Resource</li></router-link>
    <router-link  class="text-decoration-none link" to="/training"><li  class="fs-3 list-unstyled border-bottom ps-3">Training</li></router-link>
    <router-link  class="text-decoration-none link" to="/youtube"><li  class="fs-3 list-unstyled border-bottom ps-3">Videos</li></router-link>
 </div>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Quick links</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <router-link  class="text-decoration-none link" to="/telephone_farmer/dashboard"><li  class="fs-3 list-unstyled border-bottom ps-3">Home</li></router-link>
      <router-link  class="text-decoration-none link" to="/network"><li  class="fs-3 list-unstyled border-bottom ps-3">Networking</li></router-link>
      <router-link  class="text-decoration-none link" to="/education"><li  class="fs-3 list-unstyled border-bottom ps-3">Education Resource</li></router-link>
      <router-link  class="text-decoration-none link" to="/training"><li  class="fs-3 list-unstyled border-bottom ps-3">Training</li></router-link>
      <router-link  class="text-decoration-none link" to="/youtube"><li  class="fs-3 list-unstyled border-bottom ps-3">Videos</li></router-link>
    </div>
  </div>

</template>

<style scoped>

.sidebar{
  border-top: 1px solid grey;
  width: 20vw;
  height: 87vh;
}
li:hover{
  background-color: red;
}
</style>