import * as Sentry from "@sentry/browser";

import { BrowserTracing } from "@sentry/tracing";
import { defineNuxtPlugin } from "#app";
import pkg from "@/package.json";

export default defineNuxtPlugin((nuxtApp) => {
    const release = `${pkg.name}@${pkg.version}`;
    const environment = nuxtApp.$config.ENV;

    Sentry.init({
        dsn: nuxtApp.$config.SENTRY_DSN,
        release,
        environment,
        integrations: [new BrowserTracing()],
        sampleRate: 1,
        tracesSampleRate: 1
    });
});
