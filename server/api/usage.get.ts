import { Translator } from "deepl-node";

export default defineEventHandler(() => {
  const { deeplApiKey } = useRuntimeConfig();
  const deepl = new Translator(deeplApiKey);
  return deepl.getUsage();
});
