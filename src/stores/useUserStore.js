import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Misheel",
    email: "misheeljobe0707@gmail.com",
    site: "misheelcode.com",
    age: "23",
    role: "Frontend devoloper",
  }),
  actions: {
    updateUser(payload) {
      this.$patch(payload);
    },
    reset() {
      this.$reset();
    },
  },
});
