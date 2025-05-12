<template>
  <div>
    <h1>Card Third</h1>
    <div class="container">
      <div>
        <h2>its items from formThird</h2>

        <li v-for="(item, idx) in props.items" :key="idx">
          <p>Name: {{ item.name }}</p>
          <p>Email: {{ item.email }}</p>
          <button @click="$emit('delete-item', idx)">Delete</button>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  items: Array,
});
defineEmits(["delete-item"]);
</script>

<style lang="scss" scoped></style>
