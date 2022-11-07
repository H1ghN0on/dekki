<template>
  <header :class="breakpoints">
    <div class="logo">
      <router-link to="/decks">デッキ</router-link>
    </div>
    <nav>
      <router-link v-if="!$store.getters.isAuthenticated" to="/auth">
        <base-button class="sign-in-btn pointer">Вход</base-button>
      </router-link>
      <base-button v-else @click="handleLogout" class="sign-in-btn pointer">Выход</base-button>
    </nav>
  </header>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import { useAuth } from "@/hooks";
import { breakpointsMixin } from "@/mixins";
export default {
  mixins: [breakpointsMixin],
  components: {
    BaseButton,
  },

  setup() {
    const { handleLogout } = useAuth();
    return { handleLogout };
  },


};
</script>

<style lang="scss" scoped>
header {

  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  background: white;
  height: 80px;
  padding: 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);

  .logo {
    font-size: 3em;
    font-weight: bold;
  }

  nav {
    position: absolute;
    right: 5vw;
  }

  .sign-in-btn {
    font-size: 1em;
    padding: 10px 25px;
  }

  &.sm {
    justify-content: space-between;
    padding: 10px 30px;

    nav {
      position: static;
    }
  }
}
</style>
