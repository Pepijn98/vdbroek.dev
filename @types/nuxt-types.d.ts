import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BuefyNamespace } from "buefy";
import Utils from "~/interfaces/utils.types";

declare module "@nuxt/types" {
    interface Context {
        $axios: NuxtAxiosInstance;
        readonly $sentry: typeof SentryTypes;
    }

    interface NuxtAppOptions {
        $utils: Utils

        $axios: NuxtAxiosInstance;
        $buefy: BuefyNamespace;
        readonly $sentry: typeof SentryTypes;
    }
}
