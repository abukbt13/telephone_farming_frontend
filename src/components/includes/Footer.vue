<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: green;" class="row py-4 footer px-4 d-flex justify-content-center ">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h4 class="text-uppercase ">LRC company </h4>
      <p style="color: black" class="">Latia Resource company your farming partner </p>
    </div>
    <div class="col col-12 col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase ">Quick Links</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Login</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Register</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Profile</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Dashboard</router-link>
      </li>
    </div>

    <div class="col col-12  col col-sm-3 mt-2">
      <h4 class="text-uppercase ">Services</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Training </router-link>
        <router-link  class="text-decoration-none  link"  to="/auth/login">Education</router-link>
      </li>
    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase ">More</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">About US </router-link>
        <router-link  class="text-decoration-none  link"  to="/auth/login">About US </router-link>
        <router-link  class="text-decoration-none  link"  to="/auth/login">About US </router-link>
        <router-link  class="text-decoration-none  link"  to="/auth/login">latest</router-link>
      </li>

    </div>
  </div>
</template>

<style scoped>


.link{
  padding-right:5rem;
  color:black;
}
.link:hover{
  background-color: lightskyblue;
}
</style>