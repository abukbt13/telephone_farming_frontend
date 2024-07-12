<script setup>

import RecentChats from "@/components/RecentChats.vue";
</script>


<template>
  <div class="chat-carrier">
    <RecentChats />
  </div>
 <div class="home-chat">
   <div class="newchat d-flex justify-content-center align-items-center">
     <div class="d">
       <p>Select Chat or create new chat</p>
     </div>
   </div>
 </div>
</template>

<style scoped>
.newchat{
  display: block;
  width: 85vw;
  border-right: 2px solid grey;
  height: 100vh;
}
.chat-carrier{
  display: none;
}
@media screen and (min-width: 300px) and (max-width: 500px) {
  .home-chat{
    display: none;
  }
  .chat-carrier{
    display: block;
  }

}

</style>