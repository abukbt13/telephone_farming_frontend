<script setup>

import {auth} from "@/compossables/auth.js";
import {onBeforeMount, onMounted, ref} from "vue";
import Header from "@/components/includes/Header.vue";
import axios from "axios";

const {base_url,authHeader,AuthenticatedUser,currentUser,storage} = auth()


const phone = ref('')
const name = ref('')
const status = ref('')
const profile = ref('')
const user_id = ref('')

function PopulateUser(PopulateUser){
  profile.value=PopulateUser.profile
  name.value=PopulateUser.name
  phone.value=PopulateUser.phone
  user_id.value=PopulateUser.id
}
function pictureUpload(e){
  profile.value=e.target.files[0];
}

const UpdateProfile =async () => {

  if (name.value === '' && phone.value === '') {
    status.value = 'Username  and Phone are required check your credentials and try again'
  }
    const formData = new FormData();
    formData.append('name', name.value)
    formData.append('phone', phone.value)
    formData.append('profile', profile.value)
    const res = await axios.post(base_url.value + 'auth/user/'+user_id.value, formData,authHeader)
    if(res.status=== 200) {
      if (res.data.status === 'success') {
        status.value=res.data.message
        AuthenticatedUser()
      }
    }
}

// profile.value =currentUser.value.profile

onBeforeMount(()=> {
  console.log(currentUser.value)
  AuthenticatedUser()
})
</script>

<template>
  <Header/>


  <div class="d-flex justify-content-center align-items-center">

    <div class="profile border m-2">
      <div class="d-flex justify-content-center pt-4">
        <img v-if="currentUser.profile" :src="storage+'Profile/picture/'+currentUser.profile" height="300" width="300" alt="">
        <img v-else src="/user.png" height="100" width="100" alt="">
      </div>
      <div class="d-flex justify-content-center my-2"><button data-bs-toggle="modal" @click="PopulateUser(currentUser)" data-bs-target="#user" class="btn btn-primary">Edit Profile</button></div>
      <div class="border p-3">
        <h2>Full Name</h2>
        <p>{{currentUser.name}}</p>
      </div> <div class="border p-3">
      <h2>Phone</h2>
      <p>{{currentUser.phone}}</p>
    </div>
    </div>
  </div>

<!--  Update modal -->
  <div class="modal fade" id="user" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Update Profile</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="m-3">
          <form @submit.prevent="UpdateProfile">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Name</label>
              <input type="text" class="form-control" v-model="name">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Phone</label>
              <input type="number" class="form-control" v-model="phone">
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Old profile</label><br>
              <img src="/user.png" width="100" height="100" alt="">
              <input type="file" class="form-control" @change="pictureUpload">
            </div>

            <div class="">
              <button type="submit"  data-bs-dismiss="modal"  class="w-100 btn btn-primary btn-block">Update Profile</button>
            </div>
            <br>

          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.profile{
  width: 40%;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .profile{
    width: 100%;
  }
}
</style>