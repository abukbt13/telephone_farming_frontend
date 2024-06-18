<script setup>

</script>

<template>
  <div   class="sidebar d-none d-md-block d-lg-block ps-2">
    <h2 class="text-uppercase">Dashboard</h2>
    <router-link  class="text-decoration-none link" to="/telephone_farmer/farm"><li  class="fs-3 list-unstyled border-bottom ps-3">Farms</li></router-link>
    <router-link class="text-decoration-none link" to="/user/loans"><li class="fs-3 list-unstyled border-bottom ps-3">Farm Managers</li></router-link>
    <router-link class="text-decoration-none link" to="/user/savings"><li class="fs-3 list-unstyled border-bottom ps-3">Expenses</li></router-link>
    <router-link class="text-decoration-none link" to="/user/emergency"><li class="fs-3 list-unstyled border-bottom ps-3">Market</li></router-link>
  </div>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Quick links</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <router-link     class="text-decoration-none link" to="/telephone_farmer/farm"><li data-bs-dismiss="offcanvas"   class="fs-3 list-unstyled border-bottom ps-3">Farms</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/loans" ><li data-bs-dismiss="offcanvas"   class="fs-3 list-unstyled border-bottom ps-3">Farm Managers</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/savings"><li data-bs-dismiss="offcanvas"  class="fs-3 list-unstyled border-bottom ps-3">Expenses</li></router-link>
      <router-link   class="text-decoration-none link" to="/user/users"><li data-bs-dismiss="offcanvas"  class="fs-3 list-unstyled border-bottom ps-3">Market</li></router-link>
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