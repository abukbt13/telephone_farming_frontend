<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import { auth } from "@/compossables/auth.js";
import {Modal} from "bootstrap";
const { base_url, authHeader } = auth();
const emit = defineEmits(['response']);
const title = ref('');
const description = ref('');
const link = ref('');
const status = ref('');
const category = ref('');
const id = ref('');
const props = defineProps(['id']);
if (!props.id) {
  id.value = '';
  // alert(id);
} else {
  id.value = props.id;
  // alert(id.value);
  // Do something with props.id if needed
}
const isTitleValid = (title) => {
  const words = title.trim().split(/\s+/);
  return words.length <= 5;
};

const isDescriptionValid = (description) => {
  const words = description.trim().split(/\s+/);
  return words.length <= 30;
};

const isValidYoutubeLink = (link) => {
  // Regex to check if the link is a valid YouTube URL
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=)|youtu\.be\/)[\w-]{11}$/;
  return youtubeRegex.test(link);
};

const saveYoutubeVideo = async () => {
  if (!isTitleValid(title.value)) {
    emit('response', 'Title should not be longer than 5 words.');
    return;
  }

  if (!isDescriptionValid(description.value)) {
    emit('response', 'Description should not be greater than 30 words.');
    return;
  }

  if (!isValidYoutubeLink(link.value)) {
    emit('response', 'Please provide a valid YouTube link.');
    return;
  }
  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('title', title.value);
  formData.append('link', link.value);
  formData.append('category', category.value);
  function clearForm(){
    description.value = ''
    title.value = ''
    link.value = ''
  }
  try {
    const res = await axios.post(base_url.value + 'v1/youtube', formData, authHeader);
    if (res.data.status === 'success') {
      clearForm()
      // Display the success message
      await Swal.fire(
          'Success!',
          'Video saved Successfully',
          'success'
      );
      const modalElement = document.getElementById('youtube');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();
      emit('response', 'Saved successfully.');
    } else {

      status.value = res.errors; // Handle failure case
    }
  } catch (error) {
    console.error("Error:", error);
    status.value = "Are you logged in? ,,,Login to proceed.";
  }
};
</script>

<template>
  <div class="modal fade" id="youtube" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload YouTube Link {{props.id}} </h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="" v-if="status">
            <p class="p-2 bg-danger text-uppercase text-white">{{status}}</p>
          </div>
          <form  @submit.prevent="saveYoutubeVideo" class="m-2">
            <div class="">
              <label for="">
                Title
              </label>
              <input type="text" class="form-control"  v-model="title" >
            </div>
            <div class="">
              <label for="">
                Description
              </label>
              <textarea  v-model="description"  rows="5" class="form-control"></textarea>
            </div>
            <div class="">
              <label for="">
                Link
              </label>
              <input type="text" class="form-control"  v-model="link" >
            </div>
            <div class="">
              <label for="">
                Category
              </label>
              <select required v-model="category" class="form-control">
                <option disabled="" selected="" value="">Select an category</option>
                <option value="others">Others</option>
                <option value="poultry_farming">Poultry farming</option>
                <option value="vegetable_farming">Vegetable farming</option>
                <option value="horticulture">Horticulture</option>
                <option value="bee_keeping">Bee keeping</option>
                <option value="fish_farming">Fish farming</option>
                <option value="livestock_farming">Livestock farming (Cattle, sheep, goat)</option>
                <option value="rabbit_keeping">Rabbit keeping</option>
              </select>
            </div>

            <div class="mt-2">
              <button  type="submit" class="btn btn-primary mt-2 w-25 float-end">Save Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>