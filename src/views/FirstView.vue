<template>
  <div>
    <h2>Train ref reactive</h2>

    <div class="container">
      <h2>{{ msg }}</h2>
      <button class="border p-2 rounded-xl cursor-pointer" @click="increament">
        count is: {{ count }}
      </button>

      <div class="form flex flex-col gap-5 items-start my-5">
        <label for="name"
          >Name
          <input v-model="fullName.firstName" id="name" name="name" type="text" class="border" />
        </label>
        <label for="lastName"
          >lastName
          <input
            v-model="fullName.lastName"
            id="lastName"
            name="lastName"
            type="text"
            class="border"
          />
        </label>
        <label for="email">
          Email
          <input v-model="fullName.email" id="email" name="email" type="text" class="border" />
        </label>
        <label for="phone">
          Phone
          <input v-model="fullName.phone" id="phone" name="phone" type="text" class="border" />
        </label>
        <button class="cursor-pointer border p-2 rounded-xl">Submit</button>
        <div>
          <p>First Name: {{ fullName.firstName }}</p>
          <p>last Name: {{ fullName.lastName }}</p>
          <p>Email: {{ fullName.email }}</p>
          <p>Phone: {{ fullName.phone }}</p>
        </div>
      </div>

      <div class="form flex flex-col gap-5 items-start my-5">
        <h2>train boolean</h2>
        <div>
          <button class="cursor-pointer border p-2 rounded-xl" @click="isVisible = !isVisible">
            Toggle
          </button>

          <p v-if="isVisible">I am visible</p>
        </div>
        <button class="border p-2 rounded-xl cursor-pointer" @click="toggleText">
          change text
        </button>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const msg = ref("Hello Misheel");
const text = ref("hello");
const count = ref(0);
const isVisible = ref(false);
const fullName = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const increament = () => {
  count.value++;
};

const toggleText = () => {
  text.value = text.value === "hello" ? "bye" : "hello";
};
</script>

<style lang="scss" scoped></style>
