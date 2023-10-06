<template>
  <div>
    <router-link to="/" class="fixed-button back-button">
      <i class="fa-solid fa-circle-left fa-2xl"></i>
    </router-link>

    <div class="giveaways">
      <h1>Latest Giveaways!</h1>
      <ul class="giveaways-container">
        <li
          v-for="giveaway in giveaways"
          :key="giveaway.title"
          class="giveaway-card"
        >
          <div class="giveaway-content">
            <img :src="giveaway.thumbnail" :alt="giveaway.title" />
            <h2 class="giveaway-title">{{ giveaway.title }}</h2>
            <div class="giveaway-keys-left">
              Keys Left: {{ giveaway.keys_left }}
            </div>
            <div class="giveaway-description">
              <p v-html="giveaway.short_description"></p>
            </div>
            <a
              href="#"
              @click="confirmRedirect(giveaway.giveaway_url)"
              class="read-more"
            >
              Read More
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchGiveaways } from "../apiService.js";

export default {
  name: "Giveaways",
  data() {
    return {
      giveaways: [],
    };
  },
  async mounted() {
    try {
      const response = await fetchGiveaways();
      this.giveaways = JSON.parse(response);
    } catch (error) {
      console.error("Error fetching giveaways:", error);
    }
  },
  methods: {
    confirmRedirect(giveawayUrl) {
      const confirmation = window.confirm(
        "You're about to be redirected. Are you sure you want to leave this site?"
      );
      if (confirmation) {
        window.open(giveawayUrl, "_blank");
      }
    },
  },
};
</script>

<style scoped>
.giveaways {
  text-align: center;
  padding: 20px;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #f8c8dc;
}

.back-button:hover {
  color: black;
}

.giveaways-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.giveaway-card {
  margin: 15px;
  border: 1px solid #f8c8dc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  background-color: #f8c8dc;
  width: 300px;
  height: 350px;
  transition: transform 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.giveaway-card:hover {
  transform: scale(1.05);
}

.giveaway-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.giveaway-description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(221, 37, 37, 0);
  color: #040000;
  padding: 0;
  transition: max-height 0.3s;
  max-height: 200px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.giveaway-card:hover .giveaway-description {
  max-height: 100%;
  overflow: auto;
  opacity: 1;
  padding: 10px;
  pointer-events: auto;
  transition: max-height 0.3s, opacity 0.3s;
}

.giveaway-title {
  opacity: 1;
  transition: opacity 0.3s;
}

.giveaway-card:hover .giveaway-title {
  opacity: 0;
}

.read-more {
  display: block;
  opacity: 1;
  transition: opacity 0.3s;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}

.giveaway-card:hover .read-more {
  opacity: 1;
}

.fixed-button {
  position: fixed !important;
  z-index: 999;
}
</style>
