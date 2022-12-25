<template>
  <div>
    <v-row>
      <v-col>
        <DeeplUsage></DeeplUsage>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TextInput :loading="loading" @translate="onTranslate" @clear="onClear">
        </TextInput>
      </v-col>
      <v-col>
        <TextOutput
          :progress="translateProgress"
          :lang="outputLanguage"
          :text="outputText"
          @max-language-changed="(v) => (maxLanguageCount = v)"
        >
        </TextOutput>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { LanguageCode } from "deepl-node";
import { useDeeplStore } from "~/store/deepl";

const loading = ref(false);
const maxLanguageCount = ref(1);

const outputLanguage = ref<string>("");
const outputText = ref("");

const deepl = useDeeplStore();
deepl.fetchLanguages();
const input = useTranslateInput();

const translateIteration = ref(0);
const translateMaxIteration = ref(1);
const translateProgress = computed(
  () => (translateIteration.value / translateMaxIteration.value) * 100
);

const onTranslate = async (baseCode: LanguageCode, baseText: string) => {
  loading.value = true;
  translateIteration.value = 0;
  translateMaxIteration.value = 1;

  try {
    // Getting base language
    let langs = [...deepl.languagesList];
    const index = langs.findIndex(({ code }) => code === baseCode);
    if (index <= 0) {
      return;
    }
    const base = langs.splice(index, 1)[0];
    langs = [base, ...langs.slice(0, maxLanguageCount.value), base];
    translateMaxIteration.value = langs.length - 1;

    // Iterating over all languages
    let text = baseText;
    for (let i = 0; i < langs.length - 1; i++) {
      const lang = langs[i];
      const next = langs[i + 1];

      const result = await $fetch(
        `/api/translate?from=${lang.code}&to=${next.code}`,
        {
          method: "POST",
          body: text,
        }
      );
      text = Array.isArray(result)
        ? result.map(({ text }) => text).join("\n")
        : result.text;

      deepl.fetchUsage();
      outputLanguage.value = next.name;
      outputText.value = text;
      translateIteration.value += 1;
    }
  } catch (error) {}

  loading.value = false;
};

const onClear = () => {
  input.value = {
    lang: "" as LanguageCode,
    text: "",
  };
};
</script>

<style scoped lang="scss"></style>
