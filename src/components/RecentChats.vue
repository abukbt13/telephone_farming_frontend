<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";


import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";

const {base_url,authHeader,storage} = auth()
const route = useRoute();
const id = ref('');

const chats = ref([]);
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

onMounted(()=> {
  getChats()
})

</script>

<template>

    <div class="navigation">

      <div style="border: 2px solid black; position: relative; width: 100%; " class="d-flex">
        <a style="background: #d538fc;" class="text-decoration-none nav-link  w-100   border text-center" href="/network">
          <div >Chats </div>
        </a>
        <a  class="text-decoration-none  w-100 border text-center" href="/media">
          Media
        </a>
      </div>
    </div>

    <div class="messages">
      <div class="border-bottom d-flex justify-content-between align-items-center">
        <h1 class="mt-1">CHATS</h1>
        <button class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-chat">
          New Chat
        </button>

      </div>
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

<!--modal-->

</template>

<style scoped>

.navigation{
  position: fixed;
  width: 20vw;
  z-index: 1;
}
.messages{
  margin-top: 2rem;
  z-index: 0;
}
.user{
  margin-right: 1rem;
  padding-left: 4px;
}
.user:hover{
  background: #dddddd;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .navigation{
    top: 3.5rem;
    width: 100vw;
  }

}
</style>