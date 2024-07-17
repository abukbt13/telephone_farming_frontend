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
          <h1>Latia Resource company</h1>
          <p>Your Loving Farming Partner revolutionizes agriculture with sustainable and innovative solutions, partnering with local farmers to nurture high-quality crops and foster a community of growth and prosperity.r</p>
          <router-link to="/auth/register" style="background-color: #3f1be0;font-size: 23px;color: white;" class="btn">Get started<i style="font-size: 23px;color: blue;" class="bi bi-plug"></i></router-link>
        </div>
      </div>
      
      <div class="">
        <h2 class="text-center text-primary">
          What Farmers say about us
        </h2>

       <div class="d-flex farmers">
         <div class="m-2">
           <div class="card" style="width: 18rem;">
             <img src="/home3.jpeg" height="300" width="360"  class="card-img-top" alt="...">
             <div class="card-body">
               <p class="card-text">
                 I do really like LRC for their support I could have done much this
               </p>
             </div>
           </div>
         </div>
         <div class="m-2">
           <div class="card" style="width: 18rem;">
             <img src="/img_3.png"  height="300" width="360"  class="card-img-top" alt="...">
             <div class="card-body">
               <p class="card-text">
                 Thanks LRC your advices and the guide i found from you made my work to be more perfect long life LRC                </p>
             </div>
           </div>
         </div>
         <div class="m-2">
           <div class="card" style="width: 18rem;">
             <img src="/img_4.png" height="300" width="360"  class="card-img-top" alt="...">
             <div class="card-body">
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
             </div>
           </div>
         </div>  <div class="m-2">
           <div class="card" style="width: 18rem;">
             <img src="/img_4.png" height="300" width="360"  class="card-img-top" alt="...">
             <div class="card-body">
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
             </div>
           </div>
         </div>  <div class="m-2">
           <div class="card" style="width: 18rem;">
             <img src="/img_4.png" height="300" width="360"  class="card-img-top" alt="...">
             <div class="card-body">
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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