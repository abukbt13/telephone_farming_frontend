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
const email = ref('')
const name = ref('')
const phone = ref('')
const farm_id = ref('')


const status = ref('')
const farms = ref([])
const managers = ref([])
const Addfarm = async () => {
  const formData = new FormData();
  formData.append('farm_name', farm_name.value);
  formData.append('type_of_farming', type_of_farming.value);
  formData.append('location', location.value);

  const res = await axios.post(base_url.value + 'tf/farm', formData,authHeader);

  if (res.data.status === 'success') {
    await  Swal.fire(
        'Success!',
        'Farm created Successfully',
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
const createManager = async () => {
  const formData = new FormData();
  formData.append('email', email.value);
  formData.append('phone', phone.value);
  formData.append('name', name.value);
  formData.append('farm_id', farm_id.value);

  const res = await axios.post(base_url.value + 'tf/manager', formData,authHeader);

  if (res.data.status === 'success') {
    await  Swal.fire(
        'Success!',
        'Farm Manager created Successfully',
        'success'
    )
    await getFarmManagers()
  }
}

const  getFarmManagers= async () => {
  const res = await axios.get(base_url.value + 'tf/manager', authHeader)
  if(res){
    managers.value = res.data.data
  }

}
onMounted(()=>{
  getFarms()
  getFarmManagers()
})

</script>

<template>
  <div class="row m-1">
    <div class="col col-sm-12  col-md-6 col-lg-6">
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
          <td>
            <router-link to="/telephone_farmer/farm" class=" mx-2 btn btn-primary">Visit Farm</router-link>
            <button class="btn btn-danger">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col col-sm-12 col-md-6 col-lg-6">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th colspan="5">
            <h2>Farm managers
              <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addFarmManager">Add Manager</button>
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
        <tr v-for="manager in managers" :key="manager">
          <td class="border">{{manager.id}}</td>
          <td class="border">{{manager.name}}</td>
          <td class="border">{{manager.email}}</td>
          <td class="border">{{manager.phone}}</td>
          <td>
            <button class="btn mx-1 btn-danger">View</button>

            <button class="btn btn-danger">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Farm</h1>
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
                <select required v-model="type_of_farming" class="form-control" name="">
                  <option>--Select type of farm--</option>
                  <option value="emergency">Livestock</option>
                  <option value="short_term">Crop Farming</option>
                  <option value="long_term">Chicken Keeping</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <input type="text" v-model="location" class="form-control" >
              </div>
              <button type="submit"  data-bs-dismiss="modal" class="btn btn-primary">Add Farm</button>
            </form>
          </div>

        </div>
      </div>
    </div>

  <div class="modal fade" id="addFarmManager" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Farm Manager</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createManager">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" v-model="name" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="text" v-model="email" class="form-control">
              </div>

              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input type="text" v-model="phone" class="form-control">
              </div>
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <input type="text" v-model="name" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <input type="text" v-model="location" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Farm To Manage</label>
                <select v-model="farm_id" class="form-control" required>
                  <option disabled value="">Select farm</option>
                  <option v-for="farm in farms" :key="farm.id" :value="farm.id">{{ farm.farm_name }}</option>
                </select>


              </div>
              <button type="submit"  data-bs-dismiss="modal" class="btn btn-primary">Create Manager</button>
            </form>
          </div>

        </div>
      </div>
    </div>

</template>

<style scoped>

</style>