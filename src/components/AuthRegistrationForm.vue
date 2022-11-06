<template>
    <div class="card register">
        <div @click="$emit('toggleAuth')" class="login-btn pointer"></div>
        <div class="title">
            <span>Регистрация</span>
            <div @click="$emit('toggleAuth')" class="close pointer"></div>
        </div>

        <form class="form">
            <div class="errors" v-if="errors.registration.length">
                <div class="error" v-for="error, index of errors.registration" :key="index">{{ error }}</div>
            </div>

            <div class="input-box">
                <base-input class="input" v-model="localModelValue.username" :label="'Имя пользователя'" />
            </div>
            <div class="input-box">
                <base-input class="input" v-model="localModelValue.email" :label="'Почта'" />
            </div>
            <div class="input-box">
                <base-input class="input" v-model="localModelValue.password" :label="'Пароль'" :type="'password'" />
            </div>
            <div class="submit-btn-box">
                <base-button :isLoading="isLoading" @click.prevent="$emit('submit')" class=" submit-btn"
                    type="'submit'">
                    Вперёд
                </base-button>
            </div>
        </form>
    </div>
</template>


<script>
import BaseButton from "@/components/BaseButton"
import BaseInput from "@/components/BaseInput"
import { localModelValueMixin } from "@/mixins";


export default {
    components: { BaseButton, BaseInput },
    props: {
        errors: {
            type: Object, required: true
        },
        isLoading: {
            type: Boolean, required: true,
        }
    },

    mixins: [localModelValueMixin]
}

</script>

<style lang="scss" scoped>
.card {
    .form {
        .input-box {
            .input {
                ::v-deep input {
                    background: $primary-lighter;
                    color: white;
                    padding: 15px;

                    &::placeholder {
                        color: white;
                    }
                }
            }
        }
    }
}
</style>

