import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "",
  integrations: [Sentry.replayIntegration()],
  enabled: process.env.NODE_ENV === "production",
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});

export default Sentry;
