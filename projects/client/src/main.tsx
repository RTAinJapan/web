import { createRoot } from "react-dom/client";
import { App } from "./app";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import { z } from "zod";

i18next.init({
  lng: "ja",
  resources: {
    ja: {
      zod: translation,
    },
  },
});
z.setErrorMap(zodI18nMap);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
