<template>
  <div>
    <Suspense>
      <template #default>
        <component :is="currentComponent" v-if="currentComponent"> </component>
        <p v-else>Такого компонента нет содайте сначала или проверьте может не в буквах ошиблись</p>
      </template>
      <template #fallback>
        <p>⏳ Загрузка компонента...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const slug = computed(() => route.params.slug);

const componentMap = {
  cart: () => import("@/views/pinia/train/PiniaCart.vue"),
  counter: () => import("@/views/pinia/train/PiniaCounter.vue"),
  user: () => import("@/views/pinia/train/PiniaUser.vue"),
  patch_reset: () => import("@/views/pinia/train/PiniaPatchReset.vue"),
};

const currentComponent = computed(() =>
  componentMap[slug.value] ? defineAsyncComponent(componentMap[slug.value]) : null
);
</script>
