<template>
    <div>
        <h1>Проофиль</h1>
        <p v-if="profile.name">
            <strong>Имя:</strong> {{profile.title}} {{profile.name}}
        </p>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "account",
        computed: mapState({profile: state => state.user.profile})
    }
</script>

<style scoped>

</style>