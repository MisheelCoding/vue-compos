<template>
  <todo-modal>
    <template #header> Edit task </template>
    <template #default>
      <input class="border-b" type="text" v-model="localTitle" />
    </template>
    <template #footer>
      <button
        class="rounded-3xl w-[120px] h-[40px] cursor-pointer hover:bg-indigo-300 bg-indigo-200 transition hover:border-0 text-white"
        @click="emit('cancel-edit')"
      >
        сancel
      </button>
      <button
        class="rounded-3xl w-[120px] h-[40px] cursor-pointer hover:bg-indigo-300 bg-indigo-200 transition hover:border-0 text-white"
        @click="emit('save-edit', { ...props.task, title: localTitle })"
      >
        save
      </button>
    </template>
  </todo-modal>

  <TodoOverlay @click="emit('cancel-edit')" />
</template>

<script setup>
import { ref, watch } from "vue";
import TodoModal from "./TodoModal.vue";
import TodoOverlay from "./TodoOverlay.vue";

const emit = defineEmits(["cancel-edit", "save-edit"]);

const props = defineProps({
  task: Object,
});

const localTitle = ref(props.task?.title || "");

watch(
  () => props.task,
  (newVal) => {
    localTitle.value = newVal.title;
  }
);
</script>
