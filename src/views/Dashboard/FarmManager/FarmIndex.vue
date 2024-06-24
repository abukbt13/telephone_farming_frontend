<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

const {base_url,authHeader} = auth()
const farms = ref([])
const  getFarms = async () => {
  const res = await axios.get(base_url.value + 'fm/farm', authHeader)
  if(res){
    farms.value = res.data.data
  }

}

onMounted(()=>{
  getFarms()
})
</script>
<template>

  <h2>My Farms</h2>

  <div class="" v-for="farm in farms" :key="farm">

    <router-link class="text-decoration-none" :to="'/farm_manager/progress/'+farm.id">
      <div class="border p-4 w-25">
        <h2 class="text-dark">Farm</h2>
        <p class="fs-3">{{ farm.farm_name }}</p>
        <h3 class="text-dark">Location</h3>
        <p>{{ farm.location }}</p>
        <h4 class="text-dark">Type of Farm</h4>
        <p>{{ farm.type_of_farming }}</p>
      </div>
    </router-link>

  </div>
</template>

<style scoped>

</style>