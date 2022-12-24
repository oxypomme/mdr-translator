<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title> Input </v-card-title>
        <v-card-text>
          <v-select
            v-model="inputLanguage"
            label="Language"
            :items="languages"
            variant="outlined"
            :readonly="loading"
          ></v-select>
          <v-textarea
            v-model="inputText"
            auto-grow
            placeholder="My perfect story"
            variant="outlined"
            :readonly="loading"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn
            variant="text"
            :loading="loading"
            :disabled="inputText.length <= 0"
            @click="onTranslate"
          >
            Translate
          </v-btn>
          <v-btn variant="text" :disabled="loading" @click="onClear">
            Clear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title> Output </v-card-title>
        <v-card-text>
          <v-select
            v-model="outputLanguage"
            label="Language"
            :items="languages"
            variant="outlined"
            readonly
          ></v-select>
          <v-textarea
            v-model="outputText"
            auto-grow
            placeholder="My passable tale"
            variant="outlined"
            readonly
          ></v-textarea>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const languages = ["English", "Français"];

const loading = ref(false);

const inputLanguage = ref(languages[0]);
const inputText = ref("");

const outputLanguage = ref(languages[0]);
const outputText = ref("");

watch(inputLanguage, (val) => {
  outputLanguage.value = val;
});
watch(inputText, (val) => {
  outputText.value = val;
});

const onTranslate = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const onClear = () => {
  outputLanguage.value = inputLanguage.value;
  inputText.value = "";
  outputText.value = "";
};
</script>

<style scoped lang="scss"></style>
