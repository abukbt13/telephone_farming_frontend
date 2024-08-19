<script setup>
import Header from '@/components/includes/Header.vue'
import Footer from '@/components/includes/Footer.vue'
</script>

<template>
  <Header />
  <div class="main">
    <div style="height: 400px;" class="row mx-3 intro my-2 py-2">
      <div class="col d-flex justify-content-center align-items-center col-md-6 col-lg-6">
        <div class="">
          <h1>Latia Resource company</h1>
          <p>Your Loving Farming Partner revolutionizes agriculture with sustainable and innovative solutions, partnering with local farmers to nurture high-quality crops and foster a community of growth and prosperity.r</p>
          <router-link to="/auth/register" style="background-color: #3f1be0;font-size: 23px;color: white;" class="btn">
            Get started
            <i style="font-size: 23px;color: blue;" class="bi bi-plug"></i>
          </router-link>
        </div>
      </div>
      <div style="background-image: url('img.png'); background-size: cover;" class="col d-none d-lg-block d-lg-block">
<!--        <img class="img-fluid" src="/pic.jpg" width="300"  height="300" alt="">-->
      </div>
    </div>
      
      <div class="">
        <h2 class="text-center text-primary">
          What Farmers say about us
        </h2>
        <div class="px-3">

          <div class="d-flex justify-content-around my-4 farmers">
            <div class="m-2">
              <div class="card" style="width: 18rem;">
                <img src="/home3.jpeg" height="300" width="360"  class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">
                    <h3>Alex Juma</h3>
                    I do really like LRC for their support I could not  have done much like this during this harvest season.
                  </p>
                </div>
              </div>
            </div>
            <div class="m-2">
            <div class="card" style="width: 18rem;">
              <img src="/cabagefarm.jpeg" height="300" width="360"  class="card-img-top" alt="...">
              <div class="card-body">
                <h3>Immaculate Daisy</h3>
                <p class="card-text">
                  LRC has been a game-changer for my farming. Their innovative solutions have made managing my crops easier and more productive than ever.
                  I couldn't be more satisfied with the results!                </p>
              </div>
            </div>
          </div>  <div class="m-2">
            <div class="card" style="width: 18rem;">
              <img src="/img_4.png" height="300" width="360"  class="card-img-top" alt="...">
              <div class="card-body">
                <h3>Freemano Kibet</h3>
                <p class="card-text">
                  I’m incredibly grateful to LRC for revolutionizing my farming experience. Their tools and support have significantly boosted my crop yields, making the entire process smoother and more efficient.
                  Highly recommended for any farmer looking to elevate their operations                </p>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>

    </div>
  <Footer />

</template>

<style scoped>
.farmers{
  min-width: 100vw;
  max-width: 100vw;
  overflow: scroll;

}
</style>