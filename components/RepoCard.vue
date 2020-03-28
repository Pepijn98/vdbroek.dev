<template>
    <section v-if="repo">
        <div class="wrapper">
            <div class="profile-card">
                <div class="profile-card__image" :style="{boxShadow: `0px 5px 50px 0px ${hexColor}, 0px 0px 0px 7px ${rgbColor}`}">
                    <img :src="langImage" alt="profile card">
                </div>

                <div class="profile-card__content">
                    <div class="profile-card__name">
                        <a :style="{color: hexColor}" :href="repo.url" target="_blank">{{ repo.name.replace("-", " ") }}</a>
                    </div>
                    <div class="profile-card__txt">
                        <b>{{ repo.description }}</b>
                    </div>
                    <div class="profile-card__txt">
                        <small>
                            Created on: <b>{{ $utils.formatDateTime(repo.createdAt) }}</b>
                            <br>
                            Updated on: <b>{{ $utils.formatDateTime(repo.updatedAt) }}</b>
                        </small>
                    </div>
                    <div class="profile-card__txt">
                        <b-button
                            tag="a"
                            class="profile-card__repo"
                            :href="repo.url"
                            :style="{
                                color: `${$utils.textColor(hexColor)} !important`,
                                boxShadow: `0px 4px 30px ${rgbColor}`,
                                background: `linear-gradient(45deg, ${hexColor}, ${$utils.changeLuminosity(hexColor, 50)})`
                            }"
                            type="is-primary"
                            icon-pack="fab"
                            icon-left="github"
                            target="_blank">
                            View repository
                        </b-button>
                    </div>

                    <div class="profile-card-info">
                        <div class="profile-card-info__item">
                            <div class="profile-card-info__title">{{ repo.forkCount }}</div>
                            <div class="profile-card-info__txt">Forks</div>
                        </div>

                        <div class="profile-card-info__item">
                            <div class="profile-card-info__title">{{ repo.stargazers ? repo.stargazers.totalCount : 0 }}</div>
                            <div class="profile-card-info__txt">Stars</div>
                        </div>

                        <div class="profile-card-info__item">
                            <div class="profile-card-info__title">{{ repo.issues ? repo.issues.totalCount : 0 }}</div>
                            <div class="profile-card-info__txt">Issues</div>
                        </div>
                    </div>

                    <div v-if="fundingLinks && fundingLinks.length > 0" class="profile-card-social">
                        <b-button
                            v-for="(link, i) in fundingLinks"
                            :key="i"
                            :icon-pack="iconPack(link)"
                            :icon-left="icon(link)"
                            :href="link.url"
                            :style="{
                                color: `${$utils.textColor(hexColor)} !important`,
                                boxShadow: `0px 4px 30px ${rgbColor}`,
                                background: `linear-gradient(45deg, ${hexColor}, ${$utils.changeLuminosity(hexColor, 50)})`
                            }"
                            target="_blank"
                            class="profile-card-social__item"
                            tag="a"
                            type="is-primary"
                            rounded />
                    </div>

                    <footer v-if="repo.topics && repo.topics.length > 0" class="profile-card-footer">
                        <div class="profile-card-footer__tags">
                            <b-taglist>
                                <b-tag
                                    v-for="(topic, i) in repo.topics"
                                    :key="i"
                                    :style="{
                                        color: `${$utils.textColor(hexColor)} !important`,
                                        background: `linear-gradient(45deg, ${hexColor}, ${$utils.changeLuminosity(hexColor, 50)})`
                                    }"
                                    type="is-primary">
                                    {{ topic.name }}
                                </b-tag>
                            </b-taglist>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Repo, FundingLink } from "~/interfaces/repos.types";

@Component
class RepoCard extends Vue {
    fundingIcon: {[x: string]: string} = {
        GITHUB: "github",
        PATREON: "patreon"
    };

    get fundingLinks() {
        return this.repo.fundingLinks.filter((link) => !link.url.includes("github"));
    }

    get langImage() {
        return `/static/images/languages/${this.repo.primaryLanguage ? this.repo.primaryLanguage.name === "C#" ? "csharp" : this.repo.primaryLanguage.name.toLowerCase() : "github"}.png`;
    }

    get hexColor() {
        const repo = this.repo as Repo;
        if (repo && repo.primaryLanguage) {
            return repo.primaryLanguage.color;
        }
        return "var(--primary)";
    }

    get rgbColor() {
        const repo = this.repo as Repo;
        if (repo && repo.primaryLanguage) {
            const rgb = this.$utils.hexToRGB(repo.primaryLanguage.color, 0.5);
            if (rgb) return rgb;
            return repo.primaryLanguage.color;
        }
        return "var(--primary)";
    }

    get repo() {
        return this.repository;
    }

    set repo(repo: Repo) {
        this.repository = repo;
    }

    @Prop({ type: Object, required: true }) repository!: Repo;

    iconPack(link: FundingLink): string {
        if (this.fundingIcon[link.platform]) return "fab";
        if (link.url.includes("paypal")) return "fab";
        return "fas";
    }

    icon(link: FundingLink): string {
        if (this.fundingIcon[link.platform]) return this.fundingIcon[link.platform];
        if (link.url.includes("paypal")) return "paypal";
        return "external-link-alt";
    }
}

export default RepoCard;
</script>

<style lang="scss">
.tags {
    justify-content: center;
}
</style>

<style lang="scss" scoped>
a,
a:hover {
    text-decoration: none;
}

.icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
}

.wrapper {
    max-width: 680px;
    width: 100%;
    height: auto;
    padding: 50px 20px;
    padding-top: 100px;
    padding-bottom: 0;
    display: flex;

    @media screen and (max-width: 768px) {
        height: auto;
        min-height: 70vh;
        padding: 0;
        padding-top: 100px;
    }
}

.profile-card {
    width: 100%;
    min-height: 496px;
    margin: auto;
    box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
    background: #fff;
    border-radius: 12px;
    max-width: 700px;
    position: relative;

    &__image {
        width: 150px;
        height: 150px;
        margin-left: auto;
        margin-right: auto;
        transform: translateY(-50%);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        z-index: 4;

        @media screen and (max-width: 576px) {
            width: 120px;
            height: 120px;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    &__content {
        margin-top: -35px;
        text-align: center;
        padding: 0 20px;
        padding-bottom: 20px;
        transition: all 0.3s;
    }

    &__name {
        font-weight: 700;
        font-size: 24px;
        color: #6944ff;
        margin-bottom: 15px;
    }

    &__txt {
        font-size: 18px;
        font-weight: 500;
        color: #324e63;
        margin-bottom: 15px;

        strong {
            font-weight: 700;
        }
    }

    &__repo {
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
        }
    }

    &-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: flex-start;
        margin-top: 35px;

        &__item {
            padding: 10px 35px;
            min-width: 150px;

            @media screen and (max-width: 768px) {
                padding: 10px 20px;
                min-width: 120px;
            }
        }

        &__title {
            font-weight: 700;
            font-size: 27px;
            color: #324e63;
        }

        &__txt {
            font-weight: 500;
            margin-top: 7px;
        }
    }

    &-social {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        &__item {
            display: inline-flex;
            width: 55px;
            height: 55px;
            margin: 15px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            color: #fff;
            background: linear-gradient(45deg, var(--primary), var(--primary-lighten));
            box-shadow: 0px 4px 30px var(--primary-06);
            position: relative;
            font-size: 21px;
            flex-shrink: 0;
            transition: all 0.3s;

            /* Fix icon jumping to up and to the left when scaling button */
            backface-visibility: hidden;
            transform: perspective(1px) translateZ(0);
            -webkit-font-smoothing: subpixel-antialiased;

            @media screen and (max-width: 768px) {
                width: 50px;
                height: 50px;
                margin: 10px;
            }

            @media screen and (min-width: 768px) {
                &:hover {
                    transform: perspective(1px) translateZ(0) scale(1.2);
                }
            }
        }
    }

    &-footer {
        margin-top: 35px;
    }
}
</style>
