<template>
    <div class="container">
        <div class="info">
            <h1 class="text-3xl font-bold" @click="toggleDark()">
                Toggle Dark Mode
            </h1>
        </div>
        <div class="projects">
            <h1 class="text-3xl font-bold">
                Hello world!
            </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import "element-plus/theme-chalk/src/dark/css-vars.scss";
import "@/assets/scss/main.scss";
import { useState } from "vue-gtag-next";
import { ID_INJECTION_KEY, ElNotification, ElButton } from "element-plus";
import { useDark, useToggle } from "@vueuse/core";

provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0
});

const isDark = useDark();
const toggleDark = useToggle(isDark);
const gtag = useState();

/**
 * @returns true if string matches "true" else false
 */
const parseBool = (str: string): boolean => str === "true";

onMounted(() => {
    const accepted = localStorage.getItem("cookies-accepted") || "false";

    if (parseBool(accepted)) {
        gtag.isEnabled.value = true;
    } else {
        const cookieAlert = ElNotification({
            title: "Cookies",
            dangerouslyUseHTMLString: true,
            message: `
            <p>This site uses cookies to gather data for sentry error handling and google analytics</p>
            <br>
            <button id="cookie-accept" class="el-button el-button--primary" aria-disabled="false" type="button"><span>Accept</span></button>
            <button id="cookie-deny" class="el-button el-button--info" aria-disabled="false" type="button"><span>Deny</span></button>
            `,
            position: "bottom-left",
            showClose: false,
            duration: 0
        });

        document.getElementById("cookie-accept")
            .onclick = () => {
                gtag.isEnabled.value = true;
                localStorage.setItem("cookies-accepted", "true");
                cookieAlert.close();
            };

        document.getElementById("cookie-deny")
            .onclick = () => {
                gtag.isEnabled.value = false;
                localStorage.setItem("cookies-accepted", "false");
                cookieAlert.close();
            };
    }
});
</script>

<style lang="scss">
.info {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
}
</style>
