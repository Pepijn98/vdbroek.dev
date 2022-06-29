<template>
    <v-app>
        <v-main>
            <Home />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import Home from "~/views/Home.vue";
</script>

<style>
.v-main {
    background: url("~/assets/background.svg");
    background-repeat: no-repeat;
    background-attachment: fixed;
}
</style>
