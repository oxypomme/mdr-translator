import type { LanguageCode } from "deepl-node";

export default () =>
  useState("input-translate", () => ({
    lang: "" as LanguageCode,
    text: "",
  }));
