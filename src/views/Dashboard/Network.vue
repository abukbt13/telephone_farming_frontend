<script setup>

import Header from "@/components/includes/Header.vue";
</script>

<template>
<Header />
  <div class="row">
    <div style="height: 100vh" class="col  col-3  text-white bg-dark">
    <div class="m-4">
      <h2><router-link class="text-decoration-none text-white" to="/network">Updates</router-link></h2>
      <h2><router-link class="text-decoration-none text-white" to="/network/chats">Chats</router-link></h2>
    </div>
    </div>
    <div class="col">
      <p> my chats below here</p>
    </div>
  </div>
</template>

<style scoped>

</style>