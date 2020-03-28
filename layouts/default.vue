<template>
    <div>
        <a class="ribbon" href="https://github.com/KurozeroPB/Projekt-RED" target="_blank">
            <b-icon pack="fab" icon="github" />
            View source
        </a>
        <nuxt />
    </div>
</template>

<style lang="scss" scoped>
.ribbon {
    z-index: 999;
    margin: 0;
    background: var(--black);
    color: var(--white);
    padding: 1em 0;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%) translateY(140%) rotate(-45deg);
    transform-origin: top left;

    @media screen and (max-width: 768px) {
        display: none;
    }

    &:hover {
        color: var(--white);
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        margin: 0 -1px;
        width: 100%;
        height: 100%;
        background: var(--black);
    }

    &::before {
        right: 100%;
    }

    &::after {
        left: 100%;
    }
}
</style>
