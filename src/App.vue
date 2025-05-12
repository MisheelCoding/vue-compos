<template>
  <div class="container mx-auto">
    <h1 class="text-3xl text-center font-bold">Train Composition API</h1>
    <the-nav></the-nav>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import TheNav from "./components/TheNav.vue";
import { provide, ref } from "vue";
const user = ref({ name: "Misheel", email: "misheel@example.com", age: 23 });
provide("user", user);
</script>

<style lang="scss" scoped></style>
