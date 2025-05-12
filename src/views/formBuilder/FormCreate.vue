<template>
  <div class="mb-[200px]">
    <h1 class="text-center text-orange-400 text-2xl">form quez</h1>
    <!-- 🗑️ -->
    <div>
      <div class="flex flex-col gap-5 items-start">
        <input v-model="question" type="text" class="border" /> <span></span>
        <select v-model="newQuestionType" class="border">
          <option v-for="(opt, i) in newOptionValue" :key="i" :value="opt.type">
            {{ opt.value }}
          </option>
        </select>
        <button class="border rounded w-[150px] h-[42px] cursor-pointer" @click="addQuestion">
          addQuestion
        </button>
      </div>
      <form @submit.prevent>
        <ul>
          <h2 class="text-center text-xl uppercase">form questions</h2>
          <li v-for="(q, i) in questions" :key="i">
            <label for="">{{ q.label }}</label>
            <DynamicField :type="q.type" v-model="q.answer" v-model:options="q.options" />
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DynamicField from "@/views/formBuilder/DynamicField.vue";

const newOptionValue = [
  {
    type: "text",
    value: "Текст",
  },
  {
    type: "email",
    value: "Почта",
  },
  {
    type: "textarea",
    value: "Многострочный текст",
  },
  {
    type: "number",
    value: "Число",
  },
  {
    type: "select",
    value: "Выпадающий список",
  },
  {
    type: "date",
    value: "Дата",
  },
  {
    type: "radio",
    value: "Один вариант",
  },
  {
    type: "checkbox",
    value: "Много вариантов",
  },
];
const questions = ref([]);

const newQuestionType = ref("");
const question = ref("");

const addQuestion = () => {
  if (question.value.trim().length < 2 || newQuestionType.value.length === 0) return;
  questions.value.push({
    type: newQuestionType.value,
    label: question.value,
    options: [],
    answer: "",
  });
};

watch(
  questions,
  (newVal) => {
    console.log("Обновлённые options:", newVal);
  },
  { deep: true }
);
</script>
