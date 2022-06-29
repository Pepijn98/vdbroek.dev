<template>
    <div class="content">
        <v-btn
            class="theme-switch"
            variant="plain"
            :icon="switchIcon()"
            :ripple="false"
            @click="toggleTheme" />
        <svg class="background-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill-opacity="1" d="M0,128L80,138.7C160,149,320,171,480,202.7C640,235,800,277,960,282.7C1120,288,1280,256,1360,240L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>
        <div class="about-section">
            <v-card
                class="about"
                max-width="70%"
                :elevation="elevation()"
                tonal>
                <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                        <v-avatar
                            class="ma-3"
                            size="260"
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
                            I've contibuted and made different projects like Jeanne (Discord Bot), Kitsu C# library and CustomRPC to set rich presence on discord. Scroll down to see my pinned repositiries!
                            Everything I do is to improve my programming skills in several languages and keep learning new things. I mainly enjoy using TypeScript (NodeJS) and Kotlin but I've also used Swift, Rust, Golang and Python.
                            If you're interested in seeing what I make scroll down to see my pinned repositiries or go to my github page to see all my repositiries.
                        </v-card-text>
                    </div>
                </div>
                <v-card-actions>
                    <v-btn
                        class="ml-2"
                        icon="fab fa-github"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-discord"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-twitter"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-facebook"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-linkedin"
                        variant="text" />
                    <v-btn
                        class="ml-2"
                        icon="fab fa-google-play"
                        variant="text" />
                </v-card-actions>
            </v-card>
        </div>
        <div class="projects-section">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
        <v-btn
            class="scroll animate-icon"
            variant="tonal"
            icon="fas fa-caret-down"
            @click="scroll" />
    </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify";
import Vue3SmoothScroll from "vue3-smooth-scroll";
import ProjectCard from "~/components/TestProjectCard.vue";

let isScrolling = false;
let offset = 0;

const theme = useTheme();

const smoothScroll = inject<typeof Vue3SmoothScroll>("smoothScroll");

const scrollY = ref(0);

const elevation = () => theme.global.current.value.dark ? 5 : 10;

const switchIcon = () => theme.global.current.value.dark ? "mdi:mdi-weather-night" : "mdi:mdi-white-balance-sunny";

const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? "vdb-light" : "vdb-dark";

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
            const element = document.querySelector<HTMLDivElement>(".projects-section");
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

onMounted(() => window.addEventListener("scroll", onScrollUpdate));
onUnmounted(() => window.removeEventListener("scroll", onScrollUpdate));
</script>

<style scoped>
.theme-switch {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    margin-top: 5px;
    margin-left: 5px;
    color: rgb(var(--v-theme-background));
}

.background-wave {
    position: fixed;
    fill: rgb(var(--v-theme-primary));
}

.about-section {
    display: grid;
    height: 100vh;
}

.about {
    margin: auto;
}

.projects-section {
    min-height: 100vh;
    width: 70%;
    margin: auto;
    padding-top: 25px;
    padding-bottom: 25px;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    column-gap: 25px;
    row-gap: 25px;
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
