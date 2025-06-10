<template>
  <nav>
    <ul>
      <li v-for="(l, i) in links" :key="i">
        <RouterLink :to="l.url">{{ l.text }}</RouterLink>
      </li>
    </ul>
  </nav>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
// import RoadMapTrainFirst from "@/views/roadmap/roadmap-train/days/RoadMapTrainFirst.vue";
// import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const links = [
  {
    url: { name: "roadmap-train-first" },
    text: "first",
  },
];
</script>
