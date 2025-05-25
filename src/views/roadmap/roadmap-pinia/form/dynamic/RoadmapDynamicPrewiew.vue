<template>
  <li>
    <label v-if="['text', 'number', 'email', 'date'].includes(type)">
      <input
        type="text"
        v-model="localLabel"
        class="border-b m-3"
        placeholder="Введите ваш вопрос"
      />
      <input
        :type="type"
        class="border"
        v-model="localPlaceholder"
        :placeholder="`Введите placeholder ${type}`"
      />
    </label>
    <div v-else-if="type === 'radio' || type === 'checkbox'">
      <input
        type="text"
        v-model="localLabel"
        class="border-b m-3"
        placeholder="Введите ваш вопрос"
      />
      <label v-for="(answer, i) in options" :key="i">
        <input :type="type" name="choose" />
      </label>
    </div>
    <label v-else-if="type === 'select'">
      <input
        type="text"
        v-model="localLabel"
        class="border-b m-3"
        placeholder="Введите ваш вопрос"
      />
      <select name="" id=""></select>
    </label>
  </li>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  index: Number,
  type: String,
  label: String,
  answer: [String || Array || Number],
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update-question"]);

const localLabel = ref(props.label);
const localPlaceholder = ref(props.placeholder);

watch([localLabel, localPlaceholder], () => {
  emit("update-question", {
    index: props.index,
    label: localLabel.value,
    placeholder: localPlaceholder.value,
  });
  // console.log(localLabel, localPlaceholder);
});
</script>
