<template>
  <div>
    <h1>Продукты</h1>
    <ul class="flex gap-5">
      <li
        class="w-[300px] flex flex-col justify-center items-center shadow-md py-5 rounded-xl gap-5 hover:translate-y-[-5px] transition"
        v-for="product in products"
        :key="product.id"
      >
        <h1 class="underline underline-offset-7">{{ product.name }}</h1>
        <img :src="product.img" alt="" />
        <b>{{ product.price }}$</b>
        <button
          @click="addToCart(product)"
          class="border px-5 py-2 rounded-xl cursor-pointer hover:bg-black hover:text-white transition"
        >
          Купить
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCart } from "@/stores/useStore";
import items from "./products.json";
const products = items;

const addToCart = (product) => {
  cart.addItem(product);
};
const cart = useCart();
// console.log(products);
</script>
