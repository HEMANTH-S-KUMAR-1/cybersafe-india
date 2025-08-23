/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_TRANSLATOR_KEY?: string;
  readonly VITE_AZURE_TRANSLATOR_ENDPOINT?: string;
  readonly VITE_AZURE_TRANSLATOR_REGION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
