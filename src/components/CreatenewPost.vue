<script setup>

    import axios from "axios";
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import {auth} from "@/compossables/auth.js";
    import { Modal } from 'bootstrap';
    import {commons} from "@/compossables/commons.js";
    import Swal from "sweetalert2";

    const { base_url,storage, authUser, authHeader, multipartHeader } = auth();

    const route = useRoute();

    const description = ref('');
    const status = ref('');
    const group_id = ref('');
    const comment = ref('');
    const post_status = ref('');
    const videos = ref([]);
    const photos = ref([]);

    const emit = defineEmits(['postResponse']);

    const props = defineProps({
      newdata:Object
    });

    const userData = ref(props.newdata)
    function clearform() {
      description.value = '';
      photos.value = '';
      videos.value = '';
    }
    function uploadPictures(e) {
      const files = e.target.files;
      photos.value = []; // Clear the array before adding new files
      for (let i = 0; i < files.length; i++) {
        photos.value.push(files[i]);
      }
    }

    function uploadVideos(e) {
      const files = e.target.files;
      videos.value = []; // Clear the array before adding new files
      for (let i = 0; i < files.length; i++) {
        videos.value.push(files[i]);
      }
    }

    const createPost = async () => {

      if(description.value ===''){
        post_status.value = "Description is required"
      }

      const formData = new FormData();
      formData.append('description', description.value);
      if(userData.value.group_id != null) {
        formData.append('group_id', userData.value.group_id);
      }


      for (let i = 0; i < photos.value.length; i++) {
        formData.append('photos[]', photos.value[i]);
      }

      for (let i = 0; i < videos.value.length; i++) {
        formData.append('videos[]', videos.value[i]);
      }
      const res = await axios.post(base_url.value + 'v1/post', formData, multipartHeader);
      if (res.data.status === 'success') {
        clearform();
       // await Swal.fire(
       //      'Success!',
       //      'Post created Successfully',
       //      'success'
       //  )
        emit('postResponse');
        const modalElement = document.getElementById('create_post');
        const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
        bootstrapModal.hide();
      } else {
        emit('postResponse', res.data.message);
      }
    };

//     create comment
  const CommentPost = async () => {
      if (comment.value === '') {
        alert('Type a message');
        return;
      }

      const formData = new FormData();
      formData.append('comment', comment.value);

      const res = await axios.post(base_url.value + 'v1/posts/'+userData.value.post_id+'/comments', formData, authHeader);
      if (res.data.status === 'success') {
       emit("postResponse",res.data.message)

      } else {
        emit('postResponse', res.data.message);
      }

    };


</script>

<template>

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

            <div class="">
              <div v-if="post_status"  style="background: red;" class="p-1  text-white">{{post_status}}</div>
              <textarea v-model="description" cols="4" rows="4" class="form-control"></textarea>

              <div class="d-flex mt-2">
                <p>
                  Add photos <br>
                  <i class="bi bi-images"></i><br>
                  <input @change="uploadPictures" multiple type="file">
                </p>
              </div>

              <button type="submit" class="btn btn-primary mt-2 w-50">Create Post</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="comment" tabindex="-1" aria-labelledby="createpost" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          {{userdata}}
          <h1 class="modal-title fs-5" id="exampleModalLabel">Comment</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="m-3">
          <form @submit.prevent="CommentPost">
            <h3>Description</h3>
            <textarea v-model="comment" cols="4" rows="4" class="form-control"></textarea>
            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Comment</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>