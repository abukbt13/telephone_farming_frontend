<script setup>
import Header from "@/components/includes/Header.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
const { base_url,storage,authUser, authHeader, multipartHeader} = auth();
const status = ref('')
const group_name = ref('')
const description = ref('')
const category = ref('')
const allgroups = ref([])
const profile = ref([])
const getAllGroups = async () => {
  const res = await axios.get(base_url.value + 'v1/groups', authHeader);
  if (res.status === 200) {
    allgroups.value = res.data.groups;
  }
};


onMounted(() => {
  authUser();
  getAllGroups();
});
</script>

<template>
  <Header />
<div class="">
<!--  {{ allgroups }}-->
    <div class="row">
        <div class="col d-none d-lg-block d-md-block col-3">
          <div class="settings">
           <router-link to="/media"> <h3 class="mx-2 mt-3 d-flex">
             <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
               <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
             </svg>Home


           </h3>
           </router-link>
            <router-link to="#" class="text-decoration-none text-dark"><p class="text-center fs-3"><i class="bi bi-search-heart"></i>
              Explore more</p></router-link>

           <button style="background: #dddddd" class="btn  w-100 ms-1"><i class="bi bi-plus"></i>  create Group</button>
            <hr />
            <div class="">
              <p class="text-center">Groups involved <span class="float-end">See All</span></p>
              <router-link v-for="group in allgroups" :key="group" :to="'/media/group/'+group.id"  class="m-2 text-decoration-none d-flex">
                  <img v-if="group.profile" :src="storage+'Groups/profiles/'+group.profile" height="50" width="50" alt="Image" class="img-fluid border-4"  >
                   <img v-else src="/pic.jpg" width="50" height="50" alt="">
                  <div class="ms-2">
                    <div class=" text-dark">{{ group.name }}</div>
                    <div>22/02/2024</div>
                  </div>

              </router-link>

            </div>
          </div>
        </div>
        <div class="col col-sm-100 col-md-6">
         <div class="group">
           <router-view />
         </div>
        </div>
        <div class="col  d-none d-lg-block d-md-block col-3">
         <div class="latest">
           <h2>Latest posts</h2>
           <router-link v-for="group in allgroups" :key="group" :to="'/media/group/'+group.id"  class="m-2 text-decoration-none d-flex">
             <img v-if="group.profile" :src="storage+'Groups/profiles/'+group.profile" height="50" width="50" alt="Image" class="rounded-circle"  >
             <img  v-else src="/pic.jpg" width="50" height="50" class="rounded-circle"  >
             <div class="ms-2">
               <div class=" text-dark">{{ group.name }}</div>
               <div>{{group.description}}</div>
             </div>

           </router-link>
         </div>
        </div>
    </div>
</div>
</template>

<style scoped>
 .group,.settings,.latest{

   min-height: 89vh;
   max-height: 89vh;
   overflow: scroll;
 }
</style>