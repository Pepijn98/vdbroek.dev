<template>
    <div class="portfolio">
        <section class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="about-card columns is-centered">
                        <div class="avatar column is-3">
                            <img class="border" height="300px" width="300px" :src="user.avatar_url">
                        </div>
                        <div class="about column is-6">
                            <h1 class="title">{{ user.name }} (KurozeroPB)</h1>
                            <h2 class="subtitle">
                                Hello, welcome to this website.<br>
                                I'm a fullstack developer based in the Netherlands.<br>
                                I'm {{ calculateAge() }} years old and have been a fullstack developer for 5 years!<br>
                                I've contibuted and made different projects like Jeanne (Discord Bot), Kitsu C# library and CustomRPC to set rich presence on discord. Scroll down to see my pinned repositiries!
                                Everything I do is to improve my programming skills in several languages and keep learning new things. I mainly enjoy using JavaScript/TypeScript (NodeJS) and Kotlin but I've also used Swift, Rust, Golang and Python.
                                If you're interested in seeing what I make scroll down to see my pinned repositiries or go to my github page to see all my repositiries.
                            </h2>
                            <div class="level">
                                <div class="level-left">
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://github.com/kurozeropb"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="github"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://discord.gg/p895czC"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="discord"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://twitter.com/pvdbroek98"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="twitter"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://www.facebook.com/pepijnvdbroek"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="facebook"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://www.linkedin.com/in/pepijn-van-den-broek-84a94b18a/"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="linkedin"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://keybase.io/kurozero"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="keybase"
                                        rounded />
                                    <b-button
                                        class="level-item social-button"
                                        tag="a"
                                        href="https://play.google.com/store/apps/dev?id=4732354838030747081"
                                        target="_blank"
                                        type="is-primary"
                                        size="is-medium"
                                        icon-pack="fab"
                                        icon-left="google-play"
                                        rounded />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll">
                <b-button
                    tag="a"
                    class="scroll-btn"
                    style="margin-bottom: 20px;"
                    type="is-primary"
                    icon-left="caret-down"
                    rounded
                    @click="scroll"
                />
            </div>
        </section>
        <section id="repos" class="hero is-fullheight" style="text-align: center;">
            <h1 class="title" style="margin-top: 20px;">Pinned Repositiries</h1>
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

    calculateAge() {
        const birthday = new Date("1998-02-26");
        const ageDiff = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    async getProfile() {
        try {
            const response = await this.$axios.$get<GithubUser | ErrorResponse>("https://api.github.com/users/KurozeroPB");
            if (this.$utils.isError(response)) {
                return this.$buefy.notification.open({
                    type: "is-danger",
                    message: response.message,
                    position: "is-top-right"
                });
            }

            this.user = response;
        } catch (error) {
            this.$utils.handleError(error);
        }
    }

    async getRepos() {
        try {
            const response = await this.$axios.$get<ReposResponse>("https://kurozeropb.info/red", {
                headers: {
                    "Authorization": process.env.API_KEY
                }
            });
            if (response.repos) this.repos = response.repos;
        } catch (error) {
            this.$utils.handleError(error);
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

.portfolio {
    .about-card {
        box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
        padding-top: 120px;
        padding-bottom: 120px;
        border-radius: 20px;

        .avatar {
            text-align: center;

            img {
                border-radius: 290486px;
                border: 5px solid transparent;

                &.border {
                    border: 5px solid transparent;
                    border-radius: 290486px;
                    background: linear-gradient(to right, white, white), linear-gradient(45deg, var(--primary), var(--primary-lighten));
                    background-clip: padding-box, border-box;
                    background-origin: padding-box, border-box;
                }
            }
        }

        .title,
        .subtitle {
            background: linear-gradient(45deg, var(--primary), var(--primary-lighten));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .social-button {
            background: linear-gradient(45deg, var(--primary), var(--primary-lighten));
            box-shadow: 0px 4px 30px var(--primary-06);
            transition: all 0.3s;

            /* Fix icon jumping to up and to the left when scaling button */
            backface-visibility: hidden;
            transform: perspective(1px) translateZ(0);
            -webkit-font-smoothing: subpixel-antialiased;

            @media screen and (min-width: 768px) {
                &:hover {
                    transform: perspective(1px) translateZ(0) scale(1.2);
                }

                &:not(:last-child) {
                    margin-right: 30px;
                }
            }
        }
    }

    .scroll {
        text-align: center;

        &-btn {
            cursor: pointer;
            animation: bounce 2s infinite;
            background: linear-gradient(45deg, var(--primary), var(--primary-lighten));

            &:hover {
                animation: none;
            }

            @media screen and (max-width: 1366px) {
                visibility: hidden;
            }
        }
    }
}
</style>
