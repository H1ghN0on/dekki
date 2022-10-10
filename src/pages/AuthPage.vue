<template>
    <the-header />
    <div class="container">
        <div class="auth-container" :class="{'active': isRegister}">
            <div class="card login">
                <div class="title">
                    Вход
                </div>
                <form class="form">
                    <div class="errors" v-if="loginErrors.length">
                        <div class="error" v-for="error, index of loginErrors" :key="index">{{error}}</div>
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="login.username" :label="'Имя пользователя'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="login.password" :label="'Пароль'" :type="'password'" />
                    </div>
                    <div class="submit-btn-box">
                        <base-button @click="handleAuth" class="submit-btn" type="'submit'">Вперёд</base-button>
                    </div>
                </form>
            </div>
            <div class="card register">
                <div @click="toggleAuth" class="login-btn pointer">
                </div>
                <div class="title">
                    <span>Регистрация</span>
                    <div @click="toggleAuth" class="close pointer"></div>
                </div>

                <form class="form">
                    <div class="errors" v-if="registrationErrors.length">
                        <div class="error" v-for="error, index of registrationErrors" :key="index">{{error}}</div>
                    </div>

                    <div class="input-box">
                        <base-input class="input" v-model="register.username" :label="'Имя пользователя'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="register.email" :label="'Почта'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="register.password" :label="'Пароль'" :type="'password'" />
                    </div>
                    <div class="submit-btn-box">
                        <base-button @click="handleAuth" class="submit-btn" type="'submit'">Вперёд</base-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import BaseInput from "@/components/BaseInput"
import TheHeader from "@/components/TheHeader"
import BaseButton from "@/components/BaseButton"
import axios from "axios";
import { useToast } from "vue-toastification";

export default {

    name: "AuthPage",
    components: { TheHeader, BaseInput, BaseButton, },
    setup() {
        const toast = useToast();
        return { toast }
    },

    data() {
        return {
            register: {
                username: "",
                email: "",
                password: "",
            },
            login: {
                username: "",
                password: "",
            },
            registrationErrors: [],
            loginErrors: [],
            isRegister: false,
        }
    },


    methods: {

        toggleAuth() {
            this.isRegister = !this.isRegister;
            this.registrationErrors = this.loginErrors = [];
        },

        async handleAuth(e) {
            e.preventDefault();
            this.registrationErrors = this.loginErrors = [];
            if (this.isRegister) {
                if (!this.register.username.trim()) {
                    this.registrationErrors.push("Введите имя пользователя");
                }
                if (!this.register.email.trim()) {
                    this.registrationErrors.push("Введите почту");
                }
                if (!this.register.password.trim()) {
                    this.registrationErrors.push("Введите пароль");
                }
                if (!this.registrationErrors.length) {
                    await axios.post("/auth/users/", this.register)
                        .then(() => {
                            this.toast.success("Успешная регистрация!", {
                                timeout: 2000
                            });
                            this.isRegister = false;
                            this.register.username = "";
                            this.register.email = "";
                            this.register.password = "";
                        })
                        .catch((err) => {
                            this.registrationErrors = Object.values(err.response.data).map(error => error[0]);
                        });
                }

            } else {
                if (!this.login.username.trim()) {
                    this.loginErrors.push("Введите имя пользователя");
                }
                if (!this.login.password.trim()) {
                    this.loginErrors.push("Введите пароль");
                }
                if (!this.loginErrors.length) {
                    await axios.post("/auth/token/login/", this.login)
                        .then(() => {
                            this.toast.success("Успешная авторизация!", {
                                timeout: 2000
                            });
                            this.$router.push(this.$route.query.to || "/decks");
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loginErrors = Object.values(err.response.data).map(error => error[0]);
                        });
                }

            }
        }
    }
}

</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    .auth-container {
        position: relative;
        top: 0;

        transition: .3s ease;

        .card {
            position: relative;
            background: white;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
            width: 50vw;
            padding: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: .3s ease;
            border-radius: 5px;

            &.register {

                position: absolute;
                z-index: 10;
                top: -35px;
                right: -35px;
                width: 70px;
                height: 70px;
                border-radius: 100%;
                background: none;
                box-shadow: none;
                padding: 25px;

                .form,
                .title,
                .submit-btn-box {
                    left: 100px;
                    opacity: 0;
                    visibility: hidden;
                }
            }

            .login-btn {
                position: relative;
                width: 70px;
                height: 70px;
                border-radius: 100%;
                background: $primary-text;
                border-radius: 100%;
                padding: 25px;
                text-align: center;

                &:before {
                    font-family: "Font Awesome 5 Free";
                    content: "\f234";
                    display: inline-block;
                    font-weight: 900;
                    color: white;
                    text-rendering: auto;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    transform: translate(0, 0);
                }
            }

            .title {
                position: relative;
                font-weight: bold;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                font-size: 2.5em;
                align-self: start;
                width: 100%;

                .close {
                    cursor: pointer;
                    position: absolute;
                    top: -15px;
                    right: 0;
                    display: inline;
                    color: white;
                    font-size: 1.5em;
                    font-weight: 400;
                    padding: 0;


                    &:before {
                        content: '\00d7';
                    }
                }
            }

            .form {
                width: 100%;
                position: relative;
                margin-top: 80px;

                &>.input-box {
                    margin-bottom: 20px;

                    .input {
                        ::v-deep input {
                            padding: 20px;
                        }
                    }
                }

                .errors {
                    color: red;
                    position: absolute;
                    top: -60px;
                }

                .submit-btn-box {
                    position: relative;
                    display: flex;
                    justify-content: center;

                    .submit-btn {
                        font-size: 1em;
                        padding: 15px 40px;
                        border-radius: 20px;

                    }
                }
            }
        }

        &.active {
            top: -50px;

            .login {
                margin: 0 10px;
            }

            .register {
                top: 15px;
                right: 0;
                width: 100%;
                min-width: 100%;
                height: auto;
                border-radius: 5px;
                overflow: hidden;
                padding: 50px;

                .login-btn {
                    position: absolute;
                    top: -35px;
                    right: -35px;
                    box-shadow: none;
                    transform: scale(30);
                    transition: transform .2s ease;
                    cursor: default;

                    &:before {
                        content: '';
                    }
                }

                .form,
                .submit-btn-box,
                .title {
                    left: 0;
                    color: white;
                    opacity: 1;
                    visibility: visible;
                    transition: .3s ease;

                }

                .title {
                    transition-delay: .2s;
                }

                .form {
                    transition-delay: .3s;

                    .input-box {
                        .input {
                            ::v-deep input {
                                background: $primary-lighter;
                                color: white;

                                &::placeholder {
                                    color: white;
                                }
                            }
                        }
                    }

                }

                .submit-btn-box {
                    transition-delay: .4s;

                    .submit-btn {
                        background: $primary-lighter;
                        color: white;
                    }
                }
            }

        }
    }
}
</style>