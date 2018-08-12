<template>
    <v-app>
        <mr-navigation/>
        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
        <mr-footer/>
    </v-app>
</template>

<script>
    import axios         from 'axios'
    import Navigation    from '../components/Navigation'
    import Footer        from '../components/Footer'
    import {AUTH_LOGOUT} from '../store/actions/auth'

    export default {
        components: {
            'mr-navigation': Navigation,
            'mr-footer': Footer
        },
        name: 'app',
        created: function () {
            axios.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized, logout the user
                        this.$store.dispatch(AUTH_LOGOUT)
                        // you can also redirect to /login if needed !
                    }
                    throw err;
                });
            });
        }
    }
</script>

<style scoped>

</style>