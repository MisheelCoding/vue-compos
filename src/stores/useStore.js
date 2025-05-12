import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    initCartFromLocalStorage() {
      const saved = localStorage.getItem("cart");
      if (saved) this.cart = JSON.parse(saved);
    },
    // saveStorage() {
    //   localStorage.setItem("cart", JSON.stringify(this.cart));
    // },
    addItem(item) {
      const existingItem = this.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
        // this.saveStorage();
      } else {
        this.cart.push({ ...item, quantity: 1 });
        // this.saveStorage();
      }
      console.log(this.cart);
    },
    removeItem(idx) {
      this.cart = this.cart.filter((i) => i.id !== idx);
      // this.saveStorage();
    },
    increaseQuantity(idx) {
      const item = this.cart.find((i) => i.id === idx);
      if (item) item.quantity++;
      // this.saveStorage();
    },
    decreaseQuantity(idx) {
      const item = this.cart.find((i) => i.id === idx);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        this.removeItem(idx);
      }
      // this.saveStorage();
    },
    clearCart() {
      this.cart = [];
      // this.saveStorage();
    },
  },
  getters: {
    totalItemsInCart: (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
});
