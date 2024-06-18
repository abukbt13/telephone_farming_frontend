<script setup>
import Swal from "sweetalert2";

import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {auth} from "@/compossables/auth.js";
import {onMounted, ref} from "vue";

const {base_url,authHeader} = auth()
const location = ref('')
const farm_name = ref('')
const type_of_farming = ref('')
const status = ref('')
const farms = ref([])
const Addfarm = async () => {
  const formData = new FormData();
  formData.append('farm_name', farm_name.value);
  formData.append('type_of_farming', type_of_farming.value);
  formData.append('location', location.value);

  const res = await axios.post(base_url.value + 'tf/farm', formData,authHeader);

  if (res.data.status === 'success') {
    await  Swal.fire(
        'Success!',
        'Profile updated successfully',
        'success'
    )
    await getFarms()
  }
}

const  getFarms = async () => {
  const res = await axios.get(base_url.value + 'tf/farm', authHeader)
  if(res){
    farms.value = res.data.data
  }

}
onMounted(()=>{
  getFarms()
})

</script>

<template>


      <table class="table table-bordered">
        <thead>
        <tr>
          <th colspan="5">
            <h2>My Farms
            <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Farm</button>
            </h2>
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>Farm Name</th>
          <th>Type of farm</th>
          <th colspan="2">Operation</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="farm in farms" :key="farm">
          <td class="border">{{farm.id}}</td>
          <td class="border">{{farm.farm_name}}</td>
          <td class="border">{{farm.type_of_farming}}</td>
          <td><button class=" mx-2 btn btn-primary">View more</button>
            <button class="btn btn-danger">Delete</button></td>
        </tr>
        </tbody>
      </table>


    <!--    modals-->



    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="Addfarm">
              <div class="mb-3">
                <label class="form-label">Farm name</label>
                <input type="text" v-model="farm_name" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Type Of farm</label>
                <input type="email" v-model="type_of_farming" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <input type="email" v-model="location" class="form-control" >
              </div>
              <button type="submit"  data-bs-dismiss="modal" class="btn btn-primary">Add Farm</button>
            </form>
          </div>

        </div>
      </div>
    </div>

</template>

<style scoped>

</style>