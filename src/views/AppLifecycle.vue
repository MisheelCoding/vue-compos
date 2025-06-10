<template>
  <div>
    <h1>Lifecycle</h1>

    <div>
      <h2>timer</h2>
      <p>{{ formattedTime }}</p>
      <button class="border px-7 py-2 mx-2 rounded-2xl" @click="start">start</button>
      <button class="border px-7 py-2 mx-2 rounded-2xl" @click="stop">stop</button>
      <button class="border px-7 py-2 mx-2 rounded-2xl" @click="reset">reset</button>
    </div>
  </div>
</template>

<script setup>
import { useTimer } from "@/composables/useTimer";
const { stop, start, reset, formattedTime } = useTimer();
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";
onBeforeMount(() => {
  console.log("onBeforeMount => Срабатывает до того, как компонент будет вставлен в DOM");
});
onMounted(() => {
  console.log("onMounted => Срабатывает после того, как компонент будет вставлен в DOM ");
});

onBeforeUpdate(() => {
  console.log(
    "⏳ до обновления DOM => Когда реактивные данные изменяются → перерисовка компонента"
  );
});

onUpdated(() => {
  console.log(
    "🔄 компонент обновлён => Когда реактивные данные изменяются → перерисовка компонента"
  );
});
onBeforeUnmount(() => {
  console.log("❗ компонент готовится к удалению");
});

onUnmounted(() => {
  console.log("🗑 компонент удалён");
});
</script>

<style lang="scss" scoped></style>
