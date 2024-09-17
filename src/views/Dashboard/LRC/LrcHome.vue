<script setup>

import Header from "@/components/includes/Header.vue";

</script>

<template>
<Header />
    <div class="row">
        <div class="col col-3 border-end">
          <div class="ms-4 ps-4 sidebar">
            <h1 class="">Dashboard</h1>
             <router-link to="/lrc" class="text-decoration-none"> <h5 class="ps-2"><i class="bi bi-house"></i>Home</h5></router-link>
            <ul class="list-unstyled ps-2">
              <h5>Education</h5>
              <router-link class="text-decoration-none " to="/lrc/documents" ><li>Documents</li></router-link>
              <router-link class="text-decoration-none" to="/lrc/training" ><li>Trainings</li></router-link>
              <router-link class="text-decoration-none" to="/lrc/youtube" ><li>Youtube</li></router-link>
            </ul>


            <ul class="list-unstyled ps-2">
              <h5>Market</h5>
              <router-link class="text-decoration-none" to="/market" ><li>Markets</li></router-link>
              <router-link class="text-decoration-none" to="/agrovet" ><li>Agrovets</li></router-link>
            </ul>

            <ul class="list-unstyled ps-2">
              <h5>Support</h5>
              <router-link class="text-decoration-none" to="/transport" ><li>Transport</li></router-link>
              <router-link class="text-decoration-none" to="/irrigation" ><li>Irrigation</li></router-link>
              <router-link class="text-decoration-none" to="/trainees" ><li>Trainees</li></router-link>
            </ul>

            <ul class="list-unstyled ps-2">
              <h5>Settings</h5>
              <router-link class="text-decoration-none" to="/registration" ><li>Registraton </li></router-link>
              <router-link class="text-decoration-none" to="/subscription" ><li>Subscription</li></router-link>
              <router-link class="text-decoration-none" to="/payment" ><li>Payments</li></router-link>
            </ul>

            <ul class="list-unstyled ps-2">
              <h5>Media</h5>
              <router-link class="text-decoration-none " to="/network" ><li>Networking</li></router-link>
            </ul>

          </div>
        </div>
        <div class="col col-9 mt-2">
          <RouterView />
        </div>
    </div>



</template>

<style scoped>
.sidebar li{
  color: #333;
  font-size: 1.2rem;
}
router-link{
  background-color: yellow;
}
.sidebar{
  min-height: 80vh;
  max-height: 90vh;
  overflow: scroll;
}
.sidebar ul li{
  padding: 0.2rem 1rem;

  font-size: 20px;
}
.sidebar ul li:hover{
  background-color: green;
  color: white;
}
</style>