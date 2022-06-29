import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

import { aliases, fa } from "vuetify/iconsets/fa";

import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
    theme: {
        defaultTheme: "vdb-dark",
        themes: {
            "vdb-light": {
                dark: false,
                colors: {
                    primary: "#F5CA7B",
                    secondary: "#F1B74C",
                    accent: "#7BA6F5",
                    error: "#FF3860",
                    warning: "#FFDD57",
                    info: "#209CEE",
                    success: "#48C774",
                    surface: "#DEE2EB"
                }
            },
            "vdb-dark": {
                dark: true,
                colors: {
                    primary: "#F5CA7B",
                    secondary: "#F1B74C",
                    accent: "#7BA6F5",
                    error: "#FF3860",
                    warning: "#FFDD57",
                    info: "#209CEE",
                    success: "#48C774"
                }
            }
        }
    },
    icons: {
        defaultSet: "fa",
        aliases,
        sets: {
            fa,
            mdi
        }
    }
});
