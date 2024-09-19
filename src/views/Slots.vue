<script setup>
 import {ref} from "vue";

 const message = ref('Hello World!')
</script>

<template>
  <div>
<!--    <button class="btn btn-success">-->
<!--      <slot name="footer">Footer</slot> &lt;!&ndash; Slot for the footer content &ndash;&gt;-->
<!--    </button>-->
<!--    <button class="btn btn-success">-->
<!--      <slot name="top">Top</slot> &lt;!&ndash; Slot for the top content &ndash;&gt;-->
<!--    </button>-->
    <button>Hello</button>
  <slot :message="message"></slot>
  </div>
</template>

<style scoped>
/* Add some styling if needed */
</style>
