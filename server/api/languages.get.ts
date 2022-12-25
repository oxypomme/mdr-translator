import { Translator } from "deepl-node";

export default defineEventHandler(async () => {
  const { deeplApiKey } = useRuntimeConfig();
  const deepl = new Translator(deeplApiKey);

  const languages = [
    await deepl.getSourceLanguages(),
    await deepl.getTargetLanguages(),
  ].reduce((a, b) => a.filter((c) => b.find(({ code }) => code === c.code)));

  return [...languages].sort((a, b) => (a.name > b.name ? 1 : -1));
});
