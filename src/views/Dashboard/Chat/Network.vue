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
  <div class="networking">
    <div  class="recent-chats">
      <div class="m-2">
        <router-link class="text-decoration-none btn btn-sm bg-primary" to="/network">Chats</router-link>
        <router-link class="text-decoration-none btn btn-sm" to="/media">Media</router-link>
      </div>
      <div class="messages ms-2">
        <h4 class="border-bottom me-2">
          Chats
          <span class="chat-plus">
            <i class="bi bi-plus float-end" data-bs-toggle="modal" data-bs-target="#add-chat"></i>
          </span>
        </h4>
        <div v-if="chats.length>0" class="user" v-for="chat in chats" :key="chat">
          <a :href="'/network/chats/'+chat.id" class="mymessages text-decoration-none">
            <h5 class="">{{ chat.name }}</h5>
            <p class="">{{ chat.phone }}</p>
          </a>
        </div>
        <div class="" v-else>
          <button   class="btn btn-success" data-bs-toggle="modal" data-bs-target="#add-chat">Start a new chat</button>
        </div>
      </div>
    </div>

   <div class="chats">
      <router-view />
   </div>
  </div>
  <!-- Button trigger modal -->


  <!-- Modal -->
  <div class="modal fade" id="add-chat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
.networking{
  display: flex;
}
.recent-chats{
  width: 20vw; border-right: 2px solid grey;height: 91vh;
}
.chats{
  width: 80vw; border-right: 2px solid grey;height: 91vh;
}
.user{
  margin-right: 1rem;
  padding-left: 4px;
}
.user:hover{
  background: #dddddd;
}
.chat-plus{
  font-size: 37px
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .recent-chats{
    display: none;
  }
  .chats{
    width: 100vw;
  }
}

</style>