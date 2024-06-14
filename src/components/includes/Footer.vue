<script setup xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div style="background-color: #e9eef2;" class="row py-4 footer px-4 d-flex justify-content-center ">
    <div class="col  col-12  col-sm-2 mt-2 mx-2">
      <h4 class="text-uppercase text-decoration-underline">Eagles Savings</h4>
      <p>Eagles your financial loving partner in all your savings and investments </p>
      <p>Trusted by 13 members worldwide</p>
    </div>
    <div class="col col-12 col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-decoration-underline">Quick Links</h4>
      <li  class="list-unstyled fs-4">
        <router-link  class="text-decoration-none  link"  to="/auth/login">Login</router-link>
      </li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/user/profile">Profile</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/d/user">Dashboard</router-link></li>
    </div>

    <div class="col col-12  col col-sm-3 mt-2">
      <h4 class="text-uppercase text-decoration-underline">Services</h4>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/user/savings">Savings</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/user/loans">Loans</router-link></li>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/">Investments</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/user/transaction">Petty cash</router-link></li>

    </div>
    <div class="col  col-12  col col-sm-3 mt-2 mx-2">
      <h4  class="text-uppercase text-decoration-underline">More</h4>
      <li class="list-unstyled  fs-4"><router-link class="text-decoration-none link" to="/stories">Success stories</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/media">Media</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/sponsors">Sponsors</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/business">Business</router-link></li>
      <h4 class="m-2 text-decoration-underline">Other</h4>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/faqs">FAQS</router-link></li>
      <li class="list-unstyled fs-4"><router-link class="text-decoration-none link" to="/docs">Docs</router-link></li>

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