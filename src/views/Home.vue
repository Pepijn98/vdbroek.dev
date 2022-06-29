<template>
    <div class="content">
        <v-btn
            class="theme-switch"
            variant="plain"
            :icon="switchIcon"
            :ripple="false"
            @click="toggleTheme" />
        <section class="about hero is-fullheight">
            <v-card
                class="about__card"
                :width="width"
                :elevation="elevation"
                tonal>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-avatar
                            class="ma-3"
                            :size="size"
                            rounded>
                            <v-img src="https://avatars.githubusercontent.com/u/14877471?v=4" />
                        </v-avatar>
                    </div>
                    <div>
                        <v-card-title>Pepijn van den Broek</v-card-title>
                        <v-card-text>
                            Hello, welcome to my personal website.<br>
                            Here I'll be telling a little bit about myself and showcase some pinned repos from github.<br><br>
                            I'm a fullstack developer based in the Netherlands.<br>
                            I'm {{ getAge() }} years old and have been a fullstack developer for {{ getCodingSince() }} years!<br>
                            I've contibuted and made different projects like Jeanne (Discord Bot), Kitsu C# library and CustomRPC to set rich presence on discord. Scroll down to see my pinned repositories!
                            Everything I do is to improve my programming skills in several languages and keep learning new things. I mainly enjoy using TypeScript (NodeJS) and Kotlin but I've also used Swift, Rust, Golang and Python.
                            If you're interested in seeing what I make scroll down to see my pinned repositories or go to my github page to see all my repositories.
                        </v-card-text>
                    </div>
                </div>
                <v-card-actions>
                    <v-btn
                        class="ml-2"
                        icon="fab fa-github"
                        href="https://github.com/pepijn98"
                        target="_blank"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-discord"
                        title="pepijn98#1561"
                        href="https://discord.com/users/964236379817136230"
                        target="_blank"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-twitter"
                        href="https://twitter.com/vdbroek98"
                        target="_blank"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-facebook"
                        href="https://www.facebook.com/pepijnvdbroek"
                        target="_blank"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-linkedin"
                        href="https://www.linkedin.com/in/pepijn-van-den-broek/"
                        target="_blank"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-google-play"
                        href="https://play.google.com/store/apps/dev?id=4732354838030747081"
                        target="_blank"
                        variant="text" />
                </v-card-actions>
            </v-card>
        </section>
        <div class="projects__wrap" :style="`width: ${width}`">
            <section class="projects hero is-fullheight">
                <ProjectCard
                    v-for="repo in repos"
                    :key="repo.name"
                    :repo="repo" />
            </section>
        </div>
        <v-btn
            class="scroll animate-icon"
            variant="tonal"
            icon="fas fa-caret-down"
            @click="scroll" />
    </div>
</template>

<script setup lang="ts">
import { inject, ref, onBeforeMount, onMounted, onUnmounted, computed } from "vue";
import { useTheme, useDisplay } from "vuetify";
import { GithubUser, Repo } from "~/types/github";
import Vue3SmoothScroll from "vue3-smooth-scroll";
import ProjectCard from "~/components/ProjectCard.vue";

let isScrolling = false;
let offset = 0;

const { name } = useDisplay();
const theme = useTheme();

const user = ref<GithubUser>();
const repos = ref<Repo[]>();

const scrollY = ref(0);

const smoothScroll = inject<typeof Vue3SmoothScroll>("smoothScroll");

const elevation = computed(() => theme.global.current.value.dark ? 5 : 10);

const switchIcon = computed(() => theme.global.current.value.dark ? "mdi:mdi-weather-night" : "mdi:mdi-white-balance-sunny");

const size = computed(() => {
    switch (name.value) {
        case "xs": return "120";
        case "sm": return "200";
        case "md":
        case "lg":
        case "xl":
        case "xxl":
        default: return "260";
    }
});

const width = computed(() => {
    switch (name.value) {
        case "xs": return "95%";
        case "sm": return "90%";
        case "md":
        case "lg": return "80%";
        case "xl":
        case "xxl":
        default: return "70%";
    }
});

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? "vdb-light" : "vdb-dark";
}

function onScrollUpdate() {
    scrollY.value = window.scrollY;

    // Reset isScrolling when scrollY reaches offset destination
    if (window.scrollY === offset) {
        isScrolling = false;
    }

    // Do not rotate icon when scrolling is activated by button click
    if (isScrolling) return;

    const icon = document.querySelector(".scroll i");
    if (icon) {
        if (window.scrollY > 400) {
            icon.classList.add("rotate");
        } else {
            icon.classList.remove("rotate");
        }
    }
}

function scroll() {
    isScrolling = true;

    const icon = document.querySelector(".scroll i");
    if (icon) {
        if (scrollY.value < 400) {
            const element = document.querySelector<HTMLElement>(".projects");
            if (element) {
                offset = element.offsetTop;

                smoothScroll({ scrollTo: element });
                icon.classList.add("rotate");
            }
        } else {
            offset = 0;

            smoothScroll({ scrollTo: document.body });
            icon.classList.remove("rotate");
        }
    }
}

function getAge() {
    const birthday = new Date("1998-02-26");
    const ageDiff = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getCodingSince() {
    const start = new Date("2015-01-01");
    const diff = Date.now() - start.getTime();
    const date = new Date(diff);
    return Math.abs(date.getUTCFullYear() - 1970);
}

onBeforeMount(async () => {
    const response = await fetch("https://api.github.com/users/Pepijn98");
    user.value = await response.json();

    if (import.meta.env.MODE === "production") {
        const response2 = await fetch("https://api.vdbroek.dev/github/pinned", {
            headers: {
                "Authorization": import.meta.env.VITE_API_KEY || ""
            }
        });
        repos.value = (await response2.json()).repos;
    } else {
        repos.value = (await import("~/assets/example-data.json")).repos;
    }
});

onMounted(() => window.addEventListener("scroll", onScrollUpdate));

onUnmounted(() => window.removeEventListener("scroll", onScrollUpdate));
</script>

<style scoped lang="scss">
.theme-switch {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-top: 5px;
    margin-left: 5px;
}

.about {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    align-items: center;
}

.projects {
    display: flex;
    flex-flow: row wrap;

    justify-content: center;
    align-items: center;
    gap: 50px;

    .project {
        flex: 0 1;
    }

    &__wrap {
        margin: 50px auto;
    }
}

.scroll {
    position: fixed;
    z-index: 1;
    bottom: 0;
    right: 0;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    background-color: rgb(var(--v-theme-surface));;
}
</style>
