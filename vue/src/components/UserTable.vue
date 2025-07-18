<script setup lang="ts">
import UserData from "./UserData.vue";
import type {User} from "../types/user.ts";
import {useUserStore} from "../stores/userStore.ts";
import {ref} from "vue";

const userStore = useUserStore();
const usersList = ref<Array<User & {temp?: boolean}>>([...userStore.users]);

defineExpose({
  /** Добавить временную запись о пользователе */
  addTempUser(): void {
    usersList.value.push({
      labels: [],
      type: 'local',
      login: '',
      password: null,
      temp: true,
    })
  },
});

/**
 * Обновление списка пользователей
 */
function updateUserList() {
  usersList.value = [...userStore.users]
}

/**
 * Удаление пользователя
 */
function UserDeleteHandler(index: number): void {
  userStore.deleteUser(index)
  updateUserList()
}

/**
 * Добавление пользователя
 */
function UserAddHandler(user: User): void {
  userStore.addUser(user)
  updateUserList()
}

/**
 * Обновление пользователя
 */
function UserUpdateHandler(index: number, user: User): void {
  userStore.updateUser(index, user)
  updateUserList()
}
</script>

<template>
  <div class="row mt-4 labels">
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
      :temp="user.temp"
      @delete-user="UserDeleteHandler"
      @add-user="UserAddHandler"
      @update-user="UserUpdateHandler"
  />

</template>
