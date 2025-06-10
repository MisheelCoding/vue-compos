<template>
  <div>
    <h1>Patch & reset</h1>
    <div class="flex flex-col items-end">
      <h2>{{ user.name }}</h2>
      <h2>{{ user.site }}</h2>
      <h2>{{ user.email }}</h2>
      <h2>{{ user.age }}</h2>
      <h2>{{ user.role }}</h2>
    </div>
    <form action="" class="flex flex-col gap-3 items-start">
      <input
        class="border rounded-xl h-[40px] px-4"
        type="text"
        name="userName"
        id="userName"
        placeholder="userName"
        v-model="form.name"
      />
      <input
        class="border rounded-xl h-[40px] px-4"
        type="text"
        name="userAge"
        id="userAge"
        placeholder="userAge"
        v-model="form.age"
      />
      <input
        class="border rounded-xl h-[40px] px-4"
        type="text"
        name="userEmail"
        id="userEmail"
        placeholder="userEmail"
        v-model="form.email"
      />
      <input
        class="border rounded-xl h-[40px] px-4"
        type="text"
        name="userRole"
        id="userRole"
        placeholder="userRole"
        v-model="form.role"
      />
      <input
        class="border rounded-xl h-[40px] px-4"
        type="text"
        name="userSite"
        id="userSite"
        placeholder="userSite"
        v-model="form.site"
      />
      <button
        class="border px-3 py-2 rounded-xl cursor-pointer hover:bg-black hover:text-white transition"
        @click.prevent="updateProfile"
      >
        Сохранить изменение
      </button>
      <button
        class="border px-3 py-2 rounded-xl cursor-pointer hover:bg-black hover:text-white transition"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { reactive, watch } from "vue";
const user = useUserStore();

const form = reactive({
  name: user.name,
  age: user.age,
  role: user.role,
  site: user.site,
  email: user.email,
});

const updateProfile = () => {
  user.updateUser({ ...form });
};

// const reset = () => {
//   user.reset();
//   form.name = user.name;
//   form.age = user.age;
//   form.email = user.email;
//   form.role = user.role;
//   form.site = user.site;
// };

// watch(
//   () => user.$state,
//   (newVal) => {
//     Object.assign(form, newVal);
//   },
//   { deep: true }
// );
</script>
