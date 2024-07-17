<script setup>

</script>

<template>
  <div class="border d-flex flex-column align-items-center">
    <div class="card">
<!--      <img src="/img_2.png" class="card-img-top" alt="...">-->
      <div class="card-body">picture here
        <h5 class="card-title">Fish Farming</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  </div>
  <div  style="background: #dddddd;"  class="p-1 sticky-top  d-flex justify-content-between align-items-center">
    <p class="modal-title" id="createpost">What is on your mind</p>
    <button  data-bs-toggle="modal" data-bs-target="#create_post" style="background:#0dcaf0;" class="btn btn-sm">
      <i class="fa bi-plus" ></i>
      Create post
    </button>
  </div>

<!--  //create a post-->
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