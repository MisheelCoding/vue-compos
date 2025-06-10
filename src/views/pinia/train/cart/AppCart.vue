<template>
  <div>
    <h1>Корзина</h1>
    <ul>
      <li class="flex gap-3 justify-between items-center" v-for="item in cart.cart" :key="item.id">
        <h2>{{ item.name }}</h2>
        <img class="max-w-[90px]" :src="item.img" alt="" />
        <div class="flex items-center gap-3">
          <button
            class="cursor-pointer border w-[20px] h-[20px] flex justify-center items-center rounded"
            @click="cart.decreaseQuantity(item.id)"
          >
            -
          </button>
          <p>{{ item.quantity }}</p>
          <button
            class="cursor-pointer border w-[20px] h-[20px] flex justify-center items-center rounded"
            @click="cart.increaseQuantity(item.id)"
          >
            +
          </button>
        </div>
        <p>{{ item.price * item.quantity }}$</p>
        <button
          @click="cart.removeItem(item.id)"
          class="cursor-pointer text-2xl opacity-50 hover:opacity-100 transition"
        >
          &times;
        </button>
      </li>
    </ul>
    <p>Количество товаров: {{ cart.totalItemsInCart }}</p>
    <p>Сумма: {{ cart.totalPrice }}</p>
  </div>
</template>

<script setup>
import { useCart } from "@/stores/useStore";

const cart = useCart();
</script>

<style lang="scss" scoped></style>
