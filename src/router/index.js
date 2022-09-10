import { DecksPage, DeckUpdatePage } from "@/pages";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/decks",
    component: DecksPage,
  },
  {
    path: "/deck-update",
    component: DeckUpdatePage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
