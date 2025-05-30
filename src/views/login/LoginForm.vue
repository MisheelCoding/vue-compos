<template>
  <div>
    <h1>Login Form</h1>

    <form action="#" @click.prevent="submitForm" class="flex flex-col gap-2 items-start">
      <input
        type="text"
        class="border"
        v-model="email"
        name="email"
        id="email"
        placeholder="write email..."
        autocomplete="email"
      />
      <span v-if="errors.email" class="text-red-500 font-n">{{ errors.email }}</span>
      <input
        type="password"
        autocomplete="current-password"
        name="password"
        id="password"
        placeholder="write password..."
        class="border"
        v-model="password"
      />
      <span v-if="errors.password" class="text-red-500 font-n">{{ errors.password }}</span>
      <button
        :disabled="!isFormValid"
        class="border rounded-xl px-3 disabled:opacity-40"
        type="submit"
      >
        Войти
      </button>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

const email = ref("");
const password = ref("");

const errors = reactive({
  email: "",
  password: "",
});

function submitForm() {
  //сброс ошибок
  errors.email = "";
  errors.password = "";

  let hasError = false;
  if (!email.value) {
    errors.email = "Email обязтельно";
    hasError = true;
  } else if (!isEmailValid(email.value)) {
    errors.email = "Введите Email";
    hasError = true;
  }

  if (!password.value) {
    errors.password = "password обязтельно";
    hasError = true;
  } else if (!isPasswordValid(password.value)) {
    errors.password = "пароль неверный";
    hasError = true;
  }
  if (hasError) return;
  setTimeout(() => {
    alert("Авторизация успешно");
  }, 500);
}
const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && val.length > 5;
const isPasswordValid = (val) => val.length >= 8;

const isFormValid = computed(() => {
  return isEmailValid(email.value) && isPasswordValid(password.value);
});

watch(email, (newVal) => {
  if (errors.email && isEmailValid(newVal)) {
    errors.email = "";
  }
});

watch(password, (newVal) => {
  if (password.value && isPasswordValid(newVal)) {
    errors.password = "";
  }
});
</script>

<style lang="scss" scoped></style>
