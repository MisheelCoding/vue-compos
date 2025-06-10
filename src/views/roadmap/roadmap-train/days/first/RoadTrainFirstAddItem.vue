<template>
  <div>
    <input type="text" class="border" v-model="itemName" placeholder="Name" />
    <input type="text" class="border" v-model="itemAge" placeholder="age" />
    <input type="text" class="border" v-model="itemEmail" placeholder="Email" />
    <button @click="handleAddToList">Add</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const emit = defineEmits(["new-item"]);
const itemName = ref("");
const itemAge = ref("");
const itemEmail = ref("");

async function handleAddToList() {
  const name = itemName.value.trim();

  if (!name || !itemEmail.value || !itemAge.value) {
    console.log("empty");
    return;
  }
  const newItem = {
    age: itemAge.value.trim(),
    email: itemEmail.value.trim(),
    name,
  };
  emit("new-item", newItem);

  try {
    const res = await axios.post(
      "https://test-94a09-default-rtdb.firebaseio.com/users/.json",
      newItem
    );
    console.log(res);

    const generatedId = res.data.name;

    await axios.patch(`https://test-94a09-default-rtdb.firebaseio.com/users/${generatedId}.json`, {
      id: generatedId,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
  itemName.value = "";
  itemAge.value = "";
  itemEmail.value = "";
}
</script>
