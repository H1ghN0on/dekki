import { createApp } from "vue";
import router from "@/router";
import App from "./App.vue";
import directives from "@/directives";
import axios from "axios";
import VueAxios from "vue-axios";
import Toast, { POSITION } from "vue-toastification";
import store from "@/store";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = "http://localhost:8000";

const toastOptions = {
  position: POSITION.BOTTOM_RIGHT,
};

const app = createApp(App);

directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app
  .use(router)
  .use(VueAxios, axios)
  .use(Toast, toastOptions)
  .use(store)
  .mount("#app");
