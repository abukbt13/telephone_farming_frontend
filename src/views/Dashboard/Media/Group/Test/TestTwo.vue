<script setup>
const props = defineProps({
  title: String
});
</script>

<template>
  <div class="main">
    {{ title }}
  </div>
</template>

<style scoped>
.main {
  color: blue;
}
</style>
