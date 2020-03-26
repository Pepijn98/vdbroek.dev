<template>
    <div>
        <section class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="about-card columns is-centered">
                        <div class="column is-3">
                            <img class="avatar" height="300px" width="300px" :src="user.avatar_url">
                        </div>
                        <div class="about column is-6">
                            <h1 class="title">{{ user.name }} (KurozeroPB)</h1>
                            <h2
                                class="subtitle"
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </h2>
                            <div class="level">
                                <div class="level-left">
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://github.com/kurozeropb"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="github"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://discord.gg/p895czC"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="discord"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://twitter.com/pvdbroek98"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="twitter"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://www.facebook.com/pepijnvdbroek"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="facebook"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://www.reddit.com/user/ShinyDrag0n"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="reddit"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://keybase.io/kurozero"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="keybase"
                                        rounded
                                    />
                                    <b-button
                                        class="level-item"
                                        tag="a"
                                        href="https://play.google.com/store/apps/dev?id=4732354838030747081"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="google-play"
                                        rounded
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: center;">
                <b-button
                    tag="a"
                    class="scroll"
                    style="margin-bottom: 20px;"
                    type="is-primary"
                    icon-left="caret-down"
                    rounded
                    @click="scroll"
                />
            </div>
        </section>
        <section id="repos" class="hero is-fullheight" style="text-align: center;">
            <h1 class="title" style="margin-top: 20px;">Pinned Repos</h1>
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-centered is-multiline">
                        <repo-card
                            v-for="repo in repos"
                            :key="repo.name"
                            class="column is-half"
                            :repository="repo"
                        />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AxiosError } from "axios";
import { GithubUser, ErrorResponse } from "~/interfaces/types";
import { ReposResponse, Repo } from "~/interfaces/repos.types";

@Component
class IndexPage extends Vue {
    user: GithubUser | {} = {};
    repos: Repo[] = [];

    get repo() {
        if (this.repos.length > 1) {
            return this.repos[1];
        } else {
            return {};
        }
    }

    async beforeMount() {
        await this.getProfile();
        await this.getRepos();
    }

    scroll() {
        const element = document.querySelector("#repos");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    isError(response: GithubUser | ErrorResponse): response is ErrorResponse {
        return !!(response as ErrorResponse).message;
    }

    handleError(error: any) {
        if (error.response) {
            this.$buefy.notification.open({
                type: "is-danger",
                message: error.response.statusMessage
                    ? error.response.statusMessage
                    : error.response.message || "An error happened",
                position: "is-top-right"
            });
        } else {
            this.$buefy.notification.open({
                type: "is-danger",
                message: error.message ? error.message : error.toString(),
                position: "is-top-right"
            });
        }
    }

    async getProfile() {
        try {
            const response = await this.$axios.$get<GithubUser | ErrorResponse>(
                "https://api.github.com/users/KurozeroPB"
            );
            if (this.isError(response)) {
                return this.$buefy.notification.open({
                    type: "is-danger",
                    message: response.message,
                    position: "is-top-right"
                });
            }

            this.user = response;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getRepos() {
        try {
            const response = await this.$axios.$get<ReposResponse>(
                "https://kurozeropb.info/red"
            );
            if (response.repos) this.repos = response.repos;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default IndexPage;
</script>

<style lang="scss" scoped>
@keyframes bounce {
    20%,
    53%,
    80%,
    0%,
    100% {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -30px, 0);
        transform: translate3d(0, -30px, 0);
    }
    70% {
        -webkit-animation-timing-function: cubic-bezier(
            0.755,
            0.05,
            0.855,
            0.06
        );
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: translate3d(0, -15px, 0);
        transform: translate3d(0, -15px, 0);
    }
    90% {
        -webkit-transform: translate3d(0, -4px, 0);
        transform: translate3d(0, -4px, 0);
    }
}

.scroll {
    cursor: pointer;
    animation: bounce 2s infinite;

    &:hover {
        animation: none;
    }
}

.about-card {
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
    padding-top: 120px;
    padding-bottom: 120px;
    border-radius: 20px;

    .avatar {
        border-radius: 290486px;
        border: 5px solid var(--primary);
    }

    .title,
    .subtitle {
        color: var(--primary);
    }
}
</style>
