
<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import axios from "axios";
import {useRouter} from "vue-router";
const showProfile = ref(false)
const {AuthenticatedUser, currentUser,base_url,storage} = auth()
const first_name = ref('')
const router = useRouter()
function LogOut(){
  localStorage.removeItem('token')
  router.push('/auth/login/');
}
onMounted(()=>{
  AuthenticatedUser()
})

</script>

<template>
  <nav  style="height: 3rem;" class="navbar  bg-secondary  sticky-top navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand " to="/">Telefarming</router-link>
      <i style="font-size: 25px" class="d-block  d-md-block d-lg-none bi-list"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      </i>
      <div  class="collapse bg-secondary  navbar-collapse  justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/">Home</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/media">Media</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/youtube/videos">Youtube</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/about">About us</router-link>
          </li>
          <div class="d-flex" v-if="currentUser.name">
                <div  class="" v-if="currentUser.role === 'telephone_farmer'">
                  <li class="nav-item text-uppercase">
                    <router-link class="nav-link text-white" to="/telephone_farmer/dashboard">Dashboard</router-link>
                  </li>
                </div>
                <div  class="" v-else-if="currentUser.role === 'farm_manager'">
                  <li   class="nav-item text-uppercase">
                    <router-link class="nav-link text-white"  to="/farm_manager">Dashboard</router-link>
                  </li>
                </div>
                <div  class="" v-else="currentUser.role === 'lrc'">
                  <li class="nav-item text-uppercase">
                    <router-link class="nav-link text-white" to="/lrc">Dashboard</router-link>
                  </li>
                </div>
    <!--            @click="LogOut()"-->
                <li    class="nav-item text-uppercase" >
                <router-link to="/auth/user"><img style="border-radius:50%; " src="/user.png" height="50" width="50" alt=""></router-link>
                </li>
            </div>

          <div v-else  class="">
            <li  class="nav-item text-primary">
              <router-link class="nav-link active  text-white text-uppercase" to="/auth/login">Login</router-link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
li:hover{
  background: rgb(146, 159, 222);
  color: white;
  cursor: progress;
}


</style>