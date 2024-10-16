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
} else {
  id.value = props.id;
}

const isTitleValid = (title) => {
  const words = title.trim().split(/\s+/);
  return words.length <= 5;
};

const isDescriptionValid = (description) => {
  const words = description.trim().split(/\s+/);
  return words.length <= 30;
};

const extractYoutubeLink = (link) => {
  link = link.trim(); // Trim spaces from the link

  // Regex to capture YouTube video ID from different types of URLs
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|playlist\?list=)|youtu\.be\/)([\w-]{11})/;

  const match = link.match(youtubeRegex); // Match the link against the regex

  if (match && match[1]) {
    const videoId = match[1]; // Extract the video ID
    return `https://www.youtube.com/watch?v=${videoId}`; // Return the valid YouTube link
  } else {
    return null; // Return null if no valid video ID is found
  }
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

  const validLink = extractYoutubeLink(link.value);
  if (!validLink) {
    emit('response', 'Please provide a valid YouTube link.');
    return;
  }

  const formData = new FormData();
  formData.append('description', description.value);
  formData.append('title', title.value);
  formData.append('link', validLink); // Use the extracted valid YouTube link
  formData.append('category', category.value);

  function clearForm() {
    description.value = '';
    title.value = '';
    link.value = '';
  }

  try {
    const res = await axios.post(base_url.value + 'v1/youtube', formData, authHeader);
    if (res.data.status === 'success') {
      clearForm();
      // Display the success message
      await Swal.fire('Success!', 'Video saved successfully', 'success');

      const modalElement = document.getElementById('youtube');
      const bootstrapModal = Modal.getInstance(modalElement) || new Modal(modalElement);
      bootstrapModal.hide();

      emit('response', 'Saved successfully.');
    } else {
      status.value = res.data.errors; // Handle failure case
    }
  } catch (error) {
    console.error("Error:", error);
    status.value = "Are you logged in? Please log in to proceed.";
  }
};
</script>

<template>
  <div class="modal fade" id="youtube" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload YouTube Link {{ id }} </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="status">
            <p class="p-2 bg-danger text-uppercase text-white">{{ status }}</p>
          </div>
          <form @submit.prevent="saveYoutubeVideo" class="m-2">
            <div>
              <label>Title</label>
              <input type="text" class="form-control" v-model="title" required>
            </div>
            <div>
              <label>Description</label>
              <textarea v-model="description" rows="5" class="form-control" required></textarea>
            </div>
            <div>
              <label>Link</label>
              <input type="text" class="form-control" v-model="link" required>
            </div>
            <div>
              <label>Category</label>
              <select v-model="category" class="form-control" required>
                <option disabled selected value="">Select a category</option>
                <option value="others">Others</option>
                <option value="poultry_farming">Poultry farming</option>
                <option value="vegetable_farming">Vegetable farming</option>
                <option value="horticulture">Horticulture</option>
                <option value="bee_keeping">Bee keeping</option>
                <option value="fish_farming">Fish farming</option>
                <option value="livestock_farming">Livestock farming (Cattle, sheep, goat)</option>
                <option value="mixed_farming">Mixed farming</option>
              </select>
            </div>

            <div class="mt-2">
              <button type="submit" class="btn btn-primary mt-2 w-25 float-end">Save Link</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
