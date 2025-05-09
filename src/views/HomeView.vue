<script setup>
import Header from '@/components/includes/Header.vue'
import Footer from '@/components/includes/Footer.vue'
</script>

<template>
  <Header />
  <div class="">
    <div style="height: 400px;" class="row mx-3 intro my-2 py-2">
      <div class="col d-flex justify-content-center align-items-center col-md-6 col-lg-6">
        <div class="">
          <h1>Telefarm Limited Company,<br> Your caring farming partner</h1>
          <p>Revolutionizes agricultural sector through automation in agriculture as users enjoy production at its maximization with our tailored technologies and innovative ways on agricultural production.r</p>
          <router-link to="/auth/register" style="background-color: #3f1be0;font-size: 23px;color: white;" class="btn">
            Get started
            <i style="font-size: 23px;color: blue;" class="bi bi-plug"></i>
          </router-link>
        </div>
      </div>
      <div style="background-image: url('img.png'); background-size: cover;" class="col d-none d-md-block d-lg-block">
      </div>
    </div>
      <div class="">
        <h2 class="text-center text-primary">
          Success stories
        </h2>
        <div class="px-3">
          <div  class="row">
            <div class="mt-2 col-sm-12 col-md-4 col-lg-4">
              <div class="card" style="">
                <img src="/home3.jpeg" height="300" width="360"  class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">
                    <h3>Alex Juma</h3>
                    I really love to work with the telefarm company, they provide the best designed agricultural inputs, It doesnt give a barrier to urban settlers.
                    I have a small kitchen garden and can highly produce using their areal production design, using limited space with multiple production points.
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-2 col-sm-12 col-md-4 col-lg-4">
            <div class="card" style="">
              <img src="/cabagefarm.jpeg" height="300" width="360"  class="card-img-top" alt="...">
              <div class="card-body">
                <h3>Immaculate Daisy</h3>
                <p class="card-text">
                  Telefarm company has been a game-changer for my farming. Their innovative solutions have made managing my crops easier and more productive than ever.                </p>
              </div>
            </div>
          </div>
            <div class="mt-2 col-sm-12 col-md-4 col-lg-4">
            <div class="card">
              <img src="/img_4.png" height="300" width="360"  class="card-img-top" alt="...">
              <div class="card-body">
                <h3>Freemano Kibet</h3>
                <p class="card-text">
                  I’m incredibly grateful to Telefarm for revolutionizing my farming experience. Their tools and support have significantly boosted my crop yields, making the entire process smoother and more efficient.
                  Highly recommended for any farmer looking to elevate their operations and enhance farm transparency remotely.                </p>
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

</style>
