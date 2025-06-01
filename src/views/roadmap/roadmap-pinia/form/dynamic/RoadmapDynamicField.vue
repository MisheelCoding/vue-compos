<template>
  <div>
    <label v-if="['text', 'number', 'email', 'date'].includes(type)">
      <b>{{ label }}</b>
      <input :type="type" />
    </label>
    <div v-else-if="type === 'radio' || type === 'checkbox'">
      <b>{{ label }}</b>
      <label v-for="(answer, i) in options" :key="i">
        <input :type="type" name="choose" />
      </label>
    </div>
    <label v-else-if="type === 'select'">
      <b>{{ label }}</b>
    </label>
  </div>
</template>

<script setup>
defineProps({
  type: String,
  label: String,
  answer: [String || Array || Number],
  options: Array,
});
</script>
