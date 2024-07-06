<script setup>
import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";


import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";

const {base_url,authHeader,storage} = auth()
const route = useRoute();
const id = ref('');

const messages = ref([]);
// Set the id to the route parameter id
id.value = route.params.id;
const message = ref('')
const status = ref('')
const  storemessage = async () => {
  const formData = new FormData();
  formData.append('message', message.value)
  formData.append('id', id.value)
  const res = await axios.post(base_url.value+'chat/'+id.value,formData,authHeader)
  if (res.data.status === 'success') {
    status.value = res.data.message
  }
  else {
    status.value = 'something went wrong'
  }
}
// const  getmessages = async () => {
//   const res = await axios.get(base_url.value + 'messages/'+id.value, authHeader)
//   if(res){
//     messages.value = res.data.messages
//   }
// }
// onMounted(()=> {
//   getmessages()
// })

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
          <h4 class="border-bottom">My messages</h4>
          <p class="mymessages">Abraham Kibet</p>
        </div>
       </div>

<!--       <div style="width: 85vw; border-right: 2px solid grey;height: 100vh;" class="d-flex justify-content-center align-items-center">-->
<!--         <p>Select receipient to message with</p>-->
<!--       </div> -->
       <div style="width: 85vw; height: 100vh;position: static;" class="">

         <div class="" style="position: absolute; bottom: 0px;">
           <textarea v-model="message" type="text" style="min-height: 1rem;max-height:16rem;width:80vw; margin-left: 4px;"></textarea><i @click="storemessage" style="font-size: 32px; margin-left: 2px" class="bi bi-telegram"></i>
         </div>
       </div>
     </div>

</template>

<style scoped>

.mymessages{
  padding: 1rem;
  text-transform: uppercase;
}
.mymessages:hover{

  background: #CCCCFF;
  color:blue;
}
</style>