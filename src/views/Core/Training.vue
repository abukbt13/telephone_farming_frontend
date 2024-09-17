<script setup>

import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import {useRoute, useRouter} from "vue-router";

const schedules = ref([]);
const route = useRoute()
const router = useRouter()
const {base_url,storage,authHeader} = auth()
const  getSchedule= async () => {
  const res = await axios.get(base_url.value + 'v1/schedule', authHeader)
  if(res){
    schedules.value = res.data.schedules
  }
}

function  goBack() {
  router.back();
}

onMounted(()=> {
  getSchedule()
})
</script>

<template>
  <Header />
  <i @click="goBack"
     style="opacity: 1; z-index: 1; font-size: 44px; font-weight: 900; position: absolute; left: 1rem; top: 2rem;
          color: #0d0dcf; background: transparent;"
     class="bi bi-arrow-left">
  </i>
  <div class="m-2 schedule grid-container" >
    <div class="card grid-item" v-for="schedule in schedules" :key="schedule">
      <div class="card-body">
        <div class="">
          <h2 class="">Title</h2>
          <p>{{schedule.title}}</p>
          <h5 class="d-flex justify-content-between">Description
          </h5>
          <p class="card-text">
            {{schedule.description}}
          </p>
        </div>

        <router-link  :to="'/training/'+schedule.id" class="btn-link text-decoration-none">More details</router-link>

      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-link{
  text-decoration: none;
  padding: 7px;
  background: slateblue;
  color: white;
  text-align: center;
  text-transform: uppercase;
  display: block;
  float: right;
  transition: 0.4s ease-in-out;
}
.btn-link:hover{
  color: white;
  transform: translateX(-30%);
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  gap: 1rem;
}

.grid-item {
  min-width:22vw;
  background-color: #f3f3f3;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width: 600px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>