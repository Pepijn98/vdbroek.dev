import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module "@nuxt/types" {
    interface Context {
        $axios: NuxtAxiosInstance;
        readonly $sentry: typeof SentryTypes;
    }

    interface NuxtAppOptions {
        // @nuxtjs/axios
        $axios: NuxtAxiosInstance;
        
        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
