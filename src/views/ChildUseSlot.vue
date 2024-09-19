<script setup>
import Slots from "@/views/Slots.vue"; // Importing the child component
import { ref } from "vue";

const name = ref('Abraham Kipkemoi Kibet'); // Ref for name (not directly used in slots example)
</script>

<template>
  <!-- Using the Slots component -->
<!--  <Slots>-->
<!--    &lt;!&ndash; Passing content to the "top" slot &ndash;&gt;-->

<!--    &lt;!&ndash; Passing content to the "footer" slot &ndash;&gt;-->
<!--    <template #footer>-->
<!--      <p>This is the footer content</p>-->
<!--    </template>-->
<!--    <template #top>-->
<!--    <p>{{ name }} - This is the top content</p>-->
<!--  </template>-->
<!--  </Slots>-->
<Slots v-slot="props">
  {{props.message}}
</Slots>
</template>

<style scoped>
/* Add any parent-specific styling if needed */
</style>
