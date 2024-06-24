<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {auth} from "@/compossables/auth.js";

const {base_url,authHeader,storage} = auth()
// Initialize route and reactive variable
const route = useRoute();
const id = ref('');
const farm = ref('');

const farm_progress = ref([]);
const farm_managers = ref([]);

// Set the id to the route parameter id
id.value = route.params.id;

const  getFarm = async () => {
  const res = await axios.get(base_url.value + 'tf/farm/'+id.value, authHeader)
  if(res){
    farm.value = res.data.farm
    farm_managers.value = res.data.farm_managers
    farm_progress.value = res.data.farm_progress
  }
}
onMounted(()=> {
  getFarm()
})
</script>

<template>
<!--  {{farm}}-->
<!--  <p>mhb</p>-->
<!--  {{farm_managers}}-->
  <div class="row p-4 m-2">
      <div class="col col-sm-12 col-md-6 col-lg-6">
        <div class="border p-4">
          <h2>Farm Details</h2>
          <p>Farm Name: <span>{{farm.farm_name}}</span></p>
          <p>Location: <span>{{farm.location}}</span></p>




          <div v-if="farm_managers.length ===0"  class="bg-danger">
            <p>No farm manager</p>
          </div>
          <div v-else-if="farm_managers.length ===1" class="p-3 ">
            <h2>Farm Manager</h2>
            <div class=" border" v-for="farm_manager in farm_managers" :key="farm_manager">
              <p class="fs-2">Name: <span class="text-primary">{{farm_manager.name}}</span></p>
              <p class="fs-2">Email: <span class="text-primary">{{farm_manager.email}}</span></p>
              <p class="fs-2">Phone Number: <span class="text-primary">{{farm_manager.phone}}</span></p>
            </div>
          </div>
          <div v-else class="">
            <h2>Farm Managers</h2>
            <div class=" border" v-for="farm_manager in farm_managers" :key="farm_manager">
              <p class="fs-2">Name: <span class="text-primary">{{farm_manager.name}}</span></p>
              <p class="fs-2">Email: <span class="text-primary">{{farm_manager.email}}</span></p>
              <p class="fs-2">Phone Number: <span class="text-primary">{{farm_manager.phone}}</span></p>

            </div>
          </div>

        </div>
      </div>


      <div class="col col-sm-12 col-md-6 col-lg-6">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>
                Farms Progress
              </h2>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>description</th>
            <th>activity name</th>
            <th>Picture</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="farm in farm_progress" :key="farm">
            <td class="border">{{farm.id}}</td>
            <td class="border">{{farm.description}}</td>
            <td class="border">{{farm.activity_name}}</td>
            <td>
              <img :src="storage +'Farm/Photos/' + farm.photos" class="card-img-top" alt="">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
