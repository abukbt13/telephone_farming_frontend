<script setup>

import Header from "@/components/includes/Header.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import FarmManager from "@/components/dashboard/FarmManager.vue";
import TelephoneFarmer from "@/components/dashboard/TelephoneFarmer.vue";
import LRC from "@/components/dashboard/LRC.vue";
import TelephoneFarmerHome from "@/views/Dashboard/TelephoneFarmer/TelephoneFarmerHome.vue";
import {useInactivityLogout} from "@/compossables/useInactivityLogout.js";
const {authUser,AuthenticatedUser,currentUser,} = auth()
// const {resetTimer,advertise} = useInactivityLogout
const showSidebar = ref(false);
onMounted(()=>{
  authUser()
  AuthenticatedUser()
})
</script>
<template>
<!--  {{advertise}}-->
  <Header />
  <div style="" class="d-block bg-light d-md-none d-lg-none d-flex align-items-center flex-row justify-content-between py-1">
    <div class="">
      <i data-bs-toggle="offcanvas" data-bs-target="#sidebar" style="font-size: 26px;" class="bi-list"></i></div><div class="me-2">
        This is Mobile View
    </div>
  </div>

      <div class="main">
        <TelephoneFarmer />
          <div class="main-content">
          <RouterView />
          </div>
      </div>

</template>

<style scoped>
.main{
  display: flex;
}

.main-content{
  margin-top:0;
  padding:0;
  width: 80vw;
  min-height:70vh;
  max-height:87vh;
  overflow:scroll;
}

@media (min-width: 300px) and (max-width: 800px) {
  .main-content{
    width: 100vw;
  }
}
</style>