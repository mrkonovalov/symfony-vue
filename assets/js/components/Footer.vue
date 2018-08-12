<template>
    <v-footer dark height="auto">
        <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
            <v-card-text>
                <v-btn v-for="link in links" :key="icon" class="mx-3 white--text" icon>
                    <a :href="link.url" target="_blank">
                        <v-icon size="24px">{{ link.icon }}</v-icon>
                    </a>
                </v-btn>
            </v-card-text>
            
            <v-card-text class="white--text pt-0">
                Тестовое задание
            </v-card-text>
            
            <v-divider></v-divider>
            
            <v-card-text class="white--text">
                &copy;&nbsp;2018 — <strong><a :href="emailLink">{{ email }}</a></strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            links: [
                {
                    icon: 'fab fa-github-square',
                    url: 'https://github.com/mrkonovalov/symfony-vue'
                },
            ],
            email: 'mr.konovalov.d@gmail.com'
        }),
        computed: {
            emailLink: function () {
                const email = this.email;
                return `mailto:${email}?subject=Тестовое задание`
            },
        }
    }
</script>

<style scoped>
    .indigo.lighten-1 a {
        color: #fff;
    }
    
    .v-footer .v-card {
        width: 100%;
    }
</style>