<script setup>
import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
const chat = ref('')

import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";

const {base_url,authHeader,storage} = auth()
const route = useRoute();
const id = ref('');

const chats = ref([]);
// Set the id to the route parameter id
id.value = route.params.id;
function storeChat(){
  alert('hi')
}
// const  getChats = async () => {
//   const res = await axios.get(base_url.value + 'chats/'+id.value, authHeader)
//   if(res){
//     chats.value = res.data.chats
//   }
// }
// onMounted(()=> {
//   getChats()
// })

</script>

<template>
  <Header />
     <div class="d-flex">
       <div style="width: 15vw; border-right: 2px solid grey;height: 100vh;" class="border-bottom">
       <div class="m-2">
         <router-link class="text-decoration-none btn btn-sm bg-primary" to="/network">Updates</router-link>
         <router-link class="text-decoration-none btn btn-sm" to="/network/chats">Chats</router-link>
       </div>
        <div class="chats ms-2">
          <h4 class="border-bottom">My chats</h4>
          <p class="mychats">Abraham Kibet</p>
        </div>
       </div>

<!--       <div style="width: 85vw; border-right: 2px solid grey;height: 100vh;" class="d-flex justify-content-center align-items-center">-->
<!--         <p>Select receipient to chat with</p>-->
<!--       </div> -->
       <div style="width: 85vw; height: 100vh;position: static;" class="">

         <div class="" style="position: absolute; bottom: 0px;">
           <textarea v-model="chat" type="text" style="min-height: 1rem;max-height:16rem;width:80vw; margin-left: 4px;"></textarea><i @click="storeChat" style="font-size: 32px; margin-left: 2px" class="bi bi-telegram"></i>
         </div>
       </div>
     </div>

</template>

<style scoped>

.mychats{
  padding: 1rem;
  text-transform: uppercase;
}
.mychats:hover{

  background: #CCCCFF;
  color:blue;
}
</style>