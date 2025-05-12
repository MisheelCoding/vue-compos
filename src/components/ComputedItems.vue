<template>
  <div>
    <div>
      <h2 class="text-2xl">Совершеннолетние</h2>
      <ul>
        <li v-for="user in adults" :key="user.email">{{ user.name }} - {{ user.age }}</li>
      </ul>
      <h2>Всего пользователей: {{ totalUsers }}</h2>
      <h2>Всего совершеннолетних: {{ totalAdults }}</h2>

      <h2 class="text-2xl">Сортировка по имени</h2>
      <ul>
        <li v-for="user in sortedByName" :key="user.email">{{ user.name }} - {{ user.age }}</li>
      </ul>

      <h2>Поиск по имени</h2>
      <label for="search">
        Вводите имя
        <input class="border rounded" type="text" id="search" v-model="search" />
      </label>
      <ul>
        <li v-show="search.length > 0" v-for="user in filteredUsers" :key="user.email">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const users = ref([
  { name: "Misheel", email: "misheel@example.com", age: 23 },
  { name: "Mila", email: "mila@example.com", age: 18 },
  { name: "Alex", email: "alex@pro.dev", age: 17 },
  { name: "Nina", email: "nina@site.org", age: 30 },
  { name: "Bob", email: "bob@site.org", age: 19 },
  { name: "Гараж", email: "Гараж@site.org", age: 24 },
  { name: "Данил", email: "Данил@site.org", age: 16 },
  { name: "Арбуз", email: "Арбуз@site.org", age: 16 },
]);
const search = ref("");

const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.name.toLowerCase().trim().includes(search.value.toLowerCase().trim())
  );
});
const sortedByName = computed(() => [...users.value].sort((a, b) => a.name.localeCompare(b.name)));
const adults = computed(() => users.value.filter((user) => user.age >= 18));
const totalUsers = computed(() => users.value.length);
const totalAdults = computed(() => adults.value.length);

const summAll = (...args) =>
  args.reduce((prev, curr) => {
    return prev + curr;
  }, 0);

console.log(summAll(1, 2, 3));
console.log(summAll(23, 24, 27, 99));
</script>

<style lang="scss" scoped></style>
