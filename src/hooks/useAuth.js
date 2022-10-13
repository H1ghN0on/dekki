import { reactive, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

export default function useAuth() {
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();

  const isRegister = ref(false);
  const registrationFields = reactive({
    username: "",
    email: "",
    password: "",
  });
  const loginFields = reactive({
    username: "",
    password: "",
  });
  const errors = reactive({
    registration: [],
    login: [],
  });

  const handleLogout = () => {
    store.commit("removeToken");
    localStorage.removeItem("token");
    router.push("/auth");
  };

  const onRegistrationSuccess = () => {
    toggleAuth();
    toast.success("Успешная регистрация!", {
      timeout: 2000,
    });
  };

  const onLoginSuccess = (token) => {
    store.commit("setToken", token);
    localStorage.setItem("token", token);
    toast.success("Успешная авторизация!", {
      timeout: 2000,
    });
    router.push(route.query.to || "/decks");
  };

  const handleRegister = async () => {
    errors.registration = [];
    if (!registrationFields.username.trim()) {
      errors.registration.push("Введите имя пользователя");
    }
    if (!registrationFields.email.trim()) {
      errors.registration.push("Введите почту");
    }
    if (!registrationFields.password.trim()) {
      errors.registration.push("Введите пароль");
    }

    if (!errors.registration.length) {
      await axios
        .post("/auth/users/", registrationFields)
        .then(() => {
          registrationFields.username = "";
          registrationFields.email = "";
          registrationFields.password = "";
          onRegistrationSuccess();
        })
        .catch((err) => {
          errors.registration = Object.values(err.response.data).map(
            (error) => error[0]
          );
        });
    }
  };

  const handleLogin = async () => {
    errors.login = [];
    if (!loginFields.username.trim()) {
      errors.login.push("Введите имя пользователя");
    }
    if (!loginFields.password.trim()) {
      errors.login.push("Введите пароль");
    }
    if (!errors.login.length) {
      await axios
        .post("/auth/token/login/", loginFields)
        .then((res) => {
          loginFields.username = "";
          loginFields.email = "";
          loginFields.password = "";

          if (res.data.auth_token) {
            onLoginSuccess(res.data.auth_token);
          } else {
            errors.login.push("Неизвестная ошибка");
          }
        })
        .catch((err) => {
          console.log(err);
          errors.login = Object.values(err.response.data).map(
            (error) => error[0]
          );
        });
    }
  };

  const toggleAuth = () => {
    isRegister.value = !isRegister.value;
    errors.register = errors.login = [];
  };

  const handleAuth = async () => {
    if (isRegister.value) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  return {
    registrationFields,
    loginFields,
    errors,
    handleAuth,
    handleLogout,
    isRegister,
    toggleAuth,
  };
}
