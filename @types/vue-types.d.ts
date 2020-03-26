import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BuefyNamespace } from "buefy";

declare module "vue/types/vue" {
    interface Vue {
        // @nuxtjs/axios
        $axios: NuxtAxiosInstance;

        $buefy: BuefyNamespace;

        // sentry
        readonly $sentry: typeof SentryTypes;
    }
}
