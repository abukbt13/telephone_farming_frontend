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
      <div class="home">
        <div class="chatarea">
          <div  v-for="message in messages" :key="message.id" class="">
            <p v-if="message.sender_id === 1" class="message sender">{{ message.message }}</p>
            <p v-else class="message receiver">{{ message.message }}</p>
          </div>
        </div>
        <div class="d-flex px-2">
          <textarea v-model="message" type="text" style="" class="form-control"></textarea>
          <button class="btn btn-primary" @click="storemessage" style="font-size: 30px; margin-left: 10px;width: 6rem;"><i class="bi bi-send"></i>
          </button>
        </div>
      </div>


</template>

<style scoped>
.home{
  height: 91vh;
}
.chatarea{
  height: 80vh;
  overflow: scroll;

}

 .sender {
   min-width: 50vw;
   max-width: 80vw;
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
  min-width: 50vw;
  max-width: 80vw;
}
</style>
