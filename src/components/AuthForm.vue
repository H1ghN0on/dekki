<template>
    <div class="auth-container" :class="{ 'active': isRegister }">

        <auth-login-form @submit="$emit('submit')" v-model="localLoginFields" :isRegister="isRegister" :errors="errors"
            :isLoading="isLoading" />


        <auth-registration-form @submit="$emit('submit')" @toggleAuth="$emit('toggleAuth')" :isRegister="isRegister"
            :errors="errors" v-model="localRegistrationFields" :isLoading="isLoading" />

    </div>
</template>


<script>

import AuthLoginForm from "@/components/AuthLoginForm";
import AuthRegistrationForm from "@/components/AuthRegistrationForm"

export default {
    components: {
        AuthLoginForm,
        AuthRegistrationForm,
    },

    props: {
        registrationFields: {
            type: Object, required: true
        },
        loginFields: {
            type: Object, required: true
        },
        errors: {
            type: Object, required: true
        },
        isRegister: {
            type: Boolean, required: true
        },
        isLoading: {
            type: Boolean, required: true
        }
    },

    computed: {
        localRegistrationFields: {
            get() {
                return this.registrationFields;
            },
            set(newValue) {
                this.$emit("update:registrationFields", newValue);
            },
        },

        localLoginFields: {
            get() {
                return this.loginFields;
            },
            set(newValue) {
                this.$emit("update:loginFields", newValue);
            },
        },
    }
}

</script>



<style lang="scss">
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
            width: 70px !important;
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

        &.lg {
            width: 80vw;
            padding: 40px !important;


            .title {
                font-size: 2em;
            }

            .login-btn {
                padding: 20px;
                width: 60px;
                height: 60px;
                bottom: 15px;
            }

            .form {

                margin-top: 50px;

                .input-box {
                    font-size: 0.9em;
                }

                .errors {
                    font-size: 0.8em;
                    top: -40px;
                }

            }
        }



        &.sm {
            padding: 20px !important;

            .login-btn {
                padding: 15px;
                width: 50px;
                height: 50px;
                top: 5px;
            }

            .title {
                font-size: 1em;

                .close {
                    padding: 0;
                    font-size: 2em;
                }
            }

            .form {
                margin-top: 30px;

                .submit-btn-box {
                    .submit-btn {
                        font-size: 0.8em;
                        padding: 10px 30px;
                    }
                }

                .errors {
                    font-size: 0.6em;
                    top: -30px;
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
                transform: scale(100);
                transition: transform 1s ease;
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
</style>