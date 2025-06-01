<template>
  <div>
    <h1>Pinia</h1>
    <nav>
      <router-link to="/pinia/counter">counter</router-link>
      <router-link to="/pinia/cart">cart</router-link>
      <router-link to="/pinia/user">user</router-link>
      <router-link to="/pinia/patch_reset">Patch & reset</router-link>
    </nav>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped></style>
