<template>
  <ul class="space-y-2">
    <li v-for="(item, index) in props.items" :key="index" class="p-2 border rounded-xl">
      <slot :item="item" :index="index" />
    </li>
  </ul>

  <div>
    <h2>Provided items</h2>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="handleLog">provide</button>
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  items: Array,
});
const user = inject("user");

const handleLog = () => console.log(`Привет ${user.value.name}`);
</script>
