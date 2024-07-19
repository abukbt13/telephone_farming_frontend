<script setup>

import axios from "axios";
import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const { base_url,storage, authUser, authHeader, multipartHeader } = auth();
const route = useRoute();
const group_id = route.params.id
const group = ref([]);
const posts = ref([]);
const status = ref('');
const getGroup = async () => {
  const res = await axios.get(base_url.value + 'v1/groups/'+group_id, authHeader);
  if (res.status === 200) {
    group.value = res.data.group;
  }

};
onMounted(() => {
  getGroup()
})
</script>

<template>

  <div class="border">
<router-link :to="'/media/group/'+group_id"><i class="bi fs-1 bi-arrow-left"></i>
</router-link>
    <h2 class="text-center">Group details</h2>
    <div class="border d-flex p-2">
      <div class="">
        <img v-if="group.profile" style="border-radius: 50%;" :src="storage+'Groups/profiles/'+group.profile"  width="100" height="100"  alt="">

        <img v-else src="/pic.jpg" class="rounded-circle" width="100" height="100" alt="">
      </div>
      <div class="">
        <h2>Group name</h2>
        <p>{{group.name}}</p>
      </div>
      <button style="height: 2rem" class="btn ali btn-sm btn-primary">Add member</button>
    </div>
    <div class="border p-2">
      <h2>Description</h2>
      <p>{{group.description}}</p>
    </div>
    <div class="border p-2">
      <h2>Members</h2>
      <p>89</p>
    </div>
    <div class="border p-2">
      <h2>Posts</h2>
      <p>99</p>
    </div>

    <h2>Group members</h2>

    <table class="table border">
      <thead>
      <tr>
        <th scope="col" rowspan=""></th>
        <th scope="col" colspan="3">Rights</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>name</th>
        <td>write</td>
        <td>Delete</td>
        <td>delete</td>
      </tr>
      <tr>
        <th>Abraham Kibet</th>
        <td><i class="bi bi-check2-all"></i>
        </td>
        <td>
          <i class="bi bi-check2-all"></i>
        </td>
        <td><button class="btn btn-sm btn-danger">Delete</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>