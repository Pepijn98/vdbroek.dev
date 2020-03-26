<template>
    <section v-if="repo">
        <div class="wrapper">
            <div class="profile-card js-profile-card">
                <div class="profile-card__img" :style="{boxShadow: `0px 5px 50px 0px ${repo.primaryLanguage ? repo.primaryLanguage.color : 'var(--primary)'}, 0px 0px 0px 7px ${rgb}`}">
                    <img :src="getImageSrc()" alt="profile card">
                </div>

                <div class="profile-card__cnt js-profile-cnt">
                    <div class="profile-card__name">
                        <a :style="{color: repo.primaryLanguage ? repo.primaryLanguage.color : 'var(--primary)'}" :href="repo.url" target="_blank">{{ repo.name }}</a>
                    </div>
                    <div class="profile-card__txt">
                        Created on: <b>{{ format(repo.createdAt) }}</b>
                        <br>
                        Updated on: <b>{{ format(repo.updatedAt) }}</b>
                    </div>

                    <div class="profile-card-inf">
                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">{{ repo.forkCount }}</div>
                            <div class="profile-card-inf__txt">Forks</div>
                        </div>

                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">{{ repo.stargazers ? repo.stargazers.totalCount : 0 }}</div>
                            <div class="profile-card-inf__txt">Stars</div>
                        </div>

                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">{{ repo.issues ? repo.issues.totalCount : 0 }}</div>
                            <div class="profile-card-inf__txt">Issues</div>
                        </div>
                    </div>

                    <div class="profile-card-social">
                        <b-button
                            v-for="(link, i) in repo.fundingLinks"
                            :key="i"
                            :icon-pack="getIconPack(link)"
                            :icon-left="getIcon(link)"
                            :href="link.url"
                            :style="{boxShadow: `0px 4px 30px ${rgb}`, background: `linear-gradient(45deg, ${hex}, ${lightenDarkenColor(hex, 20)})`}"
                            target="_blank"
                            class="profile-card-social__item link"
                            tag="a"
                            type="is-primary"
                            rounded />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Repo, FundingLink } from "../interfaces/repos.types";

@Component
class RepoCard extends Vue {
    fundingIcon: {[x: string]: string} = {
        GITHUB: "github",
        PATREON: "patreon"
    };

    get hex() {
        const repo = this.repo as Repo;
        if (repo && repo.primaryLanguage) {
            return repo.primaryLanguage.color;
        }

        return "var(--primary)";
    }

    get rgb() {
        const repo = this.repo as Repo;
        if (repo && repo.primaryLanguage) {
            const rgb = this.hexToRgb(repo.primaryLanguage.color);
            if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
            return repo.primaryLanguage.color;
        } else {
            return "var(--primary)";
        }
    }

    get repo() {
        return this.repository;
    }

    set repo(repo: Repo) {
        this.repository = repo;
    }

    @Prop({ type: Object, required: true }) repository!: Repo;

    lightenDarkenColor(col: string, amt: number) {
        let usePound = false;

        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }

        const num = parseInt(col, 16);

        let r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    format(toFormat: string) {
        const date = new Date(toFormat);
        const time = date.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const formatted = date.toLocaleDateString("nl-NL", { year: "numeric", month: "2-digit", day: "2-digit" });
        return `${formatted} ${time}`;
    }

    getImageSrc() {
        return `/static/images/languages/${this.repo.primaryLanguage ? this.repo.primaryLanguage.name === "C#" ? "csharp" : this.repo.primaryLanguage.name.toLowerCase() : "github"}.png`;
    }

    getIconPack(link: FundingLink): string {
        if (this.fundingIcon[link.platform]) return "fab";
        if (link.url.includes("paypal")) return "fab";
        return "fas";
    }

    getIcon(link: FundingLink): string {
        if (this.fundingIcon[link.platform]) return this.fundingIcon[link.platform];
        if (link.url.includes("paypal")) return "paypal";
        return "external-link-alt";
    }
}

export default RepoCard;
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Quicksand:400,500,700&subset=latin-ext');

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
        min-height: 100vh;
        padding-top: 100px;
    }
}

.profile-card {
    width: 100%;
    min-height: 460px;
    margin: auto;
    box-shadow: 0px 8px 60px -10px rgba(13, 28, 39, 0.6);
    background: #fff;
    border-radius: 12px;
    max-width: 700px;
    position: relative;

    &.active {
        .profile-card__cnt {
            filter: blur(6px);
        }

        .profile-card-message,
        .profile-card__overlay {
            opacity: 1;
            pointer-events: auto;
            transition-delay: 0.1s;
        }

        .profile-card-form {
            transform: none;
            transition-delay: 0.1s;
        }
    }

    &__img {
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

    &__cnt {
        margin-top: -35px;
        text-align: center;
        padding: 0 20px;
        padding-bottom: 40px;
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

    &-loc {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 600;

        &__icon {
            display: inline-flex;
            font-size: 27px;
            margin-right: 10px;
        }
    }

    &-inf {
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
            background: #405de6;
            box-shadow: 0px 7px 30px rgba(43, 98, 169, 0.5);
            position: relative;
            font-size: 21px;
            flex-shrink: 0;
            transition: all 0.3s;

            @media screen and (max-width: 768px) {
                width: 50px;
                height: 50px;
                margin: 10px;
            }

            @media screen and (min-width: 768px) {
                &:hover {
                    transform: scale(1.2);
                }
            }

            &.link {
                background: linear-gradient(45deg, #990000, #d30000);
                box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.6);
            }
        }

        .icon-font {
            display: inline-flex;
        }
    }

    &-ctr {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;

        @media screen and (max-width: 576px) {
            flex-wrap: wrap;
        }
    }

    &__button {
        background: none;
        border: none;
        font-family: "Quicksand", sans-serif;
        font-weight: 700;
        font-size: 19px;
        margin: 15px 35px;
        padding: 15px 40px;
        min-width: 201px;
        border-radius: 50px;
        min-height: 55px;
        color: #fff;
        cursor: pointer;
        backface-visibility: hidden;
        transition: all 0.3s;

        @media screen and (max-width: 768px) {
            min-width: 170px;
            margin: 15px 25px;
        }

        @media screen and (max-width: 576px) {
            min-width: inherit;
            margin: 0;
            margin-bottom: 16px;
            width: 100%;
            max-width: 300px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &:focus {
            outline: none !important;
        }

        @media screen and (min-width: 768px) {
            &:hover {
                transform: translateY(-5px);
            }
        }

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &.button--blue {
            background: linear-gradient(45deg, #1da1f2, #0e71c8);
            box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);

            &:hover {
                box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
            }
        }

        &.button--orange {
            background: linear-gradient(45deg, #d5135a, #f05924);
            box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);

            &:hover {
                box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
            }
        }

        &.button--gray {
            box-shadow: none;
            background: #dcdcdc;
            color: #142029;
        }
    }

    &-message {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 130px;
        padding-bottom: 100px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
    }

    &-form {
        box-shadow: 0 4px 30px rgba(15, 22, 56, 0.35);
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        background: #fff;
        border-radius: 10px;
        padding: 35px;
        transform: scale(0.8);
        position: relative;
        z-index: 3;
        transition: all 0.3s;

        @media screen and (max-width: 768px) {
            max-width: 90%;
            height: auto;
        }

        @media screen and (max-width: 576px) {
            padding: 20px;
        }

        &__bottom {
            justify-content: space-between;
            display: flex;

            @media screen and (max-width: 576px) {
                flex-wrap: wrap;
            }
        }
    }

    textarea {
        width: 100%;
        resize: none;
        height: 210px;
        margin-bottom: 20px;
        border: 2px solid #dcdcdc;
        border-radius: 10px;
        padding: 15px 20px;
        color: #324e63;
        font-weight: 500;
        font-family: "Quicksand", sans-serif;
        outline: none;
        transition: all 0.3s;

        &:focus {
            outline: none;
            border-color: #8a979e;
        }
    }

    &__overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        opacity: 0;
        background: rgba(22, 33, 72, 0.35);
        border-radius: 12px;
        transition: all 0.3s;
    }
}
</style>
