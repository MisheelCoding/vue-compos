<template>
  <div>
    <h1>Home page</h1>
    <h1>{{ count }}</h1>
    <button class="btn" @click="increament">increament</button>
    <!-- 2 -->
  </div>

  <div>
    <input class="border ml-3" v-model="user.name" type="text" />
    <input class="border ml-3" v-model="user.email" type="text" />
    <h1>name:{{ user.name }}</h1>
    <h1>email:{{ user.email }}</h1>
  </div>
  <!-- 3 -->
  <div>
    <input @keydown.enter="createTask" v-model="input" class="border" type="text" name="" id="" />
    <button class="border w-[50px] ml-4 cursor-pointer" @click="createTask">+</button>
    <h2>задачи</h2>
    <ul>
      <li v-for="(task, idx) in tasks" :key="task.id" :id="task.id">
        <div class="flex">
          <h2>{{ task.task }}</h2>
          <span class="border ml-3 cursor-pointer" @click="deleteTask(task.id, idx)">delete</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";

const url = "https://test-94a09-default-rtdb.firebaseio.com/";
const count = ref(5);

const increament = () => {
  count.value++;
  if (count.value === 10) {
    count.value = 0;
  }
};

// Привет, меня зовут Алекс и мне 25 лет

// 2
const user = reactive({
  name: "Alex",
  email: "alex@gmail.com",
});
// 3
const tasks = ref([]);
const input = ref(null);
const addTask = (id) => {
  tasks.value.push({ id, task: input.value });
  input.value = "";
};

const fetchItems = async () => {
  try {
    const res = await axios.get(`${url}tasks.json`);
    const data = res.data;

    tasks.value = Object.entries(data || {}).map(([id, task]) => ({
      id,
      ...task,
    }));
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchItems();
});
const createTask = async () => {
  try {
    const task = { task: input.value };
    const res = await axios.post(`${url}tasks.json`, task);
    const id = res.data.name;
    addTask(id);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id, idx) => {
  tasks.value.splice(idx, 1);
  try {
    await axios.delete(`${url}tasks/${id}.json`);
  } catch (error) {
    console.log(error);
  }
};
// const deleteTask = async (id, idx) => {
//   const deletedTask = tasks.value[idx]; // сохраняем задачу
//   tasks.value.splice(idx, 1); // мгновенно удаляем из UI

//   try {
//     await axios.delete(`${url}tasks/${id}.json`);
//   } catch (error) {
//     console.log("Ошибка при удалении с сервера:", error);
//     // откат, если запрос не удался
//     tasks.value.splice(idx, 0, deletedTask);
//   }
// };
</script>

<style lang="scss" scoped></style>
