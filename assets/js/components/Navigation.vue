<template>
    <v-toolbar app scroll-off-screen absolute>
        <!--<v-toolbar-title></v-toolbar-title>-->
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat to="/users" v-if="isAuthenticated">
                <v-icon class="hidden-md-and-up" large>fas fa-users</v-icon>
                <span class="hidden-sm-and-down">Список пользователей</span>
            </v-btn>
            <v-btn flat to="/account" v-if="isProfileLoaded">{{ !!name ? name : 'Профиль'}}</v-btn>
            <v-btn flat v-if="isAuthenticated" @click="logout">
                <v-icon class="hidden-md-and-up" large>fas fa-sign-out-alt</v-icon>
                <span class="hidden-sm-and-down">Выход</span>
            </v-btn>
            <v-btn flat to="/login" v-if="!isAuthenticated && !authLoading">
                <v-icon class="hidden-md-and-up" large>fas fa-lock</v-icon>
                <span class="hidden-sm-and-down">Вход</span>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import {AUTH_LOGOUT}          from '../store/actions/auth'

    export default {
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
            },
        },
        computed: {
            ...mapGetters(['getProfile', 'isAuthenticated', 'isProfileLoaded']),
            ...mapState({
                authLoading: state => state.auth.status === 'loading',
                name: state => {
                    state.user.profile.title || state.user.profile.name ? `${state.user.profile.title} ${state.user.profile.name}` : 'Профиль';
                },
            })
        },
    }
</script>

<style scoped>

</style>