<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "#imports";
import truncateText from "~/mixins/truncateText";
import { useCloudinaryImage } from "~/composables/useCloudinaryImage";

const { optimizeImage } = useCloudinaryImage();
const route = useRoute();
const router = useRouter();

const article = ref(null);
const imageUrl = ref(null);
const loading = ref(true);
const displayedItems = ref([]);
const usedArticles = new Set();
const lastKey = ref(null);
const hasMore = ref(true);
const ads = ref([]);
const adIndex = ref(0);
const perPage = 3;
const adsLoaded = ref(false);

async function loadArticle() {
  loading.value = true;
  const slug = route.params.slug;
  const topic = route.query.topic || "all";

  const res = await fetch(
    `https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic}.json`
  );
  const json = await res.json();
  const found = Object.entries(json || {}).find(([_, a]) => a.slug === slug);
  if (!found) return router.replace("/404");

  article.value = { id: found[0], ...found[1] };

  // Обновление views без отдельного GET-запроса
    const updatedViews = typeof article.value.views === "number" ? article.value.views + 1 : 1;
    const updates = {
      [`/articles/${topic}/${article.value.id}/views`]: updatedViews,
      [`/articles/all/${article.value.id}/views`]: updatedViews,
    };
    await fetch("https://first-project-889f3-default-rtdb.firebaseio.com/.json", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    article.value.views = updatedViews;

  imageUrl.value = article.value.imageUrl?.startsWith("https://res.cloudinary.com/")
    ? optimizeImage(article.value.imageUrl)
    : null;

  useHead({
    title: article.value.title,
    meta: [
      { name: "description", content: article.value.description || "" },
      { property: "og:title", content: article.value.title },
      { property: "og:description", content: article.value.description || "" },
      { property: "og:image", content: article.value.imageUrl || "" },
    ],
  });

  // Одновременная загрузка рекламы и других статей
  await Promise.all([loadAds(), loadMoreArticles()]);

  loading.value = false;
}

async function loadAds() {
  if (adsLoaded.value) return;
  const res = await fetch("https://first-project-889f3-default-rtdb.firebaseio.com/ads.json");
  const json = await res.json();
  ads.value = Object.entries(json || {}).map(([id, a]) => ({ id, ...a, isAd: true }));
  adsLoaded.value = true;
}

async function loadMoreArticles() {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  const url = `https://first-project-889f3-default-rtdb.firebaseio.com/articles/all.json?orderBy=\"$key\"&limitToFirst=${
    perPage + 1
  }${lastKey.value ? `&startAt=\"${lastKey.value}\"` : ""}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!json) {
    hasMore.value = false;
    return;
  }

  const entries = Object.entries(json || {}).filter(([id]) => id !== article.value.id);
  const newArticles = entries
    .map(([id, a]) => ({ id, ...a }))
    .filter((a) => !usedArticles.has(a.id));

  if (!newArticles.length) {
    hasMore.value = false;
    return;
  }

  lastKey.value = newArticles.at(-1)?.id;

  let count = 0;
  const result = [];

  for (const art of newArticles) {
    if (usedArticles.has(art.id)) continue;
    usedArticles.add(art.id);
    result.push(art);
    count++;

    if (count % 2 === 0 && ads.value.length > 0) {
      const ad = ads.value[adIndex.value % ads.value.length];
      result.push({ ...ad });
      adIndex.value++;
    }
  }

  displayedItems.value.push(...result);
  loading.value = false;
}

function handleScroll() {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
  if (nearBottom && !loading.value) loadMoreArticles();
}

onMounted(() => {
  loadArticle();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.fullPath,
  async () => {
    if (route.name === "articles-slug") await loadArticle();
  }
);
</script>
