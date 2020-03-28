import * as SentryTypes from "@sentry/minimal";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { BuefyNamespace } from "buefy";
import Utils from "~/interfaces/utils.types";

declare module "vue/types/vue" {
    interface Vue {
        $utils: Utils;

        $axios: NuxtAxiosInstance;
        $buefy: BuefyNamespace;
        readonly $sentry: typeof SentryTypes;
    }
}
