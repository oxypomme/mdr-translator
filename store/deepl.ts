import type { Language, Usage } from "deepl-node";
import { defineStore } from "pinia";

type State = {
  languages: Language[];
  usage: Usage | undefined;
};

export const useDeeplStore = defineStore({
  id: "deepl-store",
  state: (): State => ({
    languages: [],
    usage: undefined,
  }),
  actions: {
    async fetchLanguages() {
      try {
        this.languages = await $fetch("/api/languages");
      } catch (error) {}
    },
    async fetchUsage() {
      try {
        this.usage = await $fetch("/api/usage");
      } catch (error) {}
    },
  },
  getters: {
    languagesList: (state) => state.languages,
    usageDetail: (state) => state.usage,
  },
});
