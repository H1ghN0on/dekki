<template>
    <the-header />
    <div class="container">
        <auth-form @toggleAuth="toggleAuth" :registrationFields="registrationFields" :loginFields="loginFields"
            :errors="errors" :isRegister="isRegister" @submit="handleSubmitForm" :isLoading="isLoading" />
    </div>
</template>

<script>
import AuthForm from "@/components/AuthForm"
import TheHeader from "@/components/TheHeader"
import { useAuth } from "@/hooks"

export default {

    name: "AuthPage",
    components: { TheHeader, AuthForm },
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
}
</style>