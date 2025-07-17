<script setup lang="ts">
import UserData from "./UserData.vue";
import type {User} from "../types/user.ts";
import {useUserStore} from "../stores/userStore.ts";
import {ref} from "vue";

const userStore = useUserStore();
const users = ref<User[]>(userStore.users);

defineExpose({
  /** Добавить временную запись о пользователе */
  addTempUser(): void {
    users.value.push({
      labels: [],
      type: 'local',
      login: '',
      password: undefined
    })
  },
});

function UserDeleteHandler(index: number): void {
  userStore.deleteUser(index)
}

</script>

<template>
  <div class="row mt-5">
    <div class="col">
      Метки
    </div>
    <div class="col">
      Тип записи
    </div>
    <div class="col">
      Логин
    </div>
    <div class="col">
      Пароль
    </div>
    <div class="col-1">
    </div>
  </div>

  <UserData
      v-for="(user, index) in users"
      :user="user"
      :index="index"
      @delete-user="UserDeleteHandler"/>

</template>
