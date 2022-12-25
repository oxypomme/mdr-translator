<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>MDR Translator</v-toolbar-title>

      <v-btn
        href="https://github.com/oxypomme/mdr-translator"
        title="See project on GitHub"
        icon
      >
        <v-icon icon="mdi-github" />
      </v-btn>
      <v-btn icon title="Change theme" @click="toggleTheme">
        <v-icon :icon="themeIcon" />
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark");

const themeIcon = computed(() =>
  theme.global.current.value.dark ? "mdi-brightness-4" : "mdi-brightness-7"
);
</script>

<style scoped lang="scss"></style>
