<script setup lang="ts">

import UserPassword from "./UserPassword.vue";
import UserLogin from "./UserLogin.vue";
import UserLabel from "./UserLabel.vue";
import UserType from "./UserType.vue";
</script>

<template>
  <div class="row">
    <div class="col">
      <UserLabel/>
    </div>
    <div class="col">
      <UserType/>
    </div>
    <div class="col">
      <UserLogin/>
    </div>
    <div class="col">
      <UserPassword/>
    </div>

  </div>
</template>

<style scoped>

</style>