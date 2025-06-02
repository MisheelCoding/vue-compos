<template>
  <div>
    <h1>First edit from T-shield</h1>

    <div>
      <h2>filters</h2>
      <div class="flex justify-between">
        <input type="search" placeholder="filter with search" />
      </div>
    </div>
    <ul class="items-list">
      <li v-for="(item, i) in list" :key="i" class="flex flex-col">
        <b> Name - {{ item.name }}</b>
        <span>age - {{ item.age }}</span>
        <i>Email - {{ item.email }}</i>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const itemName = ref("");
const itemAge = ref("");
const itemEmail = ref("");
const list = ref([]);

function handleAddToList() {
  const name = itemName.value.trim();

  if (!name || !itemEmail.value || !itemAge.value) {
    console.log("empty");
    return;
  }
  const newItem = {
    id: Date.now(),
    age: itemAge.value.trim(),
    email: itemEmail.value.trim(),
    name,
  };
  list.value.push(newItem);
  itemName.value = "";
  itemAge.value = "";
  itemEmail.value = "";
  console.log(list);
}
</script>
