<template>
    <v-card
        class="project"
        :elevation="elevation"
        tonal>
        <div class="d-flex flex-no-wrap">
            <div>
                <v-avatar
                    :style="repo.primaryLanguage.name.toLowerCase() === 'swift' ? 'background-color: #F05138;' : ''"
                    class="ma-3"
                    size="125"
                    rounded>
                    <v-img :src="image" />
                </v-avatar>
            </div>
            <div style="text-align: left;">
                <v-card-title class="name">{{ name }}</v-card-title>
                <v-card-subtitle>{{ repo.description }}</v-card-subtitle>
                <v-card-text>
                    Created on:
                    <br>
                    <b>{{ formatDateTime(repo.createdAt) }}</b>
                    <br>
                    Updated on:
                    <br>
                    <b>{{ formatDateTime(repo.updatedAt) }}</b>
                    <br>
                    <br>
                    <v-btn
                        :href="repo.url"
                        target="_blank"
                        variant="tonal"
                        prepend-icon="fab fa-github">
                        View repository
                    </v-btn>
                </v-card-text>
            </div>
        </div>
        <div class="project-info">
            <div class="project-info__item">
                <div class="project-info__title">{{ repo.forkCount }}</div>
                <div class="project-info__text">Forks</div>
            </div>

            <div class="project-info__item">
                <div class="project-info__title">{{ repo.stargazers ? repo.stargazers.totalCount : 0 }}</div>
                <div class="project-info__text">Stars</div>
            </div>

            <div class="project-info__item">
                <div class="project-info__title">
                    {{ repo.issuesOpen ? repo.issuesOpen.totalCount : 0 }}/{{ repo.issuesClosed ? repo.issuesClosed.totalCount : 0 }}
                </div>
                <div class="project-info__text-wrap">Open/Closed Issues</div>
            </div>
        </div>
        <v-card-actions v-if="(repo.fundingLinks && repo.fundingLinks.length > 0) || !!repo.homepageUrl">
            <v-btn
                v-if="!!repo.homepageUrl"
                :href="repo.homepageUrl"
                target="_blank"
                class="ml-2"
                icon="fas fa-home"
                variant="text" />
            <v-btn
                v-for="(link, i) in repo.fundingLinks"
                :key="i"
                class="ml-2"
                :href="link.url"
                target="_blank"
                :icon="`${getIconPack(link)} fa-${getIcon(link)}`"
                variant="text" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { Repo, FundingLink } from "~/types/github";
import { computed } from "vue";
import { useTheme } from "vuetify";

const props = defineProps<{ repo: Repo }>();

const theme = useTheme();

const elevation = computed(() => theme.global.current.value.dark ? 5 : 10);
const name = computed(() => props.repo.name.split("-").map(capitalize).join(" ").split(" ").map(capitalize).join(" "));
const image = computed(() => `/images/${props.repo.primaryLanguage ? props.repo.primaryLanguage.name === "C#" ? "csharp" : props.repo.primaryLanguage.name.toLowerCase() : "github"}.webp`);

const capitalize = (str: string) => str[0].toUpperCase() + str.substring(1);

function getIconPack(link: FundingLink) {
    if (link.platform === "PATREON" || link.url.includes("paypal")) return "fab";
    return "fas";
}

function getIcon(link: FundingLink): string {
    if (link.platform === "PATREON") return "patreon";
    if (link.url.includes("paypal")) return "paypal";
    return "external-link-alt";
}

function formatDateTime(old: string | Date): string {
    const date = new Date(old);
    const time = date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const formatted = date.toLocaleDateString("nl-NL", { year: "numeric", month: "2-digit", day: "2-digit" });
    return `${formatted} ${time}`;
}
</script>

<style scoped lang="scss">
.project {
    min-height: 500px;

    .v-card-actions {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .name {
        max-width: 230px;
    }

    &-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        margin: 35px auto;
        gap: 5px;

        &__item {
            text-align: center;
            min-width: 100px;

            @media screen and (max-width: 768px) {
                min-width: 100px;
            }
        }

        &__title {
            font-weight: 700;
            font-size: 27px;
        }

        &__text {
            font-weight: 500;
            margin-top: 7px;

            &-wrap {
                max-width: 100px;
            }
        }
    }
}
</style>
