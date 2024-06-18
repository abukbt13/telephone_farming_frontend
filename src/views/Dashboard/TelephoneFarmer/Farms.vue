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

// Set the id to the route parameter id
id.value = route.params.id;

const  getFarm = async () => {
  const res = await axios.get(base_url.value + 'tf/farm/'+id.value, authHeader)
  if(res){
    farm.value = res.data.farm[0]
    farm_progress.value = res.data.farm_progress
  }
}
onMounted(()=> {
  getFarm()
})
</script>

<template>
  <div class="row p-4 m-2">
      <div class="col col-sm-12 col-md-6 col-lg-6">
        <div class="border ">
          <h2>Farm Details</h2>
          <p>Farm Name: <span>{{farm.farm_name}}</span></p>
          <p>Location: <span>{{farm.location}}</span></p>
          <h2>Farm Manager</h2>
          <p>Name: <span>{{farm.name}}</span></p>
          <p>Email : <span>{{farm.email}}</span></p>
          <p>Phone : <span>{{farm.phone}}</span></p>
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
            <th>Type of farm</th>
            <th>Picture</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="farm in farm_progress" :key="farm">
            <td class="border">{{farm.id}}</td>
            <td class="border">{{farm.description}}</td>
            <td class="border">{{farm.type}}</td>
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
