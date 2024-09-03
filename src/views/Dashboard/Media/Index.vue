<script setup>
import Header from "@/components/includes/Header.vue";
import {onMounted, ref} from "vue";
import axios from "axios";


import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";

const {base_url,authHeader,AuthenticatedUser,currentUser,storage} = auth()
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
  AuthenticatedUser()
  getChats()
  getUsers()
})

</script>

<template>
<div class="position-static">
  <div class="sticky-top"> <Header /></div>



  <div class="navigation">
    <div  class="d-flex ps-3 justify-content-between align-items-center">
      <section @click="showSection('group')" class="w-100 navigate p-2">Groups<i class="bi bi-person-fill-add"></i>
      </section>
      <section @click="showSection('post')"  class="w-100 navigate p-2">Posts</section>
      <section @click="showSection('related')"  class="w-100 navigate p-2">Related</section>
    </div>
  </div>
</div>



  <div  class="media">

    <div   class="group" id="group">
     <div class="sidebar">
       <div style=" position: relative; width: 100%; z-index: 10;" class="mt-2 d-flex">
         <a class="text-decoration-none w-100 me-1  border text-center" href="/network">
           <div >CHATS </div>
         </a>
         <a style="background: green; color:white;" class="text-decoration-none nav-link  w-100  text-center" href="/media">MEDIA
           <div class="w-100">
           </div>
         </a>
       </div>
      <div class="container ps-sm-5 ps-md-2 ps-lg-2">
        <h2 class="d-flex justify-content-between align-items-center">
          <img style="border-radius: 50%;"   v-if="currentUser.profile" :src="storage+'Profile/picture/'+currentUser.profile" width="60" height="60" alt="">

          <img v-else src="/user.png" style="border-radius: 50%;" width="60" height="60" alt="">

          {{ currentUser.name }}
        </h2>

        <a href='/media/groups' class="link text-decoration-none d-flex fs-3 d-block">
          <i class="bi bi-people-fill"></i>
          <p class="ps-3  text-dark">Groups </p>
        </a>


        <router-link to="/media/me/posts" class="link text-decoration-none my-1 d-flex fs-3 d-block">
          <i style="color:yellow;" class="bi bi-signpost-2-fill"></i>
            <p class="ps-2 text-dark">  Posts</p>
        </router-link>

        <router-link to="training" class="link text-decoration-none my-1 d-flex fs-3 d-block">
          <i class="bi bi-calendar2-date-fill"></i>
          <p class="ps-2 text-dark"> Events </p>
        </router-link>

         <router-link to="/education" class="link text-decoration-none my-1 d-flex fs-3 d-block">
          <i class="bi bi-database"></i>
           <p class="ps-2 text-dark text-dark">Education resources</p>
        </router-link>

         <router-link to="youtube" class="link text-decoration-none d-flex my-1 fs-3 d-block">
          <i class="bi bi-camera-video-fill"></i>
           <p class="ps-2 text-dark">Videos</p>
        </router-link>

      </div>

     </div>
    </div>

    <div class="post" id="post">
      <router-view />
    </div>

    <div class="related" id="related">
      <div class="related-contents p-2">
        <h2>Trending</h2>
         <p class="me-5">Modern Farming <span class="float-end"><img src="/pic.jpg" height="40" width="40" alt=""></span></p>
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
  width: 100%;
  z-index: 10;
  position: fixed;
  bottom:0px;
  background:#fdaa;
}
.media{
  width: 100%;
  display: flex;
  height:89vh;
}
.group{
  width: 20%;
}
.container{
  min-height: 87vh;
  max-height: 80vh;
  overflow:scroll;
}
.post{
  width: 50%;
  min-height: 89vh;
  max-height:89vh;
  overflow: scroll;
  margin-bottom: 2rem;
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
  width: 30%;
  min-height:87vh;
  max-height:87vh;
  overflow:scroll;
}
.navigate{
  color:green;

}
.navigate:hover{
  background: white;
}
.link:hover{
  background: green;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .sidebar{
    width: 100%;
  }  .related-contents{
    width: 100%;
  }
  .navigation{
    bottom:0px;
    display: block;
  }
  .container{
    width: 100vw;
    min-height: 87vh;
    max-height: 80vh;
    overflow:scroll;
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