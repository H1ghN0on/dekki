<template>
    <the-header />
    <div class="container">
        <div class="auth-container" :class="{ 'active': isRegister }">
            <div class="card login">
                <div class="title">
                    Вход
                </div>
                <form class="form">
                    <div class="errors" v-if="errors.login.length">
                        <div class="error" v-for="error, index of errors.login" :key="index">{{ error }}</div>
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="loginFields.username" :label="'Имя пользователя'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="loginFields.password" :label="'Пароль'" :type="'password'" />
                    </div>
                    <div class="submit-btn-box">
                        <base-button :isLoading="isLoading" @click.prevent="handleSubmitForm" class="submit-btn"
                            type="'submit'">Вперёд
                        </base-button>
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
                    <div class="errors" v-if="errors.registration.length">
                        <div class="error" v-for="error, index of errors.registration" :key="index">{{ error }}</div>
                    </div>

                    <div class="input-box">
                        <base-input class="input" v-model="registrationFields.username" :label="'Имя пользователя'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="registrationFields.email" :label="'Почта'" />
                    </div>
                    <div class="input-box">
                        <base-input class="input" v-model="registrationFields.password" :label="'Пароль'"
                            :type="'password'" />
                    </div>
                    <div class="submit-btn-box">
                        <base-button :isLoading="isLoading" @click.prevent="handleSubmitForm" class="submit-btn"
                            type="'submit'">Вперёд
                        </base-button>
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
import { useAuth } from "@/hooks"

export default {

    name: "AuthPage",
    components: { TheHeader, BaseInput, BaseButton, },
    setup() {
        const { registrationFields, loginFields, errors, handleAuth, isRegister, toggleAuth } = useAuth();
        return {
            registrationFields,
            loginFields,
            errors,
            handleAuth,
            isRegister,
            toggleAuth,
        }
    },

    data() {
        return {
            isLoading: false,
        }
    },

    methods: {
        async handleSubmitForm() {
            this.isLoading = true;
            await this.handleAuth();
            this.isLoading = false;
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
                    transition-delay: .3s;
                }

                .form {
                    transition-delay: .4s;

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