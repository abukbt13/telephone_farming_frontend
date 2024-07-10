<script setup>

import {onMounted, ref} from "vue";
import {auth} from "@/compossables/auth.js";
import {useRoute} from "vue-router";
import axios from "axios";

const {base_url,authHeader,storage} = auth()
const route = useRoute();
const id = ref('');

const description = ref('')
const messages = ref([]);
// Set the id to the route parameter id
id.value = route.params.id;
const message = ref('')
const status = ref('')
const videos = ref('')
const photos = ref([]);

function uploadPictures(e) {
  const files = e.target.files;
  photos.value = []; // Clear the array before adding new files
  for (let i = 0; i < files.length; i++) {
    photos.value.push(files[i]);
  }
}
const  createPost = async () => {
  if( description.value === ''){
    alert('Type a message')
    return
  }
  const formData = new FormData();
  formData.append('description', description.value)
  formData.append('photos', photos.value)
  formData.append('videos', videos.value)
  const res = await axios.post(base_url.value+'v1/posts/',formData,authHeader)
  if (res.data.status === 'success') {
    // message.value = ''
    // status.value = res.data.message
    // getChat()
  }
  else {

    status.value = 'something went wrong'
  }
}
// const  getChat = async () => {
//   const res = await axios.get(base_url.value + 'chats/chat/'+id.value, authHeader)
//   if(res){
//     messages.value = res.data.messages
//   }
// }
onMounted(()=> {
  // getChat()
})

</script>

<template>
  <div class="align-items-center d-flex justify-content-center">
    <h1 class="modal-title" id="createpost">Create a post </h1>

    <i style="font-size: 49px" class="fa bi-plus" data-bs-toggle="modal" data-bs-target="#create_post" ></i>
  </div>


  <div class="modal fade" id="create_post" tabindex="-1" aria-labelledby="createpost" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="m-3">
          <form @submit.prevent="createPost">
            <h3>Description</h3>
            <textarea v-model="description" id="" cols="4" rows="4" class="form-control"></textarea>
            <div class="d-flex  mt-2" >
              <p>
                Add photos <br>
                <i class="bi bi-images"></i><br>
                <input @change="uploadPictures" multiple type="file">

              </p>
              <p>
                Add Videos <br>
                <i class="bi bi-camera-video"></i><br>
                <input @change="uploadVideos" type="file">
              </p>
            </div>
            <button type="submit" class="btn btn-primary mt-2 w-50">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci autem deleniti dolores dolorum enim eveniet explicabo facere fuga hic ipsum maiores maxime officiis optio praesentium soluta, vero voluptate! Ab accusantium aliquid consectetur dignissimos distinctio error eveniet exercitationem fuga id in neque nulla officiis perspiciatis porro quaerat, quasi qui quibusdam quis quod recusandae sequi similique tempora totam unde velit vero voluptates. Alias, consequatur, dolore doloremque enim illum minus nobis omnis possimus praesentium quos similique temporibus vero voluptatem? Eveniet hic ipsam labore laborum magnam officiis provident velit vero?</p>
</template>

<style scoped>

</style>