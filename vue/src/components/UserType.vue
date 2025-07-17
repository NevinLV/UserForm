<script setup lang="ts">
const userTypes = [
    'local',
    'LDAP'
]
</script>

<template>
<select class="form-select">
  <option v-for="type of userTypes">
    {{type}}
  </option>
</select>
</template>
