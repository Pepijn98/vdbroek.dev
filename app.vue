<template>
    <div class="container">
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
</template>

<script lang="ts" setup>
import "./assets/css/tailwind.css";
</script>

<style lang="scss">
body {
    height: 100%;

    #__nuxt {
        height: inherit;
    }
}

.container {
    height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
}
</style>
