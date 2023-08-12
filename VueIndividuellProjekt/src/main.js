import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; 
import Home from './Home.vue';
import { 
  fetchGameData,
  fetchGameDetails,
  fetchLatestNews,
  fetchGiveaways,
  fetchFilteredGames,
  fetchGamesByCategoryAndSort,
  fetchGamesByPlatform,
  fetchGamesBySort,
  fetchGamesByCategory,
  fetchGames
} from './apiService';

const app = createApp(App);

// Add the imported functions to the globalProperties
app.config.globalProperties.$fetchGameData = fetchGameData;
app.config.globalProperties.$fetchGameDetails = fetchGameDetails;
app.config.globalProperties.$fetchLatestNews = fetchLatestNews;
app.config.globalProperties.$fetchGiveaways = fetchGiveaways;
app.config.globalProperties.$fetchFilteredGames = fetchFilteredGames;
app.config.globalProperties.$fetchGamesByCategoryAndSort = fetchGamesByCategoryAndSort;
app.config.globalProperties.$fetchGamesByPlatform = fetchGamesByPlatform;
app.config.globalProperties.$fetchGamesBySort = fetchGamesBySort;
app.config.globalProperties.$fetchGamesByCategory = fetchGamesByCategory;
app.config.globalProperties.$fetchGames = fetchGames;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home, // Use Home.vue as the component for the '/' route
    },
    // Add more routes for other components/pages
  ],
});

app.use(router);

app.mount('#app');
