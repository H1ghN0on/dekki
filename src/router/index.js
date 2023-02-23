import {
  DeckSettingsPage,
  DecksPage,
  DeckUpdatePage,
  AuthPage,
  TestingPage,
} from "@/pages";

import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/hooks";
import store from "@/store";

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/decks");
};

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  } else {
    //??
    if (localStorage.getItem("token")) {
      const { handleLogoutOutsideComponent } = useAuth();
      handleLogoutOutsideComponent(store);
    }

    next("/auth");
  }
};

const routes = [
  {
    path: "/decks",
    component: DecksPage,
    beforeEnter: isAuthenticated,
    meta: { title: "Колоды" },
  },
  {
    path: "/update/:deckSlug",
    component: DeckUpdatePage,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/settings/:deckSlug",
    component: DeckSettingsPage,
    beforeEnter: isAuthenticated,
  },
  {
    path: "/settings",
    component: DeckSettingsPage,
    beforeEnter: isAuthenticated,
  },

  {
    path: "/auth",
    component: AuthPage,
    beforeEnter: ifNotAuthenticated,
    meta: { title: "Авторизация" },
  },

  {
    path: "/testing/:deckSlug",
    component: TestingPage,
    beforeEnter: isAuthenticated,
    props: (route) => ({ query: route.query.length }),
    meta: { title: "Тестирование" },
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/auth",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

const DEFAULT_TITLE = "Dekki";

router.beforeEach((to, from, next) => {
  (document.title = to.meta.title || DEFAULT_TITLE), next();
});

export default router;
