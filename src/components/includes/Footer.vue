<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: #e9eef2;" class="row py-4 footer px-4 d-flex justify-content-center ">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h4 class="text-uppercase text-decoration-underline">Latvia Resource company </h4>
      <p>Latvia Resource company your farming partner </p>
      <p>Trusted by 13 many members worldwide</p>
    </div>
    <div class="col col-12 col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-decoration-underline">Quick Links</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Login</router-link>
        <router-link  class="text-decoration-none  link"  to="/auth/register">Register</router-link>
      </li>
    </div>

    <div class="col col-12  col col-sm-3 mt-2">
      <h4 class="text-uppercase text-decoration-underline">Services</h4>

    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-decoration-underline">More</h4>

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