<template>
  <div>
    <input class="border" v-model="nameModel" type="text" placeholder="name" />
    <input class="border" v-model="emailModel" type="text" placeholder="email" />
    <button
      class="cursor-pointer border p-2 rounded-xl hover:bg-slate-600 transition"
      @click="addToCard"
    >
      Add to card
    </button>
  </div>

  <div>
    <input v-model="test1" type="text" />
    <input v-model="test2" type="text" />
    <button @click="testEmit">test</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const test1 = ref("");
const test2 = ref("");

const emit = defineEmits(["add-to-card", "testEmit"]);
// const email = ref("");
// const name = ref("");
const nameModel = defineModel("name");
const emailModel = defineModel("email");

const addToCard = () => {
  emit("add-to-card", { name: nameModel.value, email: emailModel.value });
  emailModel.value = "";
  nameModel.value = "";
};

const testEmit = () => {
  emit("testEmit", { name: test1.value, email: test2.value });
};
</script>

<style lang="scss" scoped></style>
