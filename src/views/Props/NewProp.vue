<script setup>

import PassProp from "@/views/Props/PassProp.vue";
import {ref} from "vue";
const message = ref('Abraham Kibet')
const status = ref('')
const handleEmit = (data) => {
  status.value =data
};
</script>

<template>
  <div class="" v-if="status">
    <p class="bg-danger text-white p-2">{{status}}</p>
  </div>
  <h3 class="text-uppercase text-decoration-underline">Parent</h3>
  <PassProp :message @notification="handleEmit" />
</template>

<style scoped>

</style>