<template>
  <div class="mt-5">
    <h2 class="text-2xl text-emerald-400">Pinia train with</h2>
    <!-- <div>
      <input v-model="label" type="text" class="border" />
    </div> -->
    <select v-model="type" class="border">
      <option v-for="(type, i) in chooseType" :key="i" :value="type.type">{{ type.text }}</option>
    </select>
    <button class="btn border ml-5" @click="handleAdd">Add question</button>
  </div>
  <div>
    <form @submit.prevent="submitForm">
      <h2>List Questions</h2>
      <ul>
        <RoadmapDynamicPrewiew
          v-for="(q, i) in store.questions"
          :key="i"
          :type="q.type"
          :index="i"
          :label="q.label"
          :options="q.options"
          :placeholder="q.placeholder"
          @update-question="updateQuestion"
        />
      </ul>
      <button type="submit" class="border">Send</button>
    </form>
  </div>
</template>

<script setup>
import { useFormStore } from "@/stores/useFormStore";

import { ref } from "vue";
import RoadmapDynamicPrewiew from "./dynamic/RoadmapDynamicPrewiew.vue";
const store = useFormStore();
const label = ref("");
const type = ref("");
const placeholder = ref("");

const chooseType = [
  {
    type: "text",
    text: "text",
  },
  {
    type: "email",
    text: "Email",
  },
  {
    type: "number",
    text: "Число",
  },
  {
    type: "date",
    text: "Дата",
  },
  {
    type: "checkbox",
    text: "Много вариантов",
  },
  {
    type: "radio",
    text: "Один вариант",
  },
  {
    type: "dropdown",
    text: "Выпадающий список",
  },
];

const handleAdd = () => {
  store.addQuestion(label.value, type.value, placeholder.value);
  label.value = "";
  type.value = "";
  placeholder.value = "";

  console.log(store.questions);
};

const updateQuestion = ({ index, label, placeholder }) => {
  console.log(label, placeholder);
  store.updateData(index, { label, placeholder });
};

const submitForm = () => {
  const formName = "Form-" + crypto.randomUUID();
  const url = `https://test-94a09-default-rtdb.firebaseio.com/items/${formName}.json`;
  store.submitToFirebase(url, formName);
};
</script>
