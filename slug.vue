<template>
  <div class="flex-1 nuxt-page" style="padding-top: 100px; width: 100%">
    <!-- Статья -->
    <article v-if="article" class="article">
      <!-- Главное изображение (для LCP) -->
      <NuxtImg
        v-if="imageUrl"
        :src="imageUrl"
        :alt="article.imageAlt || article.title"
        width="600"
        height="450"
        format="webp"
        fit="cover"
        quality="auto"
        fetchpriority="high"
        loading="eager"
        sizes="(max-width: 768px) 100vw, 600px"
        style="aspect-ratio: 4/3"
      />

      <h1 class="font-semibold text-[18px] mt-4">
        {{ article.title }}
      </h1>

      <p class="leading-[1.8]" style="white-space: pre-wrap">
        {{ article.content }}
      </p>

      <div v-if="clientViews !== null" class="flex items-center gap-2 text-sm mt-4 text-gray-600">
        <span class="material-icons-outlined">visibility</span>
        Visninger: {{ clientViews }}
      </div>
    </article>

    <!-- Блок "другие статьи" с рекламой -->
    <div v-if="displayedItems.length">
      <h2 class="text-xl mb-5 font-semibold">Andre artikler</h2>

      <article
        v-for="item in displayedItems"
        :key="item.id + (item.isAd ? '-ad' : '')"
        class="article related-article"
      >
        <!-- Реклама -->
        <a v-if="item.isAd" class="rounded flex flex-col gap-5" :href="item.url" target="_blank">
          <p class="text-xs uppercase text-red-700">Reklame</p>
          <h1 class="font-semibold text-[18px]">{{ item.title }}</h1>
          <NuxtImg
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.imageAlt || item.title"
            width="600"
            height="450"
            format="webp"
            fit="cover"
            quality="auto"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 600px"
            style="aspect-ratio: 4/3"
          />
          <p style="white-space: pre-wrap">{{ item.content }}</p>
        </a>

        <!-- Статья -->
        <nuxt-link
          v-else
          class="flex flex-col gap-5"
          :to="`/articles/${item.slug}?topic=${item.topic}`"
        >
          <h1 class="font-semibold text-[18px]">{{ item.title }}</h1>
          <NuxtImg
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="item.imageAlt || item.title"
            width="600"
            height="450"
            format="webp"
            fit="cover"
            quality="auto"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 600px"
            style="aspect-ratio: 4/3"
          />
          <p style="white-space: pre-wrap">
            {{ truncateText(item.content) }}
            <span class="text-blue-600 font-semibold">Les mer</span>
          </p>
        </nuxt-link>
      </article>

      <div v-if="isLoading" class="loader text-center my-10 mx-auto"></div>
    </div>

    <!-- Лоадер -->
    <div v-if="!article" class="text-center mt-10 mx-auto"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "#imports";
import truncateText from "~/mixins/truncateText";
import { useCloudinaryImage } from "~/composables/useCloudinaryImage";
import { useAds } from "~/composables/useAds";

const { optimizeImage } = useCloudinaryImage();
const { loadAds, getNextAd, ads } = useAds(); // загрузка рекламы
const route = useRoute();
const router = useRouter();

const article = ref(null);
const relatedArticles = ref([]);
const imageUrl = ref(null);
const loading = ref(true);
const clientViews = ref(null);
const allArticles = ref([]);
const loadedCount = ref(0);
const currentSlug = ref(null);
const lastArticleKey = ref(null); // Начальный ключ для пагинации
const hasMore = ref(true); // Флаг для загрузки статей
const articlesPerPage = 3; // Подгружать по 3 статьи

// SEO
useHead({
  title: "Alle artikler",
  meta: [
    { name: "description", content: "Alle artikler på nettstedet vårt" },
    { name: "keywords", content: "статьи, блог, новости, актуальное" },
    { property: "og:title", content: "artikler, blogg, nyheter, aktuelt" },
    { property: "og:description", content: "Alle artikler på nettstedet vårt" },
  ],
});

// Загрузка статьи
async function loadArticle() {
  const slug = route.params.slug;
  const topic = route.query.topic;

  loading.value = true;

  try {
    // Получение статьи
    const res = await fetch(
      `https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic}.json`
    );
    const json = await res.json();
    const found = Object.entries(json || {}).find(([_, a]) => a.slug === slug);

    if (!found) return router.replace("/404");

    article.value = { id: found[0], ...found[1] };

    // Обрабатываем изображение
    imageUrl.value =
      article.value.imageUrl && article.value.imageUrl.startsWith("https://res.cloudinary.com/")
        ? optimizeImage(article.value.imageUrl)
        : null;

    // SEO
    useHead({
      title: article.value.title,
      meta: [
        { name: "description", content: article.value.description || "Описание отсутствует" },
        { property: "og:title", content: article.value.title },
        { property: "og:description", content: article.value.description || "" },
        { property: "og:image", content: article.value.imageUrl || "" },
      ],
    });

    // Загружаем другие статьи
    loadMoreArticles();
  } catch (e) {
    console.error("❌ Ошибка загрузки статьи:", e);
    return router.replace("/404");
  } finally {
    loading.value = false;
  }
}

// Загрузка других статей с пагинацией
async function loadMoreArticles() {
  if (!hasMore.value || loading.value) return;
  loading.value = true;

  try {
    let url = `https://first-project-889f3-default-rtdb.firebaseio.com/articles/all.json?orderBy="$key"&limitToFirst=${articlesPerPage}`;
    if (lastArticleKey.value) {
      // Пагинация: если есть ключ, подгружаем данные начиная с последней статьи
      url += `&startAt="${lastArticleKey.value}"`;
    }

    const res = await fetch(url);
    const json = await res.json();

    if (!json) return (hasMore.value = false);

    const newArticles = Object.entries(json)
      .map(([id, article]) => ({ id, ...article }))
      .filter((a) => a.id !== article.value.id); // Исключаем текущую статью

    // Добавляем рекламу после каждой второй статьи
    newArticles.forEach((article, index) => {
      if (index % 2 === 0 && ads.length > 0) {
        newArticles.splice(index + 1, 0, getNextAd()); // Вставляем рекламу после каждой второй статьи
      }
    });

    relatedArticles.value.push(...newArticles);
    loadedCount.value += newArticles.length;

    // Устанавливаем новый лимит на подгрузку
    lastArticleKey.value = newArticles[newArticles.length - 1]?.id;
    if (newArticles.length < articlesPerPage) hasMore.value = false;
  } catch (e) {
    console.error("Ошибка загрузки других статей:", e);
  } finally {
    loading.value = false;
  }
}

// Обработчик скролла
function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    loadMoreArticles();
  }
}

// Слушаем события скролла
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Следим за изменением маршрута
watch(
  () => route.fullPath,
  async () => {
    const slug = route.params.slug;
    const topic = route.query.topic || "all";
    currentSlug.value = slug;

    await loadArticle(slug, topic);
  },
  { immediate: true }
);
</script>

<style scoped>
img {
  width: 100%;
}
.article {
  margin-bottom: 40px;
}
.related-article {
  display: flex !important;
  flex-direction: column;
  gap: 40px !important;
}
/* .ads {
    z-index: 100000;
    background-color: white;
    display: none;
  } */
/* @media (max-width: 1024px) {
    .ads-1,
    .ads-2,
    .ads-3 {
      display: none;
    }
  }
  .ads-1 {
    bottom: 2%;
    left: 2%;
  }
  .ads-2 {
    top: 0;
    left: 0;
    img {
      width: 100%;
      @media (max-width: 500px) {
        width: 150px;
      }
    }
    div {
      @media (max-width: 500px) {
        width: 150px;
        font-size: 12px;
      }
    }
  }
  .ads-3 {
    bottom: 2%;
    right: 2%;
    display: none;
  }
  .ads-4 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (min-width: 500px) {
      display: none;
    }
  } */
</style>

<!-- <template>
  <div class="article-wrapper">
    <div
      v-if="loading"
      class="loader mt-10 text-center absolute left-[50%] translate-x-[-50%]"
    ></div>

    <article
      v-else
      class="article"
    >
      <h1 class="font-semibold text-[18px]">{{ article.title }}</h1>

      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="article.imageAlt || article.title"
        width="600"
        height="450"
        decoding="async"
        fetchpriority="high"
      />

      <p
        class="leading-[1.8]"
        style="white-space: pre-wrap"
      >
        {{ article.content }}
      </p>

      <div
        v-if="clientViews !== null"
        class="flex items-center gap-2 text-sm mt-4 text-gray-600"
      >
        <span class="material-icons-outlined">visibility</span>
        Visninger: {{ article.views || 0 }}
      </div>
    </article>

    Другие статьи
    <ClientOnly>
      <div v-if="relatedArticles.length">
        <h3 class="text-xl mb-5 font-semibold">Andre artikler</h3>

        <div
          v-for="related in relatedArticles"
          :key="related.id"
          class="article related-article"
        >
          Если это статья
          <nuxt-link
            v-if="related.slug && related.topic"
            class="flex flex-col gap-5"
            :to="`/articles/${related.slug}?topic=${related.topic}`"
          >
            <h2 class="font-semibold text-[18px]">{{ related.title }}</h2>
            <img
              v-if="related.imageUrl"
              :src="optimizeImage(related.imageUrl)"
              :alt="related.imageAlt || related.title"
              width="600"
              height="450"
              loading="lazy"
            />
            <p style="white-space: pre-wrap">
              {{ truncateText(related.content) }}
              <b style="color: #418af3">Les mer</b>
            </p>
            <div
              v-if="clientViews !== null"
              class="flex items-center gap-2 text-sm mt-4 text-gray-600"
            >
              <span class="material-icons-outlined">visibility</span>
              Visninger: {{ related.views || 0 }}
            </div>
          </nuxt-link>

          Если это реклама
          <div
            v-else
            class="bg-gray-100 p-4 rounded"
          >
            <p class="text-sm text-gray-600">Reklame</p>
            <h2 class="font-semibold text-[18px]">{{ related.title }}</h2>
            <img
              v-if="related.imageUrl"
              :src="optimizeImage(related.imageUrl)"
              :alt="related.imageAlt || related.title"
              width="600"
              height="450"
              loading="lazy"
            />
            <p style="white-space: pre-wrap">
              {{ related.content }}
            </p>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useHead } from '#imports';
  import truncateText from '~/mixins/truncateText';
  import { useCloudinaryImage } from '~/composables/useCloudinaryImage';
  import { useAds } from '~/composables/useAds';

  const { optimizeImage } = useCloudinaryImage();
  const { loadAds, getAds } = useAds();
  const route = useRoute();
  const router = useRouter();

  const article = ref(null);
  const relatedArticles = ref([]);
  const imageUrl = ref(null);
  const loading = ref(true);
  const clientViews = ref(null);

  onMounted(() => {
    clientViews.value = article.value?.views || 0;
  });

  async function loadArticle() {
    if (!route.params.slug) return;

    loading.value = true;
    const slug = route.params.slug;
    const topic = route.query.topic || 'all';

    try {
      const [res] = await Promise.all([
        fetch(`https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic}.json`),
        loadAds(),
      ]);

      const json = await res.json();
      const found = Object.entries(json || {}).find(([_, a]) => a.slug === slug);
      if (!found) return router.replace('/404');

      article.value = { id: found[0], ...found[1] };

      const newViews = (article.value.views || 0) + 1;
      article.value.views = newViews;

      await Promise.all([
        fetch(
          `https://first-project-889f3-default-rtdb.firebaseio.com/articles/${topic}/${article.value.id}.json`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ views: newViews }),
          },
        ),
        fetch(
          `https://first-project-889f3-default-rtdb.firebaseio.com/articles/all/${article.value.id}.json`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ views: newViews }),
          },
        ),
      ]);

      imageUrl.value = article.value.imageUrl?.startsWith('https://res.cloudinary.com/')
        ? optimizeImage(article.value.imageUrl)
        : null;

      useHead({
        title: article.value.title,
        meta: [
          { name: 'description', content: article.value.description || 'Описание отсутствует' },
          { property: 'og:title', content: article.value.title },
          { property: 'og:description', content: article.value.description || '' },
          { property: 'og:image', content: article.value.imageUrl || '' },
        ],
      });

      const articlesOnly = Object.entries(json || {})
        .filter(([_, a]) => a.slug !== slug)
        .map(([id, a]) => ({ id, topic, ...a }));

      const adsPool = getAds(3);
      const items = [];
      let count = 0;
      let adIndex = 0;

      for (const a of articlesOnly) {
        items.push(a);
        count++;
        if (count % 2 === 0 && adIndex < adsPool.length) {
          items.push(adsPool[adIndex++]);
        }
        if (items.length >= 5) break;
      }

      relatedArticles.value = items;
    } catch (e) {
      console.error('❌ Ошибка загрузки статьи:', e);
      return router.replace('/404');
    } finally {
      loading.value = false;
    }
  }

  await loadArticle();

  watch(
    () => route.fullPath,
    async () => {
      if (route.name !== 'articles-slug') return;
      await loadArticle();
    },
  );
</script> -->
