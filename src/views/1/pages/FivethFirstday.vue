<template>
  <div>
    <h1 class="text-center text-orange-400 text-2xl">Ref reactive watch first day</h1>
    <div class="article">
      <h1>ref</h1>
      <p>Count: {{ count }}</p>
      <p>DOubleCount: {{ double }}</p>
      <button class="border rounded-2xl" @click="increament">increament</button>
      <button class="border rounded-2xl" @click="reset">reset</button>
    </div>
    <div class="article">
      <h1>reactive</h1>
      <div class="flex flex-col items-start gap-4">
        <label for="profileName">
          name:
          <input class="border rounded-2xl" v-model="profile.name" type="text" />
        </label>
        <label for="profileAge">
          age:
          <input class="border rounded-2xl" v-model="profile.age" type="text" />
        </label>
        <label for="profileSex">
          sex:
          <input class="border rounded-2xl" v-model="profile.sex" type="text" />
        </label>
      </div>
      <pre>{{ profile }}</pre>
    </div>
    <div>
      <h1>watch</h1>
      <input class="border" v-model="watchSearch" type="text" placeholder="search..." />
      <p>{{ watchQuery }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

const count = ref(0);
const double = computed(() => count.value * 2);

const increament = () => count.value++;
const reset = () => (count.value = 0);

// reactive
const profile = reactive({
  name: "",
  age: "",
  sex: "",
});

// watch

const watchSearch = ref("");
const watchQuery = ref("");
watch(watchSearch, (val) => {
  console.log(`serch topic: ${val}`);
  watchQuery.value = val;
});
</script>

<style lang="scss" scoped>
.article {
  margin-block: 40px;
  > h1 {
    font-size: 25px;
    color: rgb(126, 179, 45);
    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
