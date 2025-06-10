<template>
  <div class="flex gap-5">
    <input
      class="border-b"
      v-model="taskTitle"
      placeholder="Write your task"
      type="text"
      @keydown.enter="handleAdd"
    />
    <button
      class="rounded-3xl w-[150px] h-[40px] cursor-pointer hover:bg-indigo-300 bg-indigo-200 transition hover:border-0 text-white"
      @click="handleAdd"
    >
      Add task
    </button>
  </div>
  <div class="error text-red-500" v-if="error">Длина поля должна быть больше 1 символа</div>
</template>

<script setup>
import { ref, watch } from "vue";
const emit = defineEmits(["add-task"]);

const taskTitle = ref("");
const error = ref(false);

function handleAdd() {
  const title = taskTitle.value.trim();
  if (title.length < 2) {
    error.value = true;
    return;
  }
  const newtask = {
    id: Date.now(),
    title,
    done: false,
    edit: false,
  };
  emit("add-task", newtask);
  taskTitle.value = "";
  error.value = false;
}

let debounceTimer = null;
watch(taskTitle, (newVal) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (newVal.trim().length >= 2) {
      error.value = false;
    }
  }, 400);
});
</script>
