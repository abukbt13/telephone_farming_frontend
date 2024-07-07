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
  <div class="d-flex">
    <div style="width: 15vw; border-right: 2px solid grey;height: 100vh;" class="border-bottom">
      <div class="m-2">
        <router-link class="text-decoration-none btn btn-sm bg-primary" to="/network">Chats</router-link>
        <router-link class="text-decoration-none btn btn-sm" to="/network/messages">messages</router-link>
      </div>
      <div class="messages ms-2">
        <h4 class="border-bottom me-2">My Chats  <i class="bi bi-send-plus-fill float-end"data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </h4>
        <div v-if="chats.length>0" class="mymessages" v-for="chat in chats" :key="chat">
          <router-link :to="'/network/chats/'+chat.id" class="mymessages text-decoration-none">
            <p class="">{{ chat.name }}</p>
            <p class="">{{ chat.phone }}</p>
          </router-link>
        </div>
        <div class="" v-else>
          <button class="btn btn-success">Start a new chat</button>
        </div>
      </div>
    </div>

   <div style="width: 85vw; border-right: 2px solid grey;height: 100vh;" class="d-flex justify-content-center align-items-center">
      <router-view />
   </div>

  </div>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">New chat</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div  class="mymessages" v-for="user in users" :key="user">
            <router-link :to="'/network/chats/'+user.id"  class="mymessages text-decoration-none">
             <div data-bs-dismiss="modal" class="">
               <p class="">{{ user.name }}</p>
               <p class="">{{ user.phone }}</p>
             </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

router-link{
  padding: 0.2rem;
  text-transform: uppercase;
}
.mymessages:hover{

  background: #CCCCFF;
  color:blue;
}
</style>