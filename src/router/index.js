import { DeckSettingsPage, DecksPage, DeckUpdatePage } from "@/pages";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/decks",
    component: DecksPage,
  },
  {
    path: "/update",
    component: DeckUpdatePage,
  },
  {
    path: "/settings",
    component: DeckSettingsPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
