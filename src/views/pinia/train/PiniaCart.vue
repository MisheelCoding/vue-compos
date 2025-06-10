<template>
  <div>
    <h1>Pinia Cart</h1>
    <cart-list></cart-list>
    <app-cart></app-cart>
  </div>
</template>

<script setup>
import CartList from "@/views/pinia/train/cart/CartList.vue";
import AppCart from "@/views/pinia/train/cart/AppCart.vue";
import { onMounted } from "vue";
import { useCart } from "@/stores/useStore";
const cart = useCart();
onMounted(() => {
  cart.initCartFromLocalStorage();

  cart.$subscribe((mutation, state) => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  });
});
</script>
