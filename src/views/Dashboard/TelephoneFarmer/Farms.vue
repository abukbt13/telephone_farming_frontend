<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
const router = useRouter()
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
function formatDate(dateString) {
  const date = new Date(dateString); // Convert string to Date object
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with 0
  const year = date.getFullYear(); // Get full year
  return `${day}-${month}-${year}`; // Return formatted date as dd-mm-yyyy
}
function  goBack() {
  router.back();
}
onMounted(()=> {
  getFarm()
})
</script>

<template>

  <button  @click="goBack" class="btn m-3 btn-primary"><i class="bi bi-arrow-left"></i>
    Go Back
  </button>


 <div class="table-responsive mx-4">

        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h3>
                Farms Progress
                <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Farm Details
                </button>
              </h3>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Picture</th>
            <th>activity name</th>
            <th>description</th>
            <th>date</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(farm,index) in farm_progress" :key="farm">
            <td class="border">{{index}}</td>
            <td class="text-center align-middle">
              <img :src="storage +'Farm/Photos/' + farm.photos" class="img img-fluid" alt="">
            </td>
            <td class="border text-center align-middle">{{farm.description}}</td>
            <td class="border text-center align-middle">{{farm.activity_name}}</td>
            <td class="border text-center align-middle">{{ formatDate(farm.date) }}</td>

          </tr>
          </tbody>
        </table>
      </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Farm details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="">
            <div class="border p-4">
              <div class="border m-1 p-2">
                <h3>Farm Details</h3>
                <p>Farm Name: <span>{{farm.farm_name}}</span></p>
                <p>Location: <span>{{farm.location}}</span></p>
              </div>

              <div v-if="farm_managers.length ===0"  class="bg-danger">
                <p>No farm manager</p>
              </div>
              <div v-else-if="farm_managers.length ===1" class="p-3 ">
                <h3>Farm Manager</h3>
                <div class=" border p-2" v-for="farm_manager in farm_managers" :key="farm_manager">
                  <h1 class="fs-2">Name: </h1>
                  <p class="text-primary fs-3">{{farm_manager.name}}</p>
                  <p class="fs-2">Email:</p>
                  <p class="text-primary fs-3">{{farm_manager.email}}</p>
                  <p class="fs-2">Phone Number:</p>
                  <p class="text-primary fs-3">{{farm_manager.phonee}}</p>
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
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Add your styles here */
</style>
