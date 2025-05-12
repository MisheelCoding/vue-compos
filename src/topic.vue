<template>
  <div class="topic-wrapper">
    <!-- 🔹 Заголовок темы -->
    <article
      class="article-title topic-title mb-10"
      :style="[`border-top:8px solid ${getTopicColor(topic)}`]"
      v-if="displayedItems.length"
    >
      <div class="bg" :style="{ background: getTopicColor(topic) }"></div>
      <img :src="getTopicImage(topic)" alt="Тема статьи" />
      <h1 class="first-letter:uppercase text-xl md:text-3xl">{{ topic }}</h1>
    </article>

    <!-- 🔸 Лоадер -->
    <div
      v-if="loading && !displayedItems.length"
      class="loader text-center mt-10 absolute left-[50%] translate-x-[-50%]"
    ></div>

    <!-- 🔸 Список статей и рекламы -->
    <div v-else-if="displayedItems.length">
      <article
        class="article"
        v-for="item in displayedItems"
        :key="item.id + (item.isAd ? '-ad' : '')"
      >
        <div v-if="item.isAd" class="text-xs uppercase text-red-500">Reklame</div>

        <a
          v-if="item.isAd"
          class="flex column gap-5"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 class="font-semibold text-[18px]">{{ item.title || "Без заголовка" }}</h1>
          <img
            v-if="item.imageUrl && isValidImageUrl(item.imageUrl)"
            :src="optimizeImage(item.imageUrl)"
            :alt="item.imageAlt || 'Нет описания'"
            loading="lazy"
            @error="handleImageError($event, item)"
          />
          <p style="white-space: pre-wrap">{{ item.content }}</p>
        </a>

        <nuxt-link v-else class="flex column gap-5" :to="`/articles/${item.slug}?topic=${topic}`">
          <h1 class="font-semibold text-[18px]">{{ item.title || "Без заголовка" }}</h1>
          <img
            v-if="item.imageUrl && isValidImageUrl(item.imageUrl)"
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
        </nuxt-link>
      </article>

      <!-- Скролл лоадер -->
      <div v-if="loading" class="loader text-center my-10 mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import truncateText from "~/mixins/truncateText";
import { useTopics } from "~/composables/useTopics";
import { useCloudinaryImage } from "~/composables/useCloudinaryImage";

const { optimizeImage } = useCloudinaryImage();
const { getTopicImage, getTopicColor } = useTopics();
const route = useRoute();
const topic = ref(route.params.topic);
const articles = ref([]);
const displayedItems = ref([]);
const ads = ref([]);
const usedArticles = new Set();
const lastArticleKey = ref(null);
const adIndex = ref(0);
const loading = ref(false);
const articlesPerPage = 4;
const hasMore = ref(true);

watch(
  () => route.params.topic,
  async (newVal) => {
    topic.value = newVal;
    reset();
    await loadInitialArticles();
  }
);

function reset() {
  articles.value = [];
  displayedItems.value = [];
  usedArticles.clear();
  lastArticleKey.value = null;
  adIndex.value = 0;
  hasMore.value = true;
}

function isValidImageUrl(url) {
  return typeof url === "string" && url.startsWith("http");
}

function handleImageError(event, article) {
  event.target.src = "/img/no-image.webp";
  article.imageUrl = null;
}

async function fetchAds() {
  const res = await fetch("https://first-project-889f3-default-rtdb.firebaseio.com/ads.json");
  const json = await res.json();
  ads.value = Object.entries(json || {}).map(([id, a]) => ({ id, ...a, isAd: true }));
}

async function loadInitialArticles() {
  loading.value = true;

  if (!ads.value.length) await fetchAds();

  const res = await fetch(
    `https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic.value}.json?orderBy="$key"&limitToFirst=${articlesPerPage}`
  );
  const json = await res.json();
  if (!json) {
    hasMore.value = false;
    loading.value = false;
    return;
  }

  const newArticles = Object.entries(json)
    .map(([id, a]) => ({ id, ...a }))
    .filter((a) => !usedArticles.has(a.id));

  if (!newArticles.length) {
    hasMore.value = false;
    loading.value = false;
    return;
  }

  lastArticleKey.value = newArticles.at(-1)?.id;
  updateDisplayedItems(newArticles);
  loading.value = false;
}

function updateDisplayedItems(newArticles) {
  const result = [];

  let count = 0;
  for (const article of newArticles) {
    if (usedArticles.has(article.id)) continue;
    usedArticles.add(article.id);
    result.push(article);
    count++;

    if (count % 2 === 0 && ads.value.length > 0) {
      const ad = ads.value[adIndex.value % ads.value.length];
      result.push({ ...ad });
      adIndex.value++;
    }
  }

  displayedItems.value.push(...result);
}

async function loadMoreArticles() {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  let url = `https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic.value}.json?orderBy="$key"&limitToFirst=${articlesPerPage}`;
  if (lastArticleKey.value) {
    url += `&startAt="${lastArticleKey.value}"`;
  }

  const res = await fetch(url);
  const json = await res.json();
  if (!json) {
    hasMore.value = false;
    loading.value = false;
    return;
  }

  const newArticles = Object.entries(json)
    .map(([id, a]) => ({ id, ...a }))
    .filter((a) => !usedArticles.has(a.id));

  if (!newArticles.length) {
    hasMore.value = false;
    loading.value = false;
    return;
  }

  lastArticleKey.value = newArticles.at(-1)?.id;
  updateDisplayedItems(newArticles);
  loading.value = false;
}

function handleScroll() {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

  if (nearBottom && !loading.value) {
    loadMoreArticles();
  }
}

onMounted(() => {
  loadInitialArticles();
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
