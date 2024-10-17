<script setup>
import Swal from "sweetalert2";

import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {auth} from "@/compossables/auth.js";
import {onMounted, ref} from "vue";
import {useInactivityLogout} from "@/compossables/useInactivityLogout.js";
import {Modal} from "bootstrap";

const {resetTimer} = useInactivityLogout
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


const id = ref('')
const status = ref('')
const farms = ref([])
const managers = ref([])
const Addfarm = async () => {
  if ('farm_name' ==='' || type_of_farming.value ==='' || location.value ===''){
    status.value = 'All fields are required'
  }
  const formData = new FormData();

  formData.append('farm_name', farm_name.value);
  formData.append('type_of_farming', type_of_farming.value);
  formData.append('location', location.value);



  try {
    const res = await axios.post(base_url.value + 'tf/farm', formData,authHeader);
    if (res.data.status === 'success') {
      await  Swal.fire(
          'Success!',
          'Farm created Successfully',
          'success'
      )
      const modalElement = document.getElementById('addfarm');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();

       getFarms()
    }
    else if (res.data.status === 'failed') {
      await Swal.fire(
          'Danger!',
          'something went wrong try again',
          'error'
      );
      const modalElement = document.getElementById('addfarm');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();
       getFarms()
    }
    else {
      status.value='network error'
    }
  } catch (error) {
    // Handle the error and show an error message
    let firstErrorMessage = 'An unknown error occurred.';
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      const firstErrorKey = Object.keys(errors)[0];
      firstErrorMessage = errors[firstErrorKey][0];
    }

    // Handle the error and show an error message
    await Swal.fire(
        'Danger!',
        `An error occurred: ${firstErrorMessage}`,
        'error'
    );
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
  formData.append('id', id.value);

  if(id.value ===''){
    const res = await axios.post(base_url.value + 'tf/manager', formData,authHeader);

    if (res.data.status === 'success') {
      await  Swal.fire(
          'Success!',
          'Farm Manager created Successfully',
          'success'
      )
      const modalElement = document.getElementById('addFarmManager');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();
      return  getFarmManagers()
    }
  }
  else {
    const res = await axios.post(base_url.value + 'tf/manager/update/'+id.value, formData,authHeader);

    if (res.data.status === 'success') {
      await  Swal.fire(
          'Success!',
          'Farm Manager updated Successfully',
          'success'
      )
      const modalElement = document.getElementById('addFarmManager');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();
      return  getFarmManagers()
    }
  }

}

function getFarmID(id){
  farm_id.value = id
}
function populateDetails(data){
  id.value =data.manager_id
  email.value=data.email
  phone.value=data.phone
  name.value =data.name
}
function depopulateDetails(){
  id.value=''
  email.value=''
  phone.value=''
  name.value =''
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
    const modalElement = document.getElementById('AssignManager');
    const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
    bootstrapModal.hide();

    await getFarmManagers()
  }
  else if(res.data.status === 'failed'){
    await Swal.fire(
        'Danger!',
        'Manager already assigned',
        'error'
    );
    const modalElement = document.getElementById('AssignManager');
    const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
    bootstrapModal.hide();
  }
else {
    await Swal.fire(
        'Danger!',
        'something went wrong',
        'error'
    );
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
  <div v-if="status" class="bg-danger p-1 text-uppercase text-white">{{status}}</div>
  <div class="m-4">
    <div class="">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>
                My Farms
                <button class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addfarm">Create Farm</button>
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
          <tr v-if="farms.length>0" v-for="farm in farms" :key="farm">
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
          <tr v-else>
            <td colspan="3" class="text-center">
              You dont have any farm create one now
              <span class="text-uppercase text-primary">
                Remember the farm  you create is the one you need to monitor of which the farm manager is the one to provide the farm progress
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th colspan="5">
              <h2>
                Farm managers
                <button @click="depopulateDetails()" class="btn btn-success float-end" data-bs-toggle="modal" data-bs-target="#addFarmManager">New Manager</button>
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
          <tr v-if="managers.length>0" v-for="manager in managers" :key="manager">
            <td class="border">{{manager.name}}</td>
            <td class="border">{{manager.email}}</td>
            <td class="border">{{manager.phone}}</td>
<!--            {{manager}}-->
            <td>
              <button @click="populateDetails(manager)" data-bs-toggle="modal" data-bs-target="#addFarmManager" class="btn btn-sm  btn-success">View</button>
            </td>

          </tr>
          <tr v-else>
            <td colspan="3" class="text-center">
              You dont have any farm manager create one now <br>
              <span class="text-primary text-uppercase">
                Remember the farm manager you create is the one to manage your farm by providing
                 the information of your farm <br>
                The farm manager password is the same as the email of the farm manager
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addfarm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <select  v-model="type_of_farming" class="form-control" name="">
<!--                  <option disabled selected>&#45;&#45;Select type of farm&#45;&#45;</option>-->
                  <option value="livestock">Livestock</option>
                  <option value="crop_farming">Crop Farming</option>
                  <option value="chicken">Chicken Keeping</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Location</label>
                <select  v-model="location" class="form-control" name="">
                  <!--                  <option disabled selected>&#45;&#45;Select type of farm&#45;&#45;</option>-->
                  <option value="Elgeiyo Marakwet">Elgeiyo Marakwet</option>
                  <option value="Uasin Ngishu">Uasin Ngishu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Baringo">Baringo</option>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Meru">Meru</option>
                  <option value="Isiolo">Isiolo</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Makueni">Makueni</option>
                  <option value="Kitui">Kitui</option>
                  <option value="West Pokot">West Pokot</option>
                  <option value="Elgeiyo Marakwet">Elgeiyo Marakwet</option>
                  <option value="Uasin Ngishu">Uasin Ngishu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Baringo">Baringo</option>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Meru">Meru</option>
                  <option value="Isiolo">Isiolo</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Makueni">Makueni</option>
                  <option value="Kitui">Kitui</option>
                  <option value="West Pokot">West Pokot</option>
                </select>
              </div>
              <button type="submit"  class="btn btn-primary">Add Farm</button>
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
                id {{id}}
                <label class="form-label">Full Name</label>
                <input type="text" v-model="name" class="form-control" >
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control">
              </div>

              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input type="number" v-model="phone" class="form-control">
              </div>
              <button type="submit"  class="btn btn-primary">Create Manager</button>
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
              <button type="submit"   class="btn btn-primary">Create Manager</button>
            </form>
          </div>

        </div>
      </div>
    </div>

</template>

<style scoped>

</style>