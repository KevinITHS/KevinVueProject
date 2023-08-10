
import { createApp } from 'vue';
import App from './App.vue';
import { fetchGameData } from './apiService'; 

const app = createApp(App);

app.config.globalProperties.$fetchGameData = fetchGameData;


async function fetchData() {
  const apiUrls = [
    'https://mmo-games.p.rapidapi.com/game?id=452',
    'https://mmo-games.p.rapidapi.com/latestnews',
    'https://mmo-games.p.rapidapi.com/giveaways',
    'https://mmo-games.p.rapidapi.com/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc',
    'https://mmo-games.p.rapidapi.com/games?platform=browser&category=mmorpg&sort-by=release-date',
    'https://mmo-games.p.rapidapi.com/games?sort-by=alphabetical',
    'https://mmo-games.p.rapidapi.com/games?category=shooter',
    'https://mmo-games.p.rapidapi.com/games?platform=browser',
    'https://mmo-games.p.rapidapi.com/games'
  ];

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '56f3c03e51mshe077fecdd2252aep131963jsnee4540e7b907',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
    }
  };

  try {
    for (const url of apiUrls) {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();

app.mount('#app');