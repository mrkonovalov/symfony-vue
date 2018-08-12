<template>
    <div>
        <h1>Вход</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                    v-model="username"
                    label="Логин"
                    :counter="20"
                    :rules="usernameRules"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    :rules="passwordRules"
                    required
            ></v-text-field>
            <v-btn
                    :disabled="!valid"
                    @click="login"
            >
                Вход
            </v-btn>
        </v-form>
    </div>
</template>

<script>
    import {AUTH_REQUEST} from '../store/actions/auth'

    export default {
        name: 'login',
        data: () => ({
            valid: true,
            username: '',
            usernameRules: [
                v => !!v || 'Логин является обязательным для заполнения',
                v => v.length <= 20 || 'Логин должен быть меньше 20 символов.'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Пароль является обязательным для заполнения',
            ]
        }),
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    const {username, password} = this;

                    this.$store.dispatch(AUTH_REQUEST, {
                        username,
                        password
                    }).then(() => {
                        this.$router.push('/')
                    })
                }
            }
        },
    }
</script>