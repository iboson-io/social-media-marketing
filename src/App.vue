<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <router-link to="/home">Home</router-link>
    <RouterView />
  </div>
</template>