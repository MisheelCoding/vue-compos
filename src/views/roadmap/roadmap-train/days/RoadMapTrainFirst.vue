<template>
  <div>
    <h1>First edit from T-shield</h1>
    <RoadTrainFirstAddItem @new-item="handleAddItem" />

    <train-filter></train-filter>
    <ul class="items-list">
      <user-item
        v-for="(user, i) in list"
        :key="user.id"
        :user="user"
        @remove="removeUser"
      ></user-item>
    </ul>
    <div>
      <h2>Train page speed</h2>
      <RoadTrainSpeed />
    </div>
  </div>
</template>

<script setup>
import RoadTrainFirstAddItem from "@/views/roadmap/roadmap-train/days/first/RoadTrainFirstAddItem.vue";
import TrainFilter from "@/views/roadmap/roadmap-train/days/first/RoadTrainFirstFilters.vue";
import UserItem from "@/views/roadmap/roadmap-train/days/first/RoadTrainUserItem.vue";
import RoadTrainSpeed from "@/views/roadmap/roadmap-train/days/first/RoadTrainSpeed.vue";

import axios from "axios";
import { onMounted, ref } from "vue";

const list = ref([]);

function handleAddItem(item) {
  list.value.push(item);
}

async function removeUser(id) {
  const userIdx = list.value.findIndex((u) => u.id === id);
  if (userIdx === -1) return;

  const user = list.value[userIdx];
  // console.log(user);
  list.value.splice(userIdx, 1);
  try {
    await axios.delete(`https://test-94a09-default-rtdb.firebaseio.com/users/${id}.json`);
  } catch (error) {
    console.log("err:", error);
    list.value.splice(userIdx, 0, user);
  }
}

async function loadUsers() {
  try {
    const res = await axios.get("https://test-94a09-default-rtdb.firebaseio.com/users/.json");
    // console.log(res.data);
    // if (res.data) {
    list.value = Object.entries(res.data || {}).map(([id, user]) => ({
      id,
      ...user,
    }));
    // }
  } catch (err) {
    console.log("Error:", err);
  }
}

onMounted(() => {
  loadUsers();
});
</script>
