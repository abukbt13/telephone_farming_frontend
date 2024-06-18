<script setup>

import Header from "@/components/includes/Header.vue";
</script>

<template>
  <Header />
<div class="row">
    <div class="col bg-dark col-4">
      <h2>Dashboard</h2>
      <ul>
        <li><router-link to="/">Add progress</router-link></li>
        <li><router-link to="/">Create Budget</router-link></li>
      </ul>
    </div>
    <div class="col col-8">
      <h2>Progresses</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Photos</th>
            <th>type</th>
            <th>description</th>
            <th>Operation</th>
            <th>#</th>
          </tr>
        <tbody>
            <tr>
              <td>2</td>
              <td>picture here</td>
              <td>description</td>
              <td><button class="btn btn-primary">View more</button></td>
              <td><button class="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
        </thead>
      </table>
    </div>
</div>
</template>

<style scoped>

</style>