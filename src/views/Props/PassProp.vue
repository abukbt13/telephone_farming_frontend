<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['notification']);
const sendDataToParent = () => {
  emit('notification', 'Data from Child!');
};
</script>

<template>
<div class="border p-3">
  <h2>Welcome  back <br> {{message }}</h2>
  <button @click="sendDataToParent" class="btn btn-success">Send Data to Parent</button>
</div>
</template>

<style scoped>

</style>