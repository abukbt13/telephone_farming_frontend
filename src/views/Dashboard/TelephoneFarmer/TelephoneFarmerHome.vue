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
const manager_id = ref('')
const user_id = ref('')


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

function getFarmID(id){
  farm_id.value = id
}

const AssignManagerToFarm = async () => {
  const formData = new FormData();
  formData.append('manager_id', manager_id.value);
  formData.append('farm_id', farm_id.value);

  const res = await axios.post(base_url.value + 'tf/farm/manager', formData,authHeader);

  if (res.data.status === 'success') {
    await  Swal.fire(
        'Success!',
        'Farm Manager assigned Successfully',
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
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>My Farms
                <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Farm</button>
              </h2>
            </th>
          </tr>
          <tr>
            <th>Farm Name</th>
            <th>Type of farm</th>
            <th colspan="3">Operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="farm in farms" :key="farm">
            <td class="border align-items-center">{{farm.id}}</td>
            <td class="border">{{farm.farm_name}}</td>
            <td class="border">{{farm.type_of_farming}}</td>
              <td>
                <router-link :to="/telephone_farmer/+farm.id" class="btn-sm mx-2 btn btn-primary">Visit</router-link>

              </td>
            <td>
              <button class="btn btn-danger btn-sm"  @click="getFarmID(farm.id)"  data-bs-toggle="modal" data-bs-target="#AssignManager">Assign manager</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col col-sm-12 col-md-6 col-lg-6">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>
                Farm managers
                <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addFarmManager">New Manager</button>
              </h2>
            </th>
          </tr>
          <tr>
            <th>Manager Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colspan="2">Operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="manager in managers" :key="manager">
            <td class="border">{{manager.name}}</td>
            <td class="border">{{manager.email}}</td>
            <td class="border">{{manager.phone}}</td>
            <td>
              <button class="btn btn-sm  btn-success">View</button>
            </td>
            <td>
              <button class="btn btn-sm btn-danger">Edit</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
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
                <label class="form-label">Type Of farming</label>
                <select required v-model="type_of_farming" class="form-control" name="">
<!--                  <option disabled selected>&#45;&#45;Select type of farm&#45;&#45;</option>-->
                  <option value="livestock">Livestock</option>
                  <option value="crop_farming">Crop Farming</option>
                  <option value="chicken">Chicken Keeping</option>
                  <option value="mixed">Mixed</option>
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
                <label class="form-label">Location</label>
                <input type="text" v-model="location" class="form-control" >
              </div>
              <button type="submit"  data-bs-dismiss="modal" class="btn btn-primary">Create Manager</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  <div class="modal fade" id="AssignManager" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Assign Manager</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="AssignManagerToFarm">


              <div class="mb-3">
                <label class="form-label">Farm Manager</label>
                <select v-model="manager_id" class="form-control" required>
                  <option disabled value="">Select Manager</option>
                  <option v-for="newfarmer in managers" :key="newfarmer.id" :value="newfarmer.manager_id">{{ newfarmer.name }}</option>
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