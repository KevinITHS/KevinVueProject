import { createApp } from 'vue';
import App from './App.vue';
import { fetchGameData } from './apiService'; // Update the path

const app = createApp(App);

app.config.globalProperties.$fetchGameData = fetchGameData;

// Call the fetchGameData function here
async function fetchData() {
  const apiUrls = [
    // ... API URLs ...
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
