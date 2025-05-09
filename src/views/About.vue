<template>
  <Header />
  <div class="main">
    <section>
      <h2>Welcome to Telefarm Limited Company</h2>
      <p>
        Our company is dedicated to transform agri-business sector through automation in production and marketing strategies.
      </p>
      <p>
        We provide smallholder farmers with trainings on sustainable agricultural produntion and value social networks among them,  we provide various designed innovative inputs that utilizes less space with higher production. we provide remote monitoring technology for transparency on farm operations. 
      </p>
    </section>
    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        Our mission is to support farmers in their day-to-day operations by offering user-friendly tools and valuable educational content. We strive to make farming more accessible and efficient, ultimately contributing to the success and growth of agri-businesses.
      </p>
    </section>
    <section class="services">
      <h2>Our Services</h2>
      <ul>
        <li><strong>Direct Communication:</strong> A platform for farmers to communicate with their farm managers.</li>
        <li><strong>Educational Resources:</strong> Comprehensive materials and training for improved farming practices.</li>
        <li><strong>Technical Support:</strong> Assistance with using our tools and resolving any issues.</li>
      </ul>
    </section>


    <p>&copy; 2024 Telefarm. All rights reserved.</p>
  </div>

</template>

<style>
/* Basic reset */
* {
  .main {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f4f4f4;
}

header {
  background-color: #007bff; /* Blue color */
  color: #fff;
  text-align: center;
  padding: 1rem 0;
}

header h1 {
  margin: 0;
}

main {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #007bff; /* Blue color */
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.intro p {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
}

ul li {
  margin-bottom: 0.5rem;
}

footer {
  background-color: #007bff; /* Blue color */
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
}

</style>
<script setup lang="ts">
import Header from "@/components/includes/Header.vue";
</script>
