import { DeckSettingsPage, DecksPage, DeckUpdatePage, AuthPage } from "@/pages";
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
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
