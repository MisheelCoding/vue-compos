<template>
  <div>
    <h1 class="text-center text-orange-400 text-2xl">Second day</h1>
    <div>
      <h2>Computed</h2>
      <input class="border" v-model="computedQuery" type="text" />
      <button class="border" @click="computedSearch">To Upper</button>
      <p>{{ computedSearch }}</p>
      <p>{{ computedQuery }}</p>
    </div>

    <div>
      <h2>computedFilter</h2>
      <input class="border" v-model="filterQuery" type="text" />
      <!-- <p>все{{ items.email }}</p> -->
      <ul>
        <li v-for="item in searchFilter" :key="item">{{ item.name }} - {{ item.email }}</li>
      </ul>
    </div>
    <div>
      <h2>Watch and form</h2>
      <div>
        <input class="border" v-model="watch1Name" type="text" />
        <input class="border" v-model="watchUser.email" type="text" />
      </div>
    </div>
    <div class="div">
      <h2>Watch array</h2>
      <input class="border" @keyup.enter="pushWatchArray" v-model="watchArrayInp" type="text" />
      <button @click="pushWatchArray">Add to watch array</button>
      <ul>
        <li v-for="todo in watchArray" :key="todo.id" @dblclick="todo.editing = true">
          <span v-if="!todo.editing">
            {{ todo.text }}
          </span>
          <input
            v-else
            v-model="todo.text"
            type="text"
            @keyup.enter="todo.editing = false"
            @blur="todo.editing = false"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

const computedQuery = ref("");
const computedSearch = computed(() => {
  return computedQuery.value.toUpperCase();
});

// filter computed

const filterQuery = ref("");
const items = ref([
  { name: "Mila", age: "24", email: "milabkm@gmail.com" },
  { name: "Misheel", age: "23", email: "misheeljobe0707@gmail.com" },
  { name: "Patrik", age: "28", email: "Patrick@gmail.com" },
  { name: "Dima", age: "35", email: "Dima@gmail.com" },
  { name: "Dominik", age: "15", email: "DirDominik@gmail.com" },
  { name: "Misha", age: "13", email: "mishamisheel55@gmail.com" },
]);

const searchFilter = computed(() => {
  return items.value.filter((i) => {
    console.log("1");
    return i.email.toLowerCase().includes(filterQuery.value.toLowerCase());
  });
});

// watch

const watch1Name = ref("");

watch(watch1Name, (newVal, oldVal) => {
  console.log(`name changed ${oldVal}=> ${newVal}`);
});

const watchUser = reactive({
  name: "Misheel",
  email: "mishamisheel55@gmail.com",
});

watch(
  () => watchUser.email,
  (newVal, oldVal) => {
    console.log(`user email ${oldVal} => ${newVal}`);
  }
);

// watch array
const watchArray = ref([]);
const watchArrayInp = ref("");

const pushWatchArray = () => {
  if (watchArrayInp.value.trim().length < 3) return;
  watchArray.value.push({
    text: watchArrayInp.value,
    id: crypto.randomUUID(), //generateId(),
    editing: false,
  });
  watchArrayInp.value = "";
  console.log(watchArray.value);
};

watch(
  watchArray,
  (newVal) => {
    console.log(newVal);
  },
  { deep: true }
);

function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  font-weight: bold;
}
</style>
