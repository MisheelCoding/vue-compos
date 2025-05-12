import { computed, reactive } from "vue";

const user = reactive({
  name: "John Doe",
  email: "RkMlU@example.com",
  role: "admin",
  isLoggedIn: true,
  age: 19,
});

export const useUser = () => {
  const greeting = computed(() => `Hello, ${user.name}!`);
  const isAdult = computed(() => user.age >= 18);

  return {
    user,
    greeting,
    isAdult,
  };
};
