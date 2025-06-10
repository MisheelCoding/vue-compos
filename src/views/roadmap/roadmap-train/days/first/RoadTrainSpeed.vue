<template>
  <div>
    <div class="popup relative w-max px-10 border" v-if="activePopup && isVisiblePopup">
      <h2>Popup</h2>
      <span class="absolute top-0 right-0 text-xl cursor-pointer" @click="closePopup">&times;</span>
      <h2 class="text-2xl text-indigo-600">{{ activePopup }}</h2>

      <div class="w-full h-2 bg-gray-200 mt-4 rounded overflow-hidden">
        <div
          class="h-full bg-indigo-500 transition-all duration-100"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// console.time("Using Set");
const name = "Mila";
const items = Array.from(name);
const activePopup = ref(null);
let isVisiblePopup = ref(false);

const activeIndex = ref(0);
let time = 5000;
const progress = ref(0);

let interval;
let progressInterval;
let restartTimer;

console.log(items.length);
function nextPopup() {
  isVisiblePopup.value = true;
  activePopup.value = items[activeIndex.value];
  startProgress();
}

function startProgress() {
  clearInterval(progressInterval);
  progress.value = 0;
  const tick = 100;
  const step = 100 / (time / 100);

  progressInterval = setInterval(() => {
    progress.value += step;
    if (progress.value >= 100) {
      progress.value = 100;
      clearInterval(progressInterval);
    }
  }, tick);
}
onMounted(() => {
  nextPopup();
  startInterval();
});

function startInterval() {
  interval = setInterval(() => {
    activeIndex.value++;
    if (activeIndex.value === items.length) {
      activeIndex.value = 0;
    }
    nextPopup();
    console.log(activeIndex.value);
  }, time);
}

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(progressInterval);
});

function closePopup() {
  isVisiblePopup.value = false;
  clearInterval(interval);
  clearInterval(progressInterval);
  console.log("close");

  setTimeout(() => {
    startInterval();
  }, 2000);
}
</script>

<!--
<script>
const users = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  email: i % 2 === 0 ? `user${i}@test.com` : `user${i - 1}@test.com`,
}));

const str = "some";
const arr = Array.from(str);
console.log(arr.map((w) => (w.includes("o") ? w + "!" : w.)));

const emails = new Set();
const result = [];

for (const user of users) {
  if (!emails.has(user.email)) {
    emails.add(user.email);
    result.push({
      id: user.id,
      email: user.email.toLowerCase(),
    });
  }
}

console.timeEnd("Using Set");

// Альтернатива: обычный includes
console.time("Using Array.includes");

const emails2 = [];
const result2 = [];

for (const user of users) {
  if (!emails2.includes(user.email)) {
    emails2.push(user.email);
    result2.push({
      id: user.id,
      email: user.email.toLowerCase(),
    });
  }
}

console.timeEnd("Using Array.includes");
</script>

<style lang="scss" scoped></style> -->
