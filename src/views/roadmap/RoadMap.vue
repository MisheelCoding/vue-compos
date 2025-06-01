<template>
  <div>
    <h1 class="text-3xl text-center text-indigo-400">Frontend roadmap training and practice</h1>

    <nav>
      <ul class="flex gap-5 flex-wrap">
        <li
          class="underline decoration-emerald-400 underline-offset-4"
          v-for="(link, i) in navLi"
          :key="i"
        >
          <router-link :to="link.url">{{ link.text }}</router-link>
        </li>
      </ul>
    </nav>

    <router-view> </router-view>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";

const navLi = [
  {
    url: "/roadmap/roadmap-Pinia-main",
    text: "Pinia",
  },
  {
    url: "/roadmap/roadmap-train",
    text: "Train",
  },
];
</script>
