<template>
  <div v-if="['text', 'number', 'email', 'date'].includes(type)" class="space-y-2">
    <!-- Показывать список только если есть опции -->
    <div v-for="(opt, i) in options" :key="i" class="group relative">
      <input v-model="opt.label" :type="type" class="border pr-8" />
      <button
        type="button"
        class="absolute right-1 top-1 text-red-500 hidden group-hover:block"
        @click="removeOption(i)"
      >
        ✕
      </button>
    </div>

    <button type="button" class="text-blue-500 mt-2" @click="newOption">+ Добавить вариант</button>
  </div>

  <div v-else-if="type === 'radio' || type === 'checkbox'" class="form-radio">
    <div>
      <label for="formradio" class="flex gap-4" v-for="(q, i) in props.options" :key="i">
        <input
          :type="type"
          :name="choose"
          :value="q.label"
          v-model="internalValue"
          v-if="type === 'radio'"
        />
        <input
          type="checkbox"
          :name="'checkbox_' + i"
          :value="q.label || 'option_' + i"
          :checked="internalValue.includes(q.label || 'option_' + i)"
          @change="toggleCheckbox(q.label || 'option_' + i, $event)"
          v-else
        />
        <input type="text" v-model="q.label" class="border-b" />
        <button class="btn group-hover:block hidden transition" @click="removeOption(i)">✕</button>
      </label>
    </div>
    <button type="button" class="text-blue-500 mt-2" @click="newOption">+ Добавить вариант</button>
  </div>
  <div v-if="type === 'select'">
    <select class="border" v-model="internalValue">
      <option value="">Выберите из списка</option>
      <option v-for="(opt, i) in options" :key="i" :value="opt.label || ''">
        {{ opt.label || "" }}
      </option>
    </select>
    <div v-for="(q, i) in props.options" :key="i" class="flex gap-4 mt-2 group">
      <input type="text" v-model="q.label" class="border-b" />
      <button class="btn group-hover:block hidden transition" @click="removeOption(i)">✕</button>
    </div>

    <button type="button" class="text-blue-500 mt-2" @click="newOption">+ Добавить вариант</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  type: String,
  modelValue: [String, Array],
  options: Array,
});
const emit = defineEmits(["update:modelValue", "update:options"]);

const internalValue = ref(props.type === "checkbox" ? props.modelValue || [] : props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
);

watch(internalValue, (val) => {
  emit("update:modelValue", val);
});

const toggleCheckbox = (value, event) => {
  const updated = [...internalValue.value];
  if (event.target.checked) {
    updated.push(value);
  } else {
    const index = updated.indexOf(value);
    if (index !== -1) updated.splice(index, 1);
  }
  internalValue.value = updated;
};

const newOption = () => {
  const update = [...props.options, { label: "", answer: "" }];
  emit("update:options", update);
};

const removeOption = (i) => {
  const updated = [...props.options];
  updated.splice(i, 1);
  emit("update:options", updated);
};
</script>

<style lang="scss" scoped></style>
