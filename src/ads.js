import { ref, computed } from "vue";

const ads = ref([]);
const adIndex = ref(2); // 0 и 1 — для SSR, дальше — scroll
const adsLoaded = ref(false);

// Загружаем рекламу сразу
async function loadAds() {
  if (adsLoaded.value) return;

  try {
    const res = await fetch("https://first-project-889f3-default-rtdb.firebaseio.com/ads.json");
    const json = await res.json();
    ads.value = Object.entries(json || {}).map(([id, ad]) => ({ id, ...ad }));
    adsLoaded.value = true;
    console.log("✅ Ads loaded:", ads.value);
  } catch (e) {
    console.error("❌ Ошибка загрузки рекламы:", e);
  }
}

// ⚠ Загружаем один раз сразу при импорте
await loadAds();

export function useAds() {
  const getNextAd = () => {
    if (!ads.value.length) {
      console.warn("🚫 Нет рекламы для показа (ads пустой)");
      return null;
    }

    const ad = ads.value[adIndex.value % ads.value.length];
    adIndex.value++;
    return { ...ad };
  };

  return {
    getNextAd,
    ads: computed(() => ads.value),
  };
}
