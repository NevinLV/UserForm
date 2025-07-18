<script setup lang="ts">
import DeleteIcon from "./icons/DeleteIcon.vue";
import type {User} from "../types/user.ts";
import {type PropType, ref} from "vue";

const props = defineProps({
  user: { type: Object as PropType<User & {temp?: boolean}>, required: true},
  index: { type: Number, required: true},
})
const labelsToString = (labels: { text: string }[] | undefined): string => {
  if (!labels || !Array.isArray(labels)) return '';
  return labels.map(label => label.text).filter(Boolean).join('; ');
};

const stringToLabels = (str: string): { text: string }[] => {
  return str.split(';')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(text => ({ text }));
};


const tempUser = ref<User & {temp?: boolean}>({...props.user});
const tempLabels = ref<string>(labelsToString(tempUser.value.labels));

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

  if (tempUser.value?.login.length === 0){
    login_not_valid.value = true;
    is_correct = false;
  }


  if (
      tempUser.value?.type !== 'local' && tempUser.value?.password === null ||
      tempUser.value?.password !== null && tempUser.value.password.length === 0
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
  tempUser.value.labels = stringToLabels(tempLabels.value)

  if (props.user.temp !== undefined){
    delete tempUser.value.temp;
    emit('addUser', tempUser.value);
  }
  else
    emit('updateUser', props.index, tempUser.value)
}

</script>

<template>
  <div class="row my-3">
    <div class="col">
      <input v-model="tempLabels"
             class="form-control"
             maxlength="50"
             @focus="is_focused = true"
             @blur="blurHandler"
      >
    </div>

    <div class="col">
      <select v-model="tempUser.type"
              class="form-select"
              @focus="is_focused = true"
              @blur="blurHandler"
              @change="password_not_valid = false">
        <option value="local">
          local
        </option>
        <option value="LDAP">
          LDAP
        </option>
      </select>
    </div>

    <div class="col">
      <input v-model="tempUser.login"
             class="form-control"
             :class="{'is-invalid': login_not_valid}"
             maxlength="100"
             @input="login_not_valid = false"
             @focus="is_focused = true"
             @blur="blurHandler">
    </div>

    <div class="col">
      <input v-model="tempUser.password"
             :disabled="tempUser.type === 'local'"
             class="form-control"
             :class="{'is-invalid': password_not_valid}"
             type="password"
             maxlength="100"
             @input="password_not_valid = false"
             @focus="is_focused = true"
             @blur="blurHandler"
      >
    </div>

    <div class="col-1">
      <button class="btn btn-outline-danger" @click="emit('deleteUser', props.index);">
        <DeleteIcon/>
      </button>
    </div>

  </div>
</template>