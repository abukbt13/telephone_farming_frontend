<script setup>

    import axios from "axios";
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import {auth} from "@/compossables/auth.js";

    const { base_url,storage, authUser, authHeader, multipartHeader } = auth();
    const route = useRoute();

    const description = ref('');
    const status = ref('');
    const group_id = ref('');
    const videos = ref([]);
    const photos = ref([]);

    const emit = defineEmits(['postCreated', 'postFailed']);
    const new_group_id=defineProps({new_group_id:String})

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


      const formData = new FormData();
      formData.append('description', description.value);
      if(new_group_id.new_group_id != null) {
        formData.append('group_id', new_group_id.new_group_id);
      };

      for (let i = 0; i < photos.value.length; i++) {
        formData.append('photos[]', photos.value[i]);
      }

      for (let i = 0; i < videos.value.length; i++) {
        formData.append('videos[]', videos.value[i]);
      }
      const res = await axios.post(base_url.value + 'v1/post', formData, multipartHeader);
      if (res.data.status === 'success') {
        // status.value = res.data.message;
        emit('postCreated');
        // getPosts();
      } else {
        emit('postFailed', res.data.message);
        status.value = 'Something went wrong';
      }
    };

</script>

<template>
<!--  {{new_group_id}}-->
<!--  <button  data-bs-toggle="modal" data-bs-target="#create_post" style="background:#0dcaf0;" class="btn btn-sm">-->
<!--    <i class="fa bi-plus" ></i>-->
<!--    Create post-->
<!--  </button>-->

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
            <textarea v-model="description" cols="4" rows="4" class="form-control"></textarea>

            <div class="d-flex mt-2">
              <p>
                Add photos <br>
                <i class="bi bi-images"></i><br>
                <input @change="uploadPictures" multiple type="file">
              </p>
              <!--                <p>-->
              <!--                  Add Videos <br>-->
              <!--                  <i class="bi bi-camera-video"></i><br>-->
              <!--                  <input @change="uploadVideos" multiple type="file">-->
              <!--                </p>-->
            </div>

            <button type="submit" data-bs-dismiss="modal" class="btn btn-primary mt-2 w-50">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>