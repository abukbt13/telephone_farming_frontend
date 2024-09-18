<script setup>

import Header from "@/components/includes/Header.vue";

</script>

<template>
<Header />
  <div class="d-block d-lg-none d-md-none">
    <div class=" p-2"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
      <div style="width: 1.4rem" class="border border-black m-1"></div>
      <div style="width: 1.4rem" class="border border-black  m-1"></div>
      <div style="width: 1.4rem" class="border border-black  m-1"></div>
    </div>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Dashboard</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div data-bs-dismiss="offcanvas" class="sidebar">
          <router-link to="/lrc" class="text-decoration-none"> <h5 class="fs-2"><i class="bi bi-house"></i>Home</h5></router-link>
          <h2>Education <i class="bi bi-mortarboard"></i>
          </h2>
          <router-link class="text-decoration-none fs-4 text-dark" to="/lrc/documents" ><div class="">
            <i style="color:red; font-size: 30px" class="bi bi-file-earmark-word"></i>
            Documents</div></router-link>
          <router-link class="text-decoration-none fs-4 text-dark" to="/lrc/training">
            <div class=""><i style="color:red; font-size: 30px"  class="bi bi-calendar-check"></i>
              Trainings</div>
          </router-link>
          <router-link  class="text-decoration-none fs-4 text-dark" to="/lrc/youtube">
            <div class=""><i style="color:red; font-size: 30px"  class="bi bi-youtube"></i>
              Videos</div>
          </router-link>

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
    </div>

  </div>
    <div class="row">
        <div class="col d-none d-md-block col-3 border-end">
          <h2 class="text-uppercase p-1">Dashboard</h2>
          <div class="ms-4 sidebar">
             <router-link to="/lrc" class="text-decoration-none"> <h5 class="fs-2"><i class="bi bi-house"></i>Home</h5></router-link>
              <h2>Education <i class="bi bi-mortarboard"></i>
              </h2>
              <router-link class="text-decoration-none fs-4 text-dark" to="/lrc/documents" ><div class="">
                <i style="color:red; font-size: 30px" class="bi bi-file-earmark-word"></i>
                Documents</div></router-link>
              <router-link class="text-decoration-none fs-4 text-dark" to="/lrc/training">
                <div class=""><i style="color:red; font-size: 30px"  class="bi bi-calendar-check"></i>
                  Trainings</div>
              </router-link>
              <router-link class="text-decoration-none fs-4 text-dark" to="/lrc/youtube">
                <div class=""><i style="color:red; font-size: 30px"  class="bi bi-youtube"></i>
                  Videos</div>
              </router-link>



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
        <div class="col col-sm-12 col-md-9  col-lg-9 mt-1">
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

</style>