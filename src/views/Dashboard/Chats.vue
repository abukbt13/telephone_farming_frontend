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
  if( message.value === ''){
    alert('Type a message')
    return

  }
  const formData = new FormData();
  formData.append('message', message.value)
  formData.append('id', id.value)
  const res = await axios.post(base_url.value+'chat/'+id.value,formData,authHeader)
  if (res.data.status === 'success') {
    message.value = ''
    status.value = res.data.message
    getChat()
  }
  else {

    status.value = 'something went wrong'
  }
}
const  getChat = async () => {
  const res = await axios.get(base_url.value + 'chats/chat/'+id.value, authHeader)
  if(res){
    messages.value = res.data.messages
  }
}
onMounted(()=> {
  getChat()
})

</script>

<template>


<!--       <div style="width: 85vw; border-right: 2px solid grey;height: 100vh;" class="d-flex justify-content-center align-items-center">-->
<!--         <p>Select receipient to message with</p>-->
<!--       </div> -->
       <div style="width: 100vw; height: 100vh;position: static;" class="">
          <div class="">

<!--            {{messages}}-->
            <div v-for="message in messages" :key="message.id" class="">
              <div v-if="message.sender_id === 1" class="message sender">{{ message.message }}</div>
              <div v-else class="message receiver">{{ message.message }}</div>
            </div>

          </div>
         <div class="" style="position: absolute; bottom: 0px;">
           <textarea v-model="message" type="text" style="min-height: 1rem;max-height:16rem;width:80vw; margin-left: 4px;"></textarea><i @click="storemessage" style="font-size: 32px; margin-left: 2px" class="bi bi-telegram"></i>
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
 .sender {
   width: 50vw;
   background-color: #daf1da;
   float: right;
   padding: 10px;
   margin: 5px;
   border-radius: 10px;
 }

.receiver {
  background-color: #f1daf1;
  float:  left;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  width: 50vw;
}
</style>
