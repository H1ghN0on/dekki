import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { Api } from "@/api";
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

  const handleLogoutOutsideComponent = (myStore) => {
    myStore.commit("removeToken");
    localStorage.removeItem("token");
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
      const [error] = await Api().register(registrationFields);

      if (error) {
        errors.registration = Object.values(error.response.data).map(
          (err) => err[0]
        );
      } else {
        registrationFields.username = "";
        registrationFields.email = "";
        registrationFields.password = "";
        onRegistrationSuccess();
      }
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
      const [error, data] = await Api().login(loginFields);
      if (error) {
        errors.login = Object.values(error.response.data).map((err) => err[0]);
      } else {
        loginFields.username = "";
        loginFields.email = "";
        loginFields.password = "";

        if (data.auth_token) {
          onLoginSuccess(data.auth_token);
        } else {
          errors.login.push("Ошибка случилась");
        }
      }
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
    handleLogoutOutsideComponent,
  };
}
