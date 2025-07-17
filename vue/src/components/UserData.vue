<script setup lang="ts">
import UserPassword from "./UserPassword.vue";
import UserLogin from "./UserLogin.vue";
import UserLabel from "./UserLabel.vue";
import UserType from "./UserType.vue";

import type {User} from "../types/user.ts";
import type {PropType} from "vue";

const props = defineProps({
  user: { type: Object as PropType<User>, required: true},
  index: { type: Number, required: true}
})

const emit = defineEmits<{
  /** Удалить пользователя **/
  deleteUser: [index: number];

}>();

</script>

<template>
  <div class="row my-3">
    <div class="col">
      <UserLabel v-model="props.user.labels"/>
    </div>
    <div class="col">
      <UserType v-model="props.user.type"/>
    </div>
    <div class="col">
      <UserLogin v-model="props.user.login"/>
    </div>
    <div class="col">
      <UserPassword v-model="props.user.password"/>
    </div>

    <div class="col-1">
      <button class="btn btn-outline-secondary" @click="emit('deleteUser', props.index);">X</button>
    </div>

  </div>
</template>