<template>
  <v-card>
    <v-card-title> Input </v-card-title>
    <v-card-text>
      <LanguageSelect
        v-model="input.lang"
        :props="{
          label: 'Language',
          variant: 'outlined',
          readonly: props.loading,
        }"
      ></LanguageSelect>
      <v-textarea
        v-model="input.text"
        auto-grow
        placeholder="My perfect story"
        variant="outlined"
        :readonly="props.loading"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        variant="text"
        :loading="props.loading"
        :disabled="input.text.length <= 0 || !input.lang"
        @click="emit('translate', input.lang, input.text)"
      >
        Translate
      </v-btn>
      <v-btn variant="text" :disabled="loading" @click="emit('clear')">
        Clear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { LanguageCode } from "deepl-node";

const props = defineProps<{
  loading: boolean;
}>();
const emit = defineEmits<{
  (e: "translate", base: LanguageCode, text: string): void;
  (e: "clear"): void;
}>();

const input = useTranslateInput();
</script>

<style scoped></style>
