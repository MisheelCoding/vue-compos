import { ref, computed, onUnmounted } from "vue";

export const useTimer = () => {
  const time = ref(0); // в секундах
  const ms = ref(0); // миллисекунды
  let interval = null;

  const start = () => {
    if (interval) return;

    interval = setInterval(() => {
      ms.value += 100;

      if (ms.value >= 1000) {
        ms.value = 0;
        time.value++;
      }
    }, 100);
  };
  /*************  ✨ Windsurf Command ⭐  *************/
  /*******  951142b5-cfc9-4773-8ec4-da889d325cd9  *******/
  const stop = () => {
    clearInterval(interval);
    interval = null;
  };

  const reset = () => {
    clearInterval(interval);
    interval = null;
    time.value = 0;
    ms.value = 0;
  };

  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60);
    const seconds = time.value % 60;
    const msDisplay = Math.floor(ms.value / 10);

    const pad = (n, len = 2) => String(n).padStart(len, "0");

    return `${pad(minutes)}:${pad(seconds)}.${pad(msDisplay)}`;
  });

  onUnmounted(() => clearInterval(interval));

  return {
    time,
    ms,
    start,
    stop,
    reset,
    formattedTime,
  };
};
