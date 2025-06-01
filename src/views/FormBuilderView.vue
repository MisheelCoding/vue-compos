<template>
  <div>
    <h1 class="text-center text-2xl font-bold">Welcome form Bulder!</h1>

    <nav>
      <ul class="flex gap-4 justify-center mt-5">
        <li>
          <router-link to="create-form">Create form</router-link>
        </li>
        <li>
          <router-link to="view-form">View forms</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style lang="scss" scoped></style>
