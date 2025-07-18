<script setup lang="ts">
import type {User} from "../types/user.ts";
import {type PropType, ref} from "vue";

const props = defineProps({
  user: { type: Object as PropType<User & {temp?: boolean}>, required: true},
  index: { type: Number, required: true},
})

const login_not_valid = ref<boolean>(false);
const password_not_valid = ref<boolean>(false);

const is_focused = ref<boolean>(false);

const emit = defineEmits<{
  /** Удалить пользователя **/
  deleteUser: [index: number];

  /** Сохранить пользователя **/
  addUser: [user: User];

  /** Обновить пользователя **/
  updateUser: [index: number, user: User];
}>();

let blurTimeout: number | null = null;

/**
 * Отслеживание снятие фокуса
 */
function blurHandler(): void {
  is_focused.value = false;

  if (blurTimeout) {
    clearTimeout(blurTimeout);
  }

  // Задержка на случай, если был установлен фокус на другом поле
  blurTimeout = setTimeout(() => {
    if (!is_focused.value) {
      checkUserForm();
    }
    blurTimeout = null;
  }, 50);

}

/**
 * Проверка формы
 */
function checkUserForm(){
  let is_correct = true;

  if (props.user?.login.length === 0){
    login_not_valid.value = true;
    is_correct = false;
  }

  if (
      props.user?.type !== 'local' &&
      props.user?.password?.length === 0
  ) {
    password_not_valid.value = true;
    is_correct = false;
  }

  if (is_correct) sendForm();
}

/**
 * Отправка формы
 */
function sendForm(){
  if (props.user.temp !== undefined){
    delete props.user.temp;
    emit('addUser', props.user);
  }
  else
    emit('updateUser', props.index, props.user)
}

</script>

<template>
  <div class="row my-3">
    <div class="col">
      <input v-model="props.user.labels"
             class="form-control"
             maxlength="50"
             @focus="is_focused = true"
             @blur="blurHandler"
      >
    </div>

    <div class="col">
      <select v-model="props.user.type"
              class="form-select"
              @focus="is_focused = true"
              @blur="blurHandler">
        <option value="local">
          local
        </option>
        <option value="LDAP">
          LDAP
        </option>
      </select>
    </div>

    <div class="col">
      <input v-model="props.user.login"
             class="form-control"
             :class="{'is-invalid': login_not_valid}"
             maxlength="100"
             @focus="is_focused = true"
             @blur="blurHandler">
    </div>

    <div class="col">
      <input v-model="props.user.password"
             :disabled="props.user.type === 'local'"
             class="form-control"
             :class="{'is-invalid': password_not_valid}"
             type="password"
             maxlength="100"
             @focus="is_focused = true"
             @blur="blurHandler"
      >
    </div>

    <div class="col-1">
      <button class="btn btn-outline-secondary" @click="emit('deleteUser', props.index);">X</button>
    </div>

  </div>
</template>