<script setup lang="ts">
import UserTable from "../components/UserTable.vue";
import AddIcon from "../components/icons/AddIcon.vue";
import HelpIcon from "../components/icons/HelpIcon.vue";
import {ref} from "vue";
const userTableRef = ref<typeof UserTable| null>(null);

/** Добавить новую запись о пользователе */
function addNewUser(): void {
  if (userTableRef.value !== null) userTableRef.value.addTempUser();
}

</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-auto">
        <h1>Учётные записи</h1>
      </div>
      <div class="col">
        <button class="btn btn-outline-secondary add-btn" @click="addNewUser">
          <AddIcon/>
        </button>
      </div>
    </div>
    <div class="help">
      <HelpIcon/>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <UserTable ref="userTableRef"/>

  </div>
</template>
