<script setup lang="ts">
import UserTable from "../components/UserTable.vue";
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-auto">
        <h1>Учётные записи</h1>
      </div>
      <div class="col">
        <button class="btn btn-outline-secondary">
          +
        </button>
      </div>
    </div>
    <div class="help">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <UserTable/>

  </div>
</template>
