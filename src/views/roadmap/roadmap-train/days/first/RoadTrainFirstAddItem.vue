<template>
  <div>
    <input
      type="text"
      class="border"
      v-model="itemName"
      placeholder="Name"
    >
    <input
      type="text"
      class="border"
      v-model="itemAge"
      placeholder="age"
    >
    <input
      type="text"
      class="border"
      v-model="itemEmail"
      placeholder="Email"
    >
    <button @click="handleAddToList">Add</button>
  </div>
</template>


<script setup>


</script>


