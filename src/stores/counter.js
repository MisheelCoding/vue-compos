import { defineStore } from "pinia";

export const useCounter = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    resetCount() {
      this.count = 0;
    },
  },

  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
