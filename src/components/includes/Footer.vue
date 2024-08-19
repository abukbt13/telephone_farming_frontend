<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: green;" class="row py-4 footer px-4 d-flex justify-content-center ">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h4 class="text-uppercase text-white">LRC company </h4>
      <p style="color: black" class="">Latia Resource company your loving farming partner </p>
      <ul class="list-unstyled d-flex justify-content-around  fs-2 media">
       <li>
         <i class="bi bi-facebook"></i>
       </li>
        <li>
          <i class="bi bi-twitter"></i>
        </li>
        <li>
          <i class="bi bi-instagram"></i>
        </li>

      </ul>
    </div>
    <div class="col col-12 col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-white">Quick Links</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2  link"  to="/auth/login">Login</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/auth/register">Register</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/auth/user">Profile</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/dashboard">Dashboard</router-link>
      </li>
    </div>

    <div class="col col-12  col col-sm-3 mt-2">
      <h4 class="text-uppercase text-white ">Services</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/training">Training </router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/education">Education</router-link>
      </li>
    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-white">More</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  px-4 py-2 link"  to="/about-us">About US </router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/payment-terms">Payment</router-link>      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/partner">Donate</router-link>
      </li>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none px-4 py-2 link"  to="/parner">Partner </router-link>
      </li>

    </div>
  </div>
</template>

<style scoped>
li{
  margin: 1rem 0 1rem 0;
}

.link{
  padding-right:5rem;
  color:black;
}
.link:hover{
  background-color: lightskyblue;
}
.media li{
  transition: 0.3s;
}
.media li:hover {
  transform: translateY(-30px);
}

</style>