<template>
  <v-card>
    <v-card-title>
      <div class="d-flex align-center">
        <v-progress-circular
          :model-value="props.progress"
          size="20"
          class="mr-2"
        >
        </v-progress-circular>
        <span>Output</span>
      </div>
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="outputLanguage"
        label="Language"
        variant="outlined"
        readonly
      ></v-text-field>
      <v-textarea
        v-model="text"
        auto-grow
        placeholder="My passable tale"
        variant="outlined"
        readonly
      ></v-textarea>
      <v-slider
        v-model="maxLanguageCount"
        :min="1"
        :max="deepl.languagesList.length"
        :step="1"
        thumb-label
      >
        <template #append>
          {{ maxLanguageCount }}
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useDeeplStore } from "~/store/deepl";

const props = defineProps<{
  progress: number;
  lang: string;
  text: string;
}>();
const emit = defineEmits<{
  (e: "maxLanguageChanged", v: number): void;
}>();

const input = useTranslateInput();
const deepl = useDeeplStore();

const maxLanguageCount = ref(deepl.languagesList.length);
const text = ref(props.text);
const outputLanguage = ref("Unknown");

// If language list change, change slider position
watch(deepl.languagesList, (val) => {
  maxLanguageCount.value = val.length;
});
// If current translated lang change, update text field
watch(
  () => props.lang,
  (val) => {
    outputLanguage.value = val;
  }
);
// If current translated text change, update text area
watch(
  () => props.text,
  (val) => {
    text.value = val;
  }
);
// If input lang change, update text field
watch(
  () => input.value.lang,
  (val) => {
    const lang = deepl.languagesList.find(({ code }) => code === val);
    outputLanguage.value = lang?.name ?? "Unknown";
  }
);
// If input text change, update text area
watch(
  () => input.value.text,
  (val) => {
    text.value = val;
  }
);
// If slider change, notify parent
watch(maxLanguageCount, (val) => {
  emit("maxLanguageChanged", val);
});
</script>

<style scoped></style>
