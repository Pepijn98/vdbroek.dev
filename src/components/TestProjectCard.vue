<template>
    <v-card
        class="project"
        :elevation="elevation()"
        tonal>
        <div class="d-flex flex-no-wrap">
            <div>
                <v-avatar
                    class="ma-3"
                    size="125"
                    rounded>
                    <v-img src="/images/typescript.webp" />
                </v-avatar>
            </div>
            <div style="text-align: left;">
                <v-card-title>Lilith</v-card-title>
                <v-card-subtitle>Diablo 3 discord bot</v-card-subtitle>
                <v-card-text>
                    Created on: <b>27-08-2019 12:08:01</b>
                    <br>
                    Updated on: <b>09-05-2022 01:48:34</b>
                    <br>
                    <br>
                    <v-btn
                        variant="tonal"
                        prepend-icon="fab fa-github">
                        View repository
                    </v-btn>
                </v-card-text>
            </div>
        </div>
        <v-card-actions>
            <v-btn
                class="ml-2"
                icon="fab fa-patreon"
                variant="text" />
            <v-btn
                class="ml-2"
                icon="fas fa-external-link-alt"
                variant="text" />
            <v-btn
                class="ml-2"
                icon="fab fa-paypal"
                variant="text" />
            <v-btn
                class="ml-2"
                icon="fas fa-external-link-alt"
                variant="text" />
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const elevation = () => theme.global.current.value.dark ? 5 : 10;
</script>
