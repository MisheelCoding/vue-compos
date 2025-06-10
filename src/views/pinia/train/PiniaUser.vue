<template>
  <div>
    <h1>Pinia User</h1>
    {{ counter.count }}
  </div>
</template>

<script setup>
import { useCounter } from "@/stores/counter";
const counter = useCounter();
</script>

<style lang="scss" scoped></style>
