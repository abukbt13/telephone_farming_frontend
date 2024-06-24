<script setup>
import Header from '@/components/includes/Header.vue'
import Footer from '@/components/includes/Footer.vue'
</script>

<template>
  <Header />
  <div class="main container">
    <div class="row intro my-2 py-2">
      <div class="col d-flex justify-content-center align-items-center col-md-6 col-lg-6">
        <div class="">
          <h1>Latvia Resource company</h1>
          <p>Your loving farming partner</p>
          <router-link to="/auth/register" style="background-color: #3f1be0;font-size: 23px;color: white;" class="btn">Get started<i style="font-size: 23px;color: blue;" class="bi bi-plug"></i></router-link>
        </div>
      </div>
      <div class="col d-none d-md-block col-md-6 col-lg-6">
        <div class="d-flex justify-content-center align-items-center">
          <img src="/home3.jpeg" height="300" width="360" alt="Connect Image">
        </div>
      </div>

    </div>
  </div>

  <div class="row d-flex justify-content-around align-items-center">
    <div class="col col-sm-12 col-md-4 co-lg-4">
      <div class="card w-100"   style="w-100">
        <img src="/img_4.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Johnson Kibet</h5>
          <p class="card-text">
            Thanks LRC your advices and the guide i found from you made my work to be more perfect long life LRC
             </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <div class="col col-sm-12 col-md-4 co-lg-4">
      <div class="card w-100"   style="w-100">
        <img src="/img_3.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Abraham Kibet</h5>
          <p class="card-text">
              I do really like LRC for their support I could have done much this
              </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.home-image{
  height: 70vh;
}
</style>