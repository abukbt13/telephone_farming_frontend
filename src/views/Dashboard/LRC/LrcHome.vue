<script setup>

import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {auth} from "@/compossables/auth.js";


</script>

<template>
<Header />
    <div class="row">
        <div class="col col-3 border-end">
          <div class="p-2">
            <h2>Dashboard</h2>
            <span>Education</span>
            <ul class="list-unstyled ps-2">
              <router-link class="text-decoration-none " to="/document" ><li>Documents</li></router-link>
              <router-link class="text-decoration-none" to="/training" ><li>Trainings</li></router-link>
              <router-link class="text-decoration-none" to="/workshops" ><li>Workshops</li></router-link>
            </ul>

            <span>Market</span>
            <ul class="list-unstyled ps-2">
              <router-link class="text-decoration-none" to="/market" ><li>Markets</li></router-link>
              <router-link class="text-decoration-none" to="/agrovet" ><li>Agrovets</li></router-link>
            </ul>
            <span>Support</span>
            <ul class="list-unstyled ps-2">
              <router-link class="text-decoration-none" to="/transport" ><li>Transport</li></router-link>
              <router-link class="text-decoration-none" to="/irrigation" ><li>Irrigation</li></router-link>
              <router-link class="text-decoration-none" to="/trainees" ><li>Trainees</li></router-link>
            </ul>
            <span>Settings</span>
            <ul class="list-unstyled ps-2">
              <router-link class="text-decoration-none" to="/registration" ><li>Registraton </li></router-link>
              <router-link class="text-decoration-none" to="/subscription" ><li>Subscription</li></router-link>
              <router-link class="text-decoration-none" to="/payment" ><li>Payments</li></router-link>
            </ul>

          </div>
        </div>
        <div class="col col-9 mt-2">
          <RouterView />
        </div>
    </div>



</template>

<style scoped>


ul {
  pst-style: none;
}
li{
  color: #333;
  font-size: 1.2rem;
}
router-link{
  background-color: yellow;
}
.sidebar span {
  font-size: 25px; color: black
}
</style>