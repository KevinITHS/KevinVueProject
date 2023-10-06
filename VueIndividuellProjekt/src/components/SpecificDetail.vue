<template>
  <div class="fixed-button back-button">
    <router-link to="/">
      <i class="fa-solid fa-circle-left fa-2xl"></i>
    </router-link>
  </div>

  <div class="specific-detail">
    <h1>Insert a random game ID from 1 - 511 for more information!</h1>
    <h2 style="font-size: 16px">(340 to 432 are currently unavailable)</h2>
    <input v-model="gameId" type="number" placeholder="Enter Game ID" />
    <button @click="getGameDetails">Search</button>

    <div v-if="gameDetails">
      <div class="game-details-container">
        <h2>{{ gameDetails.title }}</h2>
        <img :src="gameDetails.thumbnail" :alt="gameDetails.title" />
        <p>Status: {{ gameDetails.status }}</p>
        <div v-html="gameDetails.description"></div>
        <p>Genre: {{ gameDetails.genre }}</p>
        <p>Platform: {{ gameDetails.platform }}</p>
        <p>Publisher: {{ gameDetails.publisher }}</p>
        <p>Developer: {{ gameDetails.developer }}</p>
        <p>Release Date: {{ gameDetails.release_date }}</p>
        <a :href="gameDetails.game_url" target="_blank">More Info</a>
        <h3>Minimum System Requirements:</h3>
        <ul>
          <li>OS: {{ gameDetails.minimum_system_requirements.os }}</li>
          <li>
            Processor: {{ gameDetails.minimum_system_requirements.processor }}
          </li>
          <li>Memory: {{ gameDetails.minimum_system_requirements.memory }}</li>
          <li>
            Graphics: {{ gameDetails.minimum_system_requirements.graphics }}
          </li>
          <li>
            Storage: {{ gameDetails.minimum_system_requirements.storage }}
          </li>
        </ul>
        <h3>Screenshots:</h3>
        <div class="screenshots">
          <img
            v-for="screenshot in gameDetails.screenshots"
            :key="screenshot.id"
            :src="screenshot.image"
            :alt="gameDetails.title"
          />
        </div>
      </div>
    </div>

    <div v-if="notFound" class="not-found">
      <p>Client Error</p>
      <p>Status: {{ notFound.status_message }}</p>
    </div>
  </div>
</template>

<script>
import { fetchGameDetails } from "../apiService.js";

export default {
  name: "SpecificDetail",
  data() {
    return {
      gameId: "",
      gameDetails: null,
      notFound: null,
    };
  },
  methods: {
    async getGameDetails() {
      this.gameDetails = null;
      this.notFound = null;

      try {
        const response = await fetchGameDetails(this.gameId);
        this.gameDetails = JSON.parse(response);
      } catch (error) {
        console.error("Error fetching game details:", error);
        this.notFound = {
          status_message: "No game found with that ID",
        };
      }
    },
  },
};
</script>

<style scoped>
.specific-detail {
  text-align: center;
  padding: 20px;
}

div.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

div.back-button a {
  color: #f8c8dc !important;
}

div.back-button:hover a {
  color: black !important;
}

.fixed-button {
  position: fixed !important;
  z-index: 999;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

input[type="number"] {
  padding: 5px;
  font-size: 16px;
}

button {
  padding: 5px 10px;
  background-color: #6a5acd;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #5639ab;
}

.game-details-container {
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.not-found {
  color: red;
  font-size: 18px;
}

.screenshots {
  text-align: center;
}

.screenshots img {
  max-width: 100%;
  height: auto;
  margin: 10px auto;
  border: 1px;
  border-radius: 5px;
}

@media screen and (max-width: 475px) {
  .game-details-container img {
    max-width: 100%;
    height: auto;
  }
}
</style>
