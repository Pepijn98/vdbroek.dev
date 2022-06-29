import "~/assets/css/main.css";

import App from "~/App.vue";
import VueSmoothScroll from "vue3-smooth-scroll";
import { createApp } from "vue";
import { loadFonts } from "~/plugins/webfontloader";
import router from "~/router";
import vuetify from "~/plugins/vuetify";

loadFonts();

createApp(App)
    .use(VueSmoothScroll)
    .use(router)
    .use(vuetify)
    .mount("#app");
