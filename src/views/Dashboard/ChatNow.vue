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


           <div style="width: 85vw; border-right: 2px solid grey;height: 100vh;" class="d-flex justify-content-center align-items-center">
            <div class="">
              <p v-if="chats.length>0">Select receipient to message with</p>
              <button class="btn btn-success">New chat</button>
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