/// <reference types="vite/client" />

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export {};