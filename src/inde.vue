<template>
  <div class="relative">
    <article
      class="article-title all-title mb-10"
      :style="[`border-top:5px solid #b5a88f`]"
      v-if="displayedItems.length"
    >
      <div class="bg"></div>
      <img src="/img/all.webp" alt="Alle artikler" width="600" height="450" fetchpriority="low" />
      <h1 class="text-xl md:text-3xl">Alle artikler</h1>
    </article>

    <div v-if="loading && !displayedItems.length" class="loader text-center mt-10"></div>

    <div v-else-if="displayedItems.length">
      <article class="article" v-for="item in displayedItems" :key="item.id">
        <!-- Reklame -->
        <div v-if="item.isAd" class="text-xs uppercase text-red-500">Reklame</div>

        <a
          v-if="item.isAd"
          :href="item.url"
          class="flex column gap-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 class="font-semibold text-[18px]">{{ item.title || "Без заголовка" }}</h1>
          <img
            v-if="isValidImageUrl(item.imageUrl)"
            :src="optimizeImage(item.imageUrl)"
            :alt="item.imageAlt || 'Нет описания'"
            loading="lazy"
            @error="handleImageError($event, item)"
          />
          <p style="white-space: pre-wrap">{{ item.content }}</p>
        </a>

        <!-- Article -->
        <NuxtLink
          v-else
          :to="`/articles/${item.slug}?topic=${item.topic}`"
          class="flex column gap-5"
        >
          <h1 class="font-semibold text-[18px]">{{ item.title || "Без заголовка" }}</h1>
          <img
            v-if="isValidImageUrl(item.imageUrl)"
            :src="optimizeImage(item.imageUrl)"
            :alt="item.imageAlt || 'Нет описания'"
            loading="lazy"
            @error="handleImageError($event, item)"
          />
          <p style="white-space: pre-wrap">
            {{ truncateText(item.content) }}
            <b style="color: #418af3">Les mer</b>
          </p>
          <div class="self-end whitespace-nowrap flex items-center gap-2">
            <span class="material-icons-outlined">visibility</span>
            Visninger: {{ item.views || 0 }}
          </div>
        </NuxtLink>
      </article>

      <div v-if="loading" class="loader text-center my-10 mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAsyncData, useHead } from "#imports";
import { useCloudinaryImage } from "~/composables/useCloudinaryImage";
import { useAds } from "~/composables/useAds";
import truncateText from "~/mixins/truncateText";

const { optimizeImage } = useCloudinaryImage();
const { ads, getNextAd } = useAds();

useHead({
  title: "Alle artikler",
  meta: [
    { name: "description", content: "Alle artikler på nettstedet vårt" },
    { name: "keywords", content: "статьи, блог, новости, актуальное" },
    { property: "og:title", content: "artikler, blogg, nyheter, aktuelt" },
    { property: "og:description", content: "Alle artikler på nettstedet vårt" },
  ],
});

const displayedItems = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const lastKey = ref(null);
const articlesPerPage = 6;

const { data: ssrData } = await useAsyncData("indexPage", async () => {
  const res = await fetch(
    `https://first-project-889f3-default-rtdb.firebaseio.com/articles/all.json?orderBy=\"$key\"&limitToFirst=${articlesPerPage}`
  );
  const json = await res.json();

  const articles = Object.entries(json || {}).map(([id, a]) => ({ id, ...a }));
  const result = [];
  let count = 0;

  for (const article of articles) {
    result.push(article);
    count++;
    if (count % 2 === 0) {
      const ad = getNextAd();
      if (ad) result.push({ ...ad, isAd: true, id: `ad-${ad.id}-${count}` });
    }
  }

  return {
    items: result,
    lastKey: articles.at(-1)?.id || null,
  };
});

if (ssrData.value) {
  displayedItems.value = ssrData.value.items;
  lastKey.value = ssrData.value.lastKey;
}

function isValidImageUrl(url) {
  return typeof url === "string" && url.startsWith("https://res.cloudinary.com/");
}

function handleImageError(event, item) {
  console.warn(`Ошибка изображения у статьи: ${item.title}`);
  item.imageUrl = null;
}

async function loadMore() {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  try {
    const url = `https://first-project-889f3-default-rtdb.firebaseio.com/articles/all.json?orderBy=\"$key\"&startAt=\"${lastKey.value}\"&limitToFirst=${articlesPerPage}`;
    const res = await fetch(url);
    const json = await res.json();

    const newArticles = Object.entries(json || {}).map(([id, a]) => ({ id, ...a }));
    newArticles.shift();
    if (!newArticles.length) return (hasMore.value = false);

    const result = [];
    let count = 0;
    for (const article of newArticles) {
      result.push(article);
      count++;
      if (count % 2 === 0) {
        const ad = getNextAd();
        if (ad) result.push({ ...ad, isAd: true, id: `ad-${ad.id}-${Date.now()}` });
      }
    }

    displayedItems.value.push(...result);
    lastKey.value = newArticles.at(-1)?.id;
  } catch (e) {
    console.error("Ошибка при подгрузке:", e);
  } finally {
    loading.value = false;
  }
}

function onScroll() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight - 100) loadMore();
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
