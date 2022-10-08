<template>
  <header>
    <div class="logo">
      <router-link to="/decks">正午</router-link>
    </div>
    <nav>
      <router-link to="auth">
        <base-button class="sign-in-btn pointer">Вход</base-button>
      </router-link>
    </nav>
  </header>
</template>

<script>
import BaseButton from "@/components/BaseButton"
export default {
  components: {
    BaseButton,
  }
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

}
</style>
