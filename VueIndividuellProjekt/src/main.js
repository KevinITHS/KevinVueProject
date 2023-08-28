import { createApp } from "vue";
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
      component: Home, // use Home.vue as komponent for '/' route
    },
  ],
});

<<<<<<< Updated upstream
app.use(router);
=======
async function fetchData() {
  const apiUrls = [
    'https://mmo-games.p.rapidapi.com/game?=1',
    'https://mmo-games.p.rapidapi.com/latestnews',
    'https://mmo-games.p.rapidapi.com/giveaways',
    'https://mmo-games.p.rapidapi.com/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc',
    'https://mmo-games.p.rapidapi.com/games?platform=browser&category=mmorpg&sort-by=release-date',
    'https://mmo-games.p.rapidapi.com/games?sort-by=alphabetical',
    'https://mmo-games.p.rapidapi.com/games?category=shooter',
    'https://mmo-games.p.rapidapi.com/games?platform=browser',
    'https://mmo-games.p.rapidapi.com/games'
  ];
>>>>>>> Stashed changes

app.mount("#app");
