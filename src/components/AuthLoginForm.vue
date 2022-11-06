<template>
    <div class="card login" :class="breakpoints">
        <div class="title">
            Вход
        </div>
        <form class="form">
            <div class="errors" v-if="errors.login.length">
                <div class="error" v-for="error, index of errors.login" :key="index">{{ error }}</div>
            </div>
            <div class="input-box">
                <base-input class="input" v-model="localModelValue.username" :label="'Имя пользователя'" />
            </div>
            <div class="input-box">
                <base-input class="input" v-model="localModelValue.password" :label="'Пароль'" :type="'password'" />
            </div>
            <div class="submit-btn-box">
                <base-button :isLoading="isLoading" @click.prevent="$emit('submit')" class="submit-btn" type="'submit'">
                    Вперёд
                </base-button>
            </div>
        </form>
    </div>
</template>


<script>

import BaseButton from "@/components/BaseButton"
import BaseInput from "@/components/BaseInput"
import { localModelValueMixin, breakpointsMixin } from "@/mixins";


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

    mixins: [localModelValueMixin, breakpointsMixin]
}

</script>

<style lang="scss" scoped>
.card {
    .form {
        .input-box {
            .input {
                ::v-deep input {
                    padding: 15px;
                }
            }
        }
    }
}
</style>