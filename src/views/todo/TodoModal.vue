<template>
  <div
    class="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white border rounded p-5 shadow w-[350px] flex flex-col items-center"
  >
    <h2 class="mb-4 text-center text-xl text-red-400">
      <slot name="header" />
    </h2>
    <div class="mb-4">
      <slot />
    </div>
    <div class="flex justify-end gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>
