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
          <div class="">
            <h4 class="text-center">Explore Groups</h4>
            <div class="">
              <div v-for="group in allgroups" :key="group" class="mx-2 d-flex flex-row align-items-center justify-content-between">

                <div class="d-flex">
                  <img v-if="group.profile" :src="storage+'Groups/profiles/'+group.profile" height="50" width="50" alt="Image" class="img-fluid border-4"  >
                   <img v-else src="/pic.jpg" width="50" height="50" alt="">
                  <p class="mt-3 text-uppercase pt-3">{{ group.name }}</p>
                 </div>
                <a :href="'/media/group/'+group.id" class="btn btn-primary btn-sm">Open</a>
              </div>

            </div>
          </div>
        </div>
        <div class="col col-sm-100 col-md-6">
          <router-view />
        </div>
        <div class="col  d-none d-lg-block d-md-block col-3">
          <p>Latest posts</p>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>