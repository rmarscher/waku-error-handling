// Init sentry / instrumentation
import Sentry from "./instrument";

// Other imports
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "waku/router/client";

const rootElement = (
  <StrictMode>
    <Router />
  </StrictMode>
);

// if ((globalThis as any).__WAKU_HYDRATE__) {
//   hydrateRoot(document, rootElement);
// } else {
//   createRoot(document as any).render(rootElement);
// }

if ((globalThis as any).__WAKU_HYDRATE__) {
  if (typeof window !== "undefined") {
    window.addEventListener("vite:preloadError", (event) => {
      console.error("Unexpected module load error. Reloading page.");
      window.location.reload();
    });
  }

  hydrateRoot(document, rootElement, {
      onCaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
        console.warn("hydrate - caught error", error, errorInfo.componentStack);
      }),
      onRecoverableError: Sentry.reactErrorHandler((error, errorInfo) => {
        console.warn(
          "hydrate - recoverable error",
          error,
          errorInfo.componentStack,
        );
      }),
      onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
        console.error(
          "hydrate - uncaught error",
          error,
          errorInfo.componentStack,
        );
      }),
    });
} else {
  createRoot(document, {
    onCaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn("root - caught error", error, errorInfo.componentStack);
    }),
    onRecoverableError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn("root - recoverable error", error, errorInfo.componentStack);
    }),
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn("root - uncaught error", error, errorInfo.componentStack);
    }),
  }).render(rootElement);
}
