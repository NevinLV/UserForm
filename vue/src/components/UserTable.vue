<script setup lang="ts">
import UserData from "./UserData.vue";
import type {User} from "../types/user.ts";
import {useUserStore} from "../stores/userStore.ts";
import {ref} from "vue";

const userStore = useUserStore();
const usersList = ref<Array<User & {status?: "new"}>>([...userStore.users]);

defineExpose({
  /** Добавить временную запись о пользователе */
  addTempUser(): void {
    usersList.value.push({
      labels: [],
      type: 'local',
      login: '',
      password: null,
      status: "new",
    })
  },
});

function updateUserList() {
  console.log(userStore.users)
  usersList.value = []
  usersList.value = userStore.users
}

function UserDeleteHandler(index: number): void {
  userStore.deleteUser(index)
  updateUserList()
}

function UserAddHandler(user: User): void {
  userStore.addUser(user)
  updateUserList()
}

function UserUpdateHandler(index: number, user: User): void {
  userStore.updateUser(index, user)
  updateUserList()
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
      v-for="(user, index) in usersList"
      :user="user"
      :index="index"
      :status="user.status"
      @delete-user="UserDeleteHandler"
      @add-user="UserAddHandler"
      @update-user="UserUpdateHandler"
  />

</template>
