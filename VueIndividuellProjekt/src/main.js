import { createApp } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import {
  fetchGameDetails,
  fetchLatestNews,
  fetchGiveaways,
  fetchFilteredGames,
  fetchGamesByCategoryAndSort,
  fetchGamesByPlatform,
  fetchGamesBySort,
  fetchGamesByCategory,
  fetchGames,
} from "./apiService";

const app = createApp(App);

app.config.globalProperties.$fetchGameDetails = fetchGameDetails;
app.config.globalProperties.$fetchLatestNews = fetchLatestNews;
app.config.globalProperties.$fetchGiveaways = fetchGiveaways;
app.config.globalProperties.$fetchFilteredGames = fetchFilteredGames;
app.config.globalProperties.$fetchGamesByCategoryAndSort =
  fetchGamesByCategoryAndSort;
app.config.globalProperties.$fetchGamesByPlatform = fetchGamesByPlatform;
app.config.globalProperties.$fetchGamesBySort = fetchGamesBySort;
app.config.globalProperties.$fetchGamesByCategory = fetchGamesByCategory;
app.config.globalProperties.$fetchGames = fetchGames;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/gameslist",
      component: () => import("./components/GamesList.vue"),
    },
    {
      path: "/mmonews",
      component: () => import("./components/MMONews.vue"),
    },
    {
      path: "/giveaways",
      component: () => import("./components/Giveaways.vue"),
    },
    // {
    //   path: "/filtermultitags",
    //   component: () => import("./components/FilterMultiTags.vue"),
    // },
    // {
    //   path: "/platcatsort",
    //   component: () => import("./components/PlatCatSort.vue"),
    // },
    // {
    //   path: "/sortgames",
    //   component: () => import("./components/SortGames.vue"),
    // },
    // {
    //   path: "/categorytag",
    //   component: () => import("./components/CategoryTag.vue"),
    // },

    // {
    //   path: "/gamesbyplat",
    //   component: () => import("./components/GamesByPlat.vue"),
    // },

    {
      path: "/specificdetail",
      component: () => import("./components/SpecificDetail.vue"),
    },
  ],
});

app.use(router);

app.mount("#app");
