<template>
  <div>
    <nav>
      <li v-for="(link, i) in navLinks" :key="i">
        <router-link :to="link.url">{{ link.text }}</router-link>
      </li>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

const navLinks = [
  {
    url: "/roadmap/roadmap-Pinia-main/create-form",
    text: "Create form",
  },
  {
    url: "/roadmap/roadmap-Pinia-main/form-list",
    text: "Form list",
  },
];
</script>

<style lang="scss" scoped></style>
