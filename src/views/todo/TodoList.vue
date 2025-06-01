<template>
  <div>
    <h1 class="text-center text-2xl">
      Todo <b class="text-red-300">{{ date }}</b>
    </h1>

    <TodoAddTask @add-task="addTask"></TodoAddTask>

    <h2 class="mt-15 text-xl">Задачи</h2>
    <ul>
      <todo-item
        v-for="(t, i) in tasks"
        :key="i"
        :task="t"
        :idx="i"
        @edit-task="editTask"
        @delete-task="deleteTask"
        @toggle-status="toggleStatus"
      ></todo-item>
    </ul>
    <TodoEdit
      v-if="isVisibleModal"
      :task="taskBeingEdited"
      @cancel-edit="isVisibleModal = false"
      @save-edit="saveEdit"
    >
    </TodoEdit>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TodoAddTask from "./TodoAddTask.vue";
import TodoItem from "./TodoItem.vue";
import TodoEdit from "./TodoEdit.vue";

const date = new Date().toLocaleDateString();
const tasks = ref([]);
const isVisibleModal = ref(false);
const taskBeingEdited = ref(null);

function addTask(task) {
  tasks.value.push(task);
  // console.log(tasks);
}

function deleteTask(id) {
  // const idx = tasks.value.findIndex((task) => task.id === id);
  // tasks.value.splice(idx, 1); // <- ✅ работает
  tasks.value = tasks.value.filter((t) => t.id !== id);
  console.log(tasks);
  // tasks.value = tasks.value.splice(idx, 1);
}
function editTask(task) {
  taskBeingEdited.value = { ...task };
  isVisibleModal.value = true;
}

function saveEdit(task) {
  const idx = tasks.value.findIndex((t) => t.id === taskBeingEdited.value.id);
  if (!idx !== -1) {
    tasks.value[idx].title = task.title;
  }
  isVisibleModal.value = false;
  console.log(tasks);
}
function toggleStatus(id) {
  const idx = tasks.value.findIndex((t) => t.id === id);
  tasks.value[idx].done = !tasks.value[idx].done;
}
</script>
