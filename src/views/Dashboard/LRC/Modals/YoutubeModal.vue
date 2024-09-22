<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref } from "vue";
import { auth } from "@/compossables/auth.js";
const { base_url, authHeader } = auth();
const emit = defineEmits(['response']);
const title = ref('');
const description = ref('');
const link = ref('');
const status = ref('');
const category = ref('others');

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
    } else {
      status.value = res.data.message; // Handle failure case
    }
  } catch (error) {
    console.error("Error:", error);
    status.value = "An error occurred. Please try again.";
  }
};
</script>

<template>
  <div class="modal fade" id="youtube" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload YouTube Link </h1>            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <select v-model="category" class="form-control">
                <option value="others">Others</option>
                <option value="vegetable_farming">Vegetable farming</option>
                <option value="poultry_farming">Poultry</option>
                <option value="Cash_crop_farming">Cash Crop farming</option>
                <option value="Fish_farming">Fish Farming</option>
                <option value="motivation">Motivation</option>
                <option value="web_development">Web Development</option>
                <option value="construction">Construction</option>
                <option value="news">News</option>
                <option value="innovations">Innovations</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="religion">Religion</option>
                <option value="technology">Technology</option>
                <option value="health_wellness">Health & Wellness</option>
                <option value="education">Education</option>
                <option value="travel_adventure">Travel & Adventure</option>
                <option value="finance_business">Finance & Business</option>
                <option value="diy_crafts">DIY & Crafts</option>
                <option value="gaming">Gaming</option>
                <option value="food_cooking">Food & Cooking</option>
                <option value="automotive">Automotive</option>
                <option value="science_nature">Science & Nature</option>
                <option value="fashion_beauty">Fashion & Beauty</option>
                <option value="lifestyle_vlogs">Lifestyle & Vlogs</option>
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