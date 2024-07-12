<script setup>
import Header from "@/components/includes/Header.vue";

import RecentChats from "@/components/RecentChats.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";

const {base_url,authHeader,storage} = auth()
const users = ref([]);
const  getUsers = async () => {
  const res = await axios.get(base_url.value + 'chat/users', authHeader)
  if(res){
    users.value = res.data.users
  }
}

onMounted(()=> {
  getUsers()
})
</script>

<template>
  <Header />
  <div class="networking">
    <div  class="recent-chats">
      <RecentChats />
    </div>
   <div class="chats">
      <router-view />
   </div>
  </div>
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

  <!-- Button trigger modal -->
  <!-- Modal -->
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

@media screen and (min-width: 300px) and (max-width: 500px) {
  .recent-chats{
    display: none;
  }
  .chats{
    width: 100vw;
  }
}

</style>