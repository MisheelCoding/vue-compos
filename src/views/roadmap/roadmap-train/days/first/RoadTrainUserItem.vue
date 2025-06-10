<template>
  <li class="flex items-start">
    <div class="flex flex-col">
      <b> Name - {{ user.name }}</b>
      <span>age - {{ user.age }}</span>
      <i>Email - {{ user.email }}</i>
    </div>
    <button
      @click="emit('remove', user.id)"
      class="text-2xl cursor-pointer hover:text-red-500 transition"
    >
      &times;
    </button>
  </li>
</template>

<script setup>
defineProps({
  user: Object,
});

const emit = defineEmits(["remove"]);
</script>
