<script setup>


import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();
const status = ref('')
const group_name = ref('')
const description = ref('')
const category = ref('')
const groups = ref([])
const profile = ref([])

function imageUpload(e){
  profile.value = e.target.files[0];
  }
const createGroup= async () => {
  if (description.value === '' && group_name.value ==='') {
    alert('Ensure you ave valid name and description names');
    return;
  }

  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('name', group_name.value);
  formData.append('profile', profile.value);
  formData.append('category', category.value);


  const res = await axios.post(base_url.value + 'v1/groups', formData, authHeader);

  if (res.data.status === 'success') {
    getGroups()
    status.value = res.data.message;
  } else {
    status.value = 'Something went wrong';
  }
};
const getGroups = async () => {
  const res = await axios.get(base_url.value + 'v1/groups', authHeader);
  if (res.status === 200) {
    groups.value = res.data.groups;
  }
};


onMounted(() => {
  authUser();
  getGroups();
});
</script>

<template>
<div v-if="status" class="ms-2"> {{status}}</div>

  <div class="groups border m-1">
    <div class="border-bottom text-uppercase d-flex justify-content-between align-items-center ms-2">my groups
      <button  data-bs-toggle="modal" data-bs-target="#create_group" style="background:#0dcaf0;" class="btn btn-sm">
      <i class="fa bi-plus" ></i>
      New Group
    </button>
    </div>
<!--    {{groups}}-->
    <div class="border">

     <div v-if="groups" v-for="group in groups" :key="group" class="">
       <div class=" border p-1 mt-1 ms-1">
         <h3 class="d-flex flex-row align-items-center justify-content-between">{{ group.name}}</h3>
         <p>{{ group.description}}.  <router-link :to="'/media/group/'+group.id" class="btn btn-primary text-decoration-none float-end">view</router-link>
         </p>
       </div>
     </div>
      <div v-else class="border">
        <p class="mt-2">You dont have any group create one
          <button class="btn btn-primary text-decoration-none float-end">Create now</button>
        </p>
      </div>
    </div>


  </div>

<!--  modal for creating group-->
  <div class="modal fade" id="create_group" tabindex="-1" aria-labelledby="create_group" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="m-3">

          <form @submit.prevent="createGroup">
            <label>Group Name</label>
            <input type="text" v-model="group_name" class="form-control">
            <label>Group Description</label>
            <textarea v-model="description" cols="4" rows="4" class="form-control"></textarea>
            <label>Category</label>
            <select v-model="category" class="form-control">
              <option value="livestock keeeping">Livestock Farming</option>
              <option value="bee keeping">Bee Keeping</option>
              <option value="vegetable farming">CRop Farming</option>
              <option value="fish farming">Fish Farming</option>
              <option value="poultry">Poultry Farming</option>
            </select>
            <label for="">
              Group image
            </label>
            <input type="file" @change="imageUpload" placeholder="upload image">


            <button type="submit" data-bs-dismiss="modal" class="btn mt-2 btn-primary mt-2 w-100">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>