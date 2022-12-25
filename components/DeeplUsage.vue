<template>
  <v-card>
    <v-card-title> DeepL Usage </v-card-title>
    <v-card-text>
      <div class="d-flex align-center">
        <v-progress-linear
          rounded
          :model-value="percentage"
        ></v-progress-linear>
        <span class="ml-4"> {{ percentage.toFixed(2) }}% </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useDeeplStore } from "~/store/deepl";

const deepl = useDeeplStore();

const percentage = computed(
  () =>
    ((deepl.usageDetail?.character?.count ?? 0) /
      (deepl.usageDetail?.character?.limit ?? 1)) *
    100
);

const timeout = ref<NodeJS.Timeout>();
onMounted(() => {
  deepl.fetchUsage();
  timeout.value = setInterval(() => deepl.fetchUsage(), 10000);
});
onUnmounted(() => {
  clearInterval(timeout.value);
  timeout.value = undefined;
});
</script>

<style scoped lang="scss"></style>
