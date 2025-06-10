<template>
  <div>
    <h1>Pinia counter</h1>

    <p class="text-2xl">{{ counter.count }}</p>
    <p class="text-2xl text-gray-500">{{ counter.doubleCount }}"></p>
    <div>
      <button @click="counter.increment">increment</button>
      <button @click="counter.resetCount">resest</button>
    </div>
  </div>
</template>

<script setup>
import { useCounter } from "@/stores/counter";

const counter = useCounter();
</script>

<style lang="scss" scoped></style>
