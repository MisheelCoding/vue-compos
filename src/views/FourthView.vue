<template>
  <div>
    <h1>This is an fourth page</h1>

    <fourth-list :items="users">
      <template #default="{ item, index }">
        <p>
          <strong>#{{ index + 1 }}</strong> — {{ item.name }} ({{ item.email }})
        </p>
      </template>
    </fourth-list>

    <div>
      <h2>Composables</h2>
      <div>
        <h3>{{ greeting }}</h3>
        <p>Возвраст: {{ user.age }} - Взрослый ? {{ isAdult }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import fourthList from "@/components/FourthList.vue";
import { useUser } from "@/composables/useUser";
const { user, greeting, isAdult } = useUser();

const users = [
  { name: "Misheel", email: "misheel@example.com" },
  { name: "Alex", email: "alex@pro.dev" },
  { name: "Nina", email: "nina@site.org" },
];
</script>
<style lang="scss" scoped></style>
