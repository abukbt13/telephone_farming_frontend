<script setup>

import {onMounted, ref} from "vue";

const { base_url,storage,authUser, authHeader, multipartHeader} = auth();
import axios from "axios";
const description = ref('')
const name = ref('')
const status = ref('')
const createPost = async () => {
  if (description.value === '' && name.value ==='') {
    alert('All fields are required');
    return;
  }

  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('name', name.value);


  const res = await axios.post(base_url.value + 'v1/groups', formData, authHeader);
  if (res.data.status === 'success') {
    status.value = res.data.message;
    getGroups();
  } else {
    status.value = 'Something went wrong';
  }
};

onMounted(() => {
  authUser();
});
</script>

<template>


  <div class="groups border m-1">
    <div class="border-bottom text-uppercase d-flex justify-content-between align-items-center ms-2">my groups
      <button  data-bs-toggle="modal" data-bs-target="#create_group" style="background:#0dcaf0;" class="btn btn-sm">
        <i class="fa bi-plus" ></i>
        New Group
      </button>
    </div>
    <div class="border">

      <div class=" border p-1 mt-1 ms-1">
        <h3 class="d-flex flex-row align-items-center justify-content-between">Fish farming </h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad cum expedita ipsa necessitatibus non nostrum obcaecati repellendus unde velit.        <router-link to="/media/group/4" class="btn btn-primary text-decoration-none float-end">view</router-link>
        </p>
      </div>
      <div class=" border p-1 mt-1 ms-1">
        <h3 class="d-flex flex-row align-items-center justify-content-between">Fish farming </h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad cum expedita ipsa necessitatibus non nostrum obcaecati repellendus unde velit.        <router-link to="/media/group/4" class="btn btn-primary text-decoration-none float-end">view</router-link>
        </p>
      </div>
    </div>

    <div class="border">
      <p class="mt-2">You dont have any group create one
        <router-link to="/media/group/4" data-bs-toggle="modal" data-bs-target="#create_group"  class="btn btn-primary text-decoration-none float-end">Create now</router-link>
      </p>
    </div>
  </div>

  <!--  modal for creating group-->
  <div class="modal fade" id="create_group" tabindex="-1" aria-labelledby="createpost" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Group</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="m-3">
          <form @submit.prevent="createGroup">
            <h5>Group Name</h5>
            <input type="text" class="form-control">
            <h5>Group Description</h5>
            <textarea v-model="description" cols="4" rows="4" class="form-control"></textarea>
            <h5>Category</h5>
            <select v-model="category" >
              <option value="livestock keeeping">Livestock Farming</option>
              <option value="bee keeping">Bee Keeping</option>
              <option value="vegetable farming">CRop Farming</option>
              <option value="fish farming">Fish Farming</option>
              <option value="poultry">Fish Farming</option>
            </select>

            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-100">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>