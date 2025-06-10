<template>
  <div>
    <h1>This is an third page Props Emits v-model</h1>
    <FormThird
      @testEmit="console.log($event, 'testEmit')"
      v-model:name="name"
      v-model:email="email"
      @add-to-card="addToCard"
    />
    <CardList :items="itemsForm" @delete-item="itemsForm.splice($event, 1)" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CardList from "@/components/CardThird.vue";
import FormThird from "@/components/FormThird.vue";
const name = ref("");
const email = ref("");
const itemsForm = ref([]);

const addToCard = (item) => itemsForm.value.push(item);
</script>
