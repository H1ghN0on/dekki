<template>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {

  beforeCreate() {
    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
      axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }

  }

}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
@import "vue-toastification/dist/index.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f5f5;
  font-size: 16px;
}

#app {
  font-family: "Raleway";
  color: $primary-text;

  a {
    color: inherit;
    text-decoration: none;
  }
}

input {
  color: $primary-text;
}

.pointer {
  cursor: pointer;
}
</style>
