import {
  type SourceLanguageCode,
  type TargetLanguageCode,
  Translator,
  type Language,
} from "deepl-node";
import { createError } from "h3";

const isLanguageCode = <T extends SourceLanguageCode | TargetLanguageCode>(
  data: unknown,
  languages: readonly Language[]
): data is T => {
  const codes = languages.map(({ code }) => code);
  if (typeof data === "string") {
    return codes.includes(data as any);
  }
  return false;
};

const isString = (data: unknown): data is string | string[] => {
  if (Array.isArray(data)) {
    return data.every((v) => typeof v === "string");
  }
  return typeof data === "string";
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { from, to } = getQuery(event);

  // If body is not a string or an arrray of string
  if (!body || !isString(body)) {
    throw createError({
      message: "Body must be a string, or an array of string",
      statusCode: 400,
    });
  }

  if (!from || !to) {
    throw createError({
      message: "`from` & `to` parameters must be present",
      statusCode: 400,
    });
  }

  const { deeplApiKey } = useRuntimeConfig();
  const deepl = new Translator(deeplApiKey);

  if (
    !isLanguageCode<SourceLanguageCode>(
      from,
      await deepl.getSourceLanguages()
    ) ||
    !isLanguageCode<TargetLanguageCode>(to, await deepl.getTargetLanguages())
  ) {
    throw createError({
      message:
        "`from` & `to` must be valid languages codes. See `/api/languages` for available codes.",
      statusCode: 400,
    });
  }

  const usage = await deepl.getUsage();
  if (
    (usage.character?.count ?? 0) +
      (Array.isArray(body)
        ? body.reduce((p, c) => p + c.length, 0)
        : body.length) >=
    (usage.character?.limit ?? 0)
  ) {
    throw createError({
      message: "Maximum usage exceeded",
      statusCode: 400,
    });
  }

  return deepl.translateText(body, from, to);
});
