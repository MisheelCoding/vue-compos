<template>
  <li class="flex gap-4">
    <input type="checkbox" :checked="task.done" @change="toggleStatus" />
    <span :class="['transition', task.done ? 'line-through opacity-30' : '']">{{
      task.title
    }}</span>
    <div class="border-l pl-3 gap-2 flex">
      <button class="cursor-pointer" @click="emit('edit-task', task)">✏️</button>
      <button class="cursor-pointer" @click="emit('delete-task', task.id)">🗑️</button>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["edit-task", "delete-task", "toggle-status"]);
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  idx: Number,
});

const taskDone = ref(false);

function toggleStatus() {
  taskDone.value = !taskDone.value;
  emit("toggle-status", props.task.id);
}
</script>
