<template>
  <v-select
    :value="props.modelValue"
    :items="deepl.languagesList"
    item-title="name"
    item-value="code"
    v-bind="props.props"
    @update:model-value="(v: LanguageCode) => emit('update:modelValue', v)"
  ></v-select>
</template>

<script setup lang="ts">
import type { LanguageCode } from "deepl-node";
import type { VSelect } from "vuetify/components";
import { useDeeplStore } from "~~/store/deepl";

const props = defineProps<{
  props?: VSelect["$props"];
  modelValue?: LanguageCode;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: LanguageCode): void;
}>();

const deepl = useDeeplStore();
</script>

<style scoped lang="scss"></style>
