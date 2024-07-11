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

const tabs =['group','related','post']
// Method to update the active section
function showSection (id) {

    document.getElementById('group').style.display='none'
    document.getElementById('post').style.display='none'
    document.getElementById('related').style.display='none'

    document.getElementById(id).style.display='block'

  // else if($id==='related'){
  //   document.getElementById('related').classList.add('related')
  //   document.getElementById('post').classList.add('none')
  //   document.getElementById('group').classList.add('none')
  // }
  // else{
  //   document.getElementById('post').classList.add('block')
  //   document.getElementById('related').classList.add('none')
  //   document.getElementById('group').classList.add('none')
  // }
}
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
  <br>
 <div class="navigation">
   <div style="border: 2px solid black; position: fixed; top: 3rem; width: 100%; z-index: 10;" class="d-flex justify-content-between">
     <button @click="showSection('group')" class="w-100">Groups</button>
     <button @click="showSection('post')"  class="w-100">Posts</button>
     <button @click="showSection('related')"  class="w-100" :class="{ 'link-active': activeSection === 'Trending' }">Related</button>
   </div>
 </div>


  <div class="media">

    <div   class="group" id="group">
     <div class="sidebar">
       <div style="border: 2px solid black; position: relative; width: 100%; z-index: 10;" class="d-flex">
         <a class="text-decoration-none w-100 me-1  border text-center" href="/network">
           <div >Chats </div>
         </a>
         <a style="background: #d538fc;" class="text-decoration-none nav-link  w-100 border text-center" href="/media">Media
           <div class="w-100">
           </div>
         </a>
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
    </div>

    <div class="post" id="post">
      <router-view />
    </div>

    <div class="related" id="related">
      <div class="related-contents">
        <h2>Inovation contents</h2>
        <p>lorem100</p>
      </div>
    </div>
  </div>

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
.navigation{
  display: none;
}
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
.sidebar{
  position: fixed;
  width: 20%;
}
.related-contents{
  position: fixed;
  width: 20%;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .sidebar{
    width: 100%;
  }  .related-contents{
    width: 100%;
  }
  .navigation{
    display: block;
  }
  .post{
    display: block;
    width: 100%;
  }
  .related{
    display: none;
    width: 100%;
  }
  .group{
    display: none;
    width: 100%;
  }

}

</style>