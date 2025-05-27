<template>
  <div class="flex flex-row justify-between my-5">
    <router-link to="/">Logo</router-link>
    <nav class="flex gap-5">
      <router-link to="/">Home</router-link>
      <router-link to="/first">First day</router-link>
      <router-link to="/second">Second day</router-link>
      <router-link to="/third">third day</router-link>
      <router-link to="/fourth">fourth day</router-link>
      <router-link to="/fiveth">fiveth day</router-link>
      <router-link to="/computed">Computed</router-link>
      <router-link to="/lifecycle">Lifecycle</router-link>
      <router-link to="/pinia">Pinia</router-link>
      <router-link to="/form">Form</router-link>
      <router-link to="/todo">Todo</router-link>
      <router-link to="/roadmap">RoadMap</router-link>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped></style>
