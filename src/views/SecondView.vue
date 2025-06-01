<template>
  <div class="about">
    <h1>This is an second page (watch,watchEfeect, computed)</h1>

    <div class="container">
      <h2>Total: {{ total }}</h2>
      <div class="flex gap-5">
        <input class="border" v-model="price" type="text" />
        <input class="border" v-model="quantity" type="text" />
      </div>

      <div class="my-5">
        <h2>Watch practice 1: было =>{{ oldValWatch }} cтало {{ newValWatch }}</h2>
        <input class="border" v-model="priceWatch" type="text" />
      </div>

      <div class="my-5 flex flex-col gap-5 items-start">
        <h2>Watch practice 2:</h2>
        <input class="border" v-model="name" type="text" placeholder="name" />
        <input class="border" v-model="lastName" type="text" placeholder="lastName" />
        <input
          class="border py-2 px-4 rounded-xl"
          :class="[
            errorEmail
              ? 'border-red-500 shadow-red-300 shadow-md'
              : 'border-green-400 shadow-green-200 shadow-md',
          ]"
          v-model="email"
          type="text"
          placeholder="email"
        />
        <div v-if="errorEmail" class="errorEmail text-red-500">{{ errorEmail }}</div>
        <input
          class="border py-2 px-4 rounded-xl"
          :class="[
            errorPhone
              ? 'border-red-500 shadow-red-300 shadow-md'
              : 'border-green-400 shadow-green-200 shadow-md',
          ]"
          v-model="phone"
          type="text"
          placeholder="phone"
        />
        <div v-if="errorPhone" class="errorPhone text-red-500">{{ errorPhone }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from "vue";

// train computed
const price = ref(0);
const quantity = ref(1);

const total = computed(() => {
  return price.value * quantity.value;
});

// train watch
const priceWatch = ref(0);
let newValWatch = null;
let oldValWatch = null;

watch(priceWatch, (newVal, oldVal) => {
  console.log(`${oldVal} -> ${newVal}`);
  newValWatch = newVal;
  oldValWatch = oldVal;
});

watchEffect(() => {
  console.log(`total price with watchEffect: ${total.value}`);
});

// 2nd train watch
const name = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
let errorEmail = ref("");
let errorPhone = ref("");

watchEffect(() => {
  if (email.value) {
    localStorage.setItem("email", email.value);
  }
});

watch(email, (newVal) => {
  if (!newVal) {
    errorEmail.value = "";
    return;
  }
  newVal.includes("@") ? (errorEmail.value = "") : (errorEmail.value = "errorNotEmail");
});
watch(phone, (newVal) => {
  if (!newVal) {
    errorPhone.value = "";
    return;
  }
  newVal.includes("+") ? (errorPhone.value = "") : (errorPhone.value = "errorNotPhone");
});

watch([name, lastName], (newVal, oldVal) => {
  console.log(`Имя изменилось на:  ${oldVal} -> ${newVal}`);
});
</script>

<style></style>
