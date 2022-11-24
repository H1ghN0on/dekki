<template>
  <router-view v-responsive></router-view>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks";
import { useToast } from "vue-toastification"
export default {
  computed: {
    token() { return this.$store.state.token }
  },

  methods: {
    setToken() {
      if (this.token) {
        axios.defaults.headers.common["Authorization"] = "Token " + this.token;
        axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");
      } else {
        axios.defaults.headers.common['Authorization'] = ""
      }
    }
  },

  setup() {

    const toast = useToast();
    const { handleLogout } = useAuth();
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {

          handleLogout();
          toast.error("Вы не авторизованы!", {
            timeout: 2000,
          })
        }
        return error;
      }
    );
  },

  mounted() {

    this.setToken()
  },
  watch: {
    token() {
      this.setToken()
    },
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
  font-family: "Raleway";
  color: $primary-text;
}

.pointer {
  cursor: pointer;
}
</style>
