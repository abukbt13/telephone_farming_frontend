<script setup>

</script>

<template>
  <div   class="sidebar d-none d-md-block d-lg-block ps-2">
    <h2 class="text-uppercase">Dashboard</h2>
    <router-link  class="text-decoration-none link" to="/user/dashboard"><li  class="fs-3 list-unstyled border-bottom ps-3">Home</li></router-link>
    <router-link class="text-decoration-none link" to="/user/loans"><li class="fs-3 list-unstyled border-bottom ps-3">Loans</li></router-link>
    <router-link class="text-decoration-none link" to="/user/savings"><li class="fs-3 list-unstyled border-bottom ps-3">Savings</li></router-link>
    <router-link class="text-decoration-none link" to="/user/emergency"><li class="fs-3 list-unstyled border-bottom ps-3">Emergency Account</li></router-link>
  </div>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Quick links</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <router-link     class="text-decoration-none link" to="/user/dashboard"><li data-bs-dismiss="offcanvas"   class="fs-3 list-unstyled border-bottom ps-3">Home</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/loans" ><li data-bs-dismiss="offcanvas"   class="fs-3 list-unstyled border-bottom ps-3">Loans</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/savings"><li data-bs-dismiss="offcanvas"  class="fs-3 list-unstyled border-bottom ps-3">Savings</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/users"><li data-bs-dismiss="offcanvas"  class="fs-3 list-unstyled border-bottom ps-3">Users</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/emergency"><li data-bs-dismiss="offcanvas"  class="fs-3 list-unstyled border-bottom ps-3">Emergency  ACC</li></router-link>
    </div>
  </div>

</template>

<style scoped>

.sidebar{
  border-top: 1px solid grey;
  width: 20vw;
  background-color: #CCCCFF;
  height: 87vh;
}
li:hover{
  background-color: red;
}
</style>