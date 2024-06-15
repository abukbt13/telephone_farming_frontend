
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
  <nav style="background-color: #d538fc;" class="navbar sticky-top navbar-expand-lg">
    <div class="container-fluid m-auto">
      <router-link class="navbar-brand text-white" to="/">Eagles</router-link>
      <i style="font-size: 25px" class="d-block d-md-block d-lg-none bi-list"  data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      </i>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/">Home</router-link>
          </li>
          <li class="nav-item  text-primary">
            <router-link class="nav-link active  text-white text-uppercase" to="/media">Media</router-link>
          </li>
          <div class="d-flex" v-if="currentUser.name">
            <div  class="" v-if="currentUser.role === 'telephone_farmer'">
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/admin/admin">1Dashboard</router-link>
              </li>
            </div>
            <div  class="" v-else>
              <li class="nav-item text-uppercase">
                <router-link class="nav-link text-white" to="/user/dashboard">Dashboard</router-link>
              </li>
            </div>



            <li class="nav-item text-uppercase"  @click="showProfile = showProfile === false ? true : false">
              <img width="50" v-if="!currentUser.picture" style="border-radius: 50%;" height="50"  :src="storage + 'media/'+currentUser.profile"  alt="">
              <img width="50" v-else  style="border-radius: 50%;" height="50"  src="/user.png"  alt="">
            Profile
            </li>

          </div>

          <div class="d-flex flex-column flex-md-row flex-lg-row" v-else>
            <li class="nav-item  text-uppercase">
              <router-link to="/auth/login" class="m-2 text-decoration-none text-white">LOGIN <i style="font-size: 22px;color:black;" @click="LogOut()" class="bi pt-2 bi-box-arrow-in-right"></i></router-link>
            </li>
            <li class="nav-item  text-uppercase">
              <router-link to="/auth/register" class="mx-2 text-decoration-none text-white">Get Started <i style="font-size: 22px;color:blue;" class="bi pt-4 bi-pen-fill"></i></router-link>
            </li>
          </div>



          <div  :class="showProfile ? '':'d-none'"    class="showProfile d-flex justify-content-center align-items-center m-2 border p-4">
            <div class="profile">
              <div class="d-flex justify-content-center">
                <img  v-if="currentUser.profile" style="border-radius: 50%;" width="50"  height="50" :src="storage + 'media/' + currentUser.profile"   alt="">
                <img v-else style="border-radius: 50%;" width="50"  height="50" src="/user.png"   alt="No image">
              </div>
              <p class="text-center text-uppercase"> {{currentUser.first_name}} {{currentUser.last_name}}</p>
              <div class="d-flex btn border">
                <button style="background-color: yellow;" class="button btn btn-sm">Active</button>
                <button class="button btn btn-sm btn-light">In active</button>
              </div>
              <router-link to="/user/profile" style="font-size: 23px;" class="text-decoration-none"><i style="font-size: 22px" class="bi bi-gear"> </i>Settings</router-link>

              <br>
              <i style="font-size: 22px" @click="LogOut()" class="bi bi-box-arrow-left">  Logout</i>
            </div>
          </div>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.showProfile{
  border-radius: 8px;
  background-color: ghostwhite;
  position: absolute;
  right: 2rem;
  top: 2rem;
  height: 18rem;
  width: 14rem;
}
.profile{
  height: 13rem;
  width: 10rem
}
li:hover{
  background: rgb(146, 159, 222);
  color: white;
  cursor: progress;
}
</style>