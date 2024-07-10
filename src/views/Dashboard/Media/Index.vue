<script setup>
import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";


import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";

const {base_url,authHeader,storage} = auth()
const route = useRoute();
const id = ref('');

const chats = ref([]);
const users = ref([]);
// Set the id to the route parameter id
id.value = route.params.id;
const message = ref('')
const status = ref('')

const  getChats = async () => {
  const res = await axios.get(base_url.value + 'chat', authHeader)
  if(res){
    chats.value = res.data.users
  }
}
const  getUsers = async () => {
  const res = await axios.get(base_url.value + 'chat/users', authHeader)
  if(res){
    users.value = res.data.users
  }
}
onMounted(()=> {
  getChats()
  getUsers()
})

</script>

<template>
  <Header />
  <div class="media">
    <div  class="group">
      <div class="m-2 bg-light">
        <router-link class="text-decoration-none btn btn-sm " to="/network">Chats</router-link>
        <router-link class="text-decoration-none btn btn-sm bg-primary" to="/media">Media</router-link>
      </div>
      <div class="">
        <h4 class="me-2">
          Groups
          <span class="chat-plus">
            <i class="bi bi-plus float-end" data-bs-toggle="modal" data-bs-target="#add-chat"></i>
          </span>
        </h4>

      </div>
    </div>

    <div class="post">
      <router-view />
    </div>

    <div class="related">
      <p>Innovations</p>
    </div>
  </div>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="add-chat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create group</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
       <div class="m-3">
         <form action="">
           <label for="">Group name</label>
           <input type="text" class="form-control" >
           <label for="">Groups description</label>
           <textarea name="" id="" cols="4" rows="4" class="form-control"></textarea>
           <button class="btn btn-primary float-end mt-2 w-25">Create</button>
         </form>
       </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.media{
  width: 100%;
  display: flex;
}
.group{
  width: 20%;
}
.post{
  width: 50%;
}
.related{
  width: 30%;
}

@media screen and (min-width: 300px) and (max-width: 500px) {

}

</style>