<template>
  <div>
    <div class="fixed-button back-button">
      <router-link to="/">
        <i class="fa-solid fa-circle-left fa-2xl"></i>
      </router-link>
    </div>

    <div
      class="fixed-button favorites-placeholder"
      @click="toggleFavoritesList"
    >
      <i class="fa-solid fa-book-bookmark fa-2x"></i>
      <div class="bookmark-notification" v-if="bookmarkCount > 0">
        {{ bookmarkCount }}
      </div>
    </div>

    <div class="filter-section">
      <label for="platform-filter">Platform:</label>
      <select
        id="platform-filter"
        v-model="selectedPlatform"
        @change="filterGames"
      >
        <option value="">All</option>
        <option value="PC (Windows)">PC (Windows)</option>
        <option value="Web Browser">Web Browser</option>
      </select>

      <label for="category-filter">Category/Genre:</label>
      <select
        id="category-filter"
        v-model="selectedCategory"
        @change="filterGames"
      >
        <option value="">All</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <button @click="resetFilters">Reset Filter</button>
    </div>

    <div
      v-if="showFavorites"
      class="fixed-button favorites-sidebar"
      @click.stop
    >
      <h2>Favorited Games</h2>
      <ul>
        <li v-for="game in bookmarkedGames" :key="game.id">
          {{ game.title }}
          <button
            @click="removeFromFavorites(game)"
            class="remove-button fixed-right"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      </ul>
    </div>

    <div class="games-list">
      <h1>Our entire game library!</h1>
      <ul class="games-container">
        <li v-for="game in games" :key="game.id" class="game-card">
          <div class="bookmark-button" @click="toggleBookmark(game)">
            <i
              :class="{
                'fa-solid fa-bookmark': game.bookmarked,
                'fa-regular fa-bookmark': !game.bookmarked,
              }"
              class="fa-2x"
              style="
                color: #6a5acd;
                background-color: #f8c8dc;
                border-radius: 0%;
                padding: 5px;
                cursor: pointer;
              "
            >
            </i>
          </div>
          <div class="game-content">
            <img :src="game.thumbnail" :alt="game.title" />
            <h2 class="game-title">{{ game.title }}</h2>
            <div class="game-description">
              <p class="game-description-text">
                {{ truncateDescription(game.short_description) }}
              </p>
            </div>
            <p class="game-id"><strong>ID:</strong> {{ game.id }}</p>
            <div class="game-details">
              <p class="game-publisher">
                <strong>Publisher:</strong> {{ game.publisher }}
              </p>
              <p class="game-developer">
                <strong>Developer:</strong> {{ game.developer }}
              </p>
              <p class="game-genre"><strong>Genre:</strong> {{ game.genre }}</p>
              <p class="game-platform">
                <strong>Platform:</strong> {{ game.platform }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  fetchGames,
  fetchGamesByPlatform,
  fetchGamesBySort,
  fetchGamesByCategory,
} from "../apiService.js";

export default {
  name: "GamesList",
  data() {
    return {
      games: [],
      showFavorites: false,
      bookmarkedGames: [],
      bookmarkCount: 0,
      selectedCategory: "",
      selectedPlatform: "",
      categories: [
        "MMORPG",
        "Shooter",
        "ARPG",
        "Battle Royale",
        "Strategy",
        "Fighting",
        "Card Game",
        "Action RPG",
        "Action",
        "MMOTPS",
        "Racing",
        "MOBA",
        "Sports",
        "MMOFPS",
        "MMO",
        "Fantasy",
      ],
      platforms: ["PC (Windows)", "Web Browser"],
    };
  },
  async mounted() {
    try {
      this.fetchOriginalGames();

      const storedBookmarks = JSON.parse(
        localStorage.getItem("bookmarkedGames")
      );
      if (storedBookmarks) {
        this.bookmarkedGames = storedBookmarks;

        this.games.forEach((game) => {
          const index = this.bookmarkedGames.findIndex((g) => g.id === game.id);
          if (index !== -1) {
            game.bookmarked = true;
          } else {
            game.bookmarked = false;
          }
        });

        this.updateBookmarkCount();
      } else {
        this.games.forEach((game) => {
          game.bookmarked = false;
        });
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  },
  methods: {
    toggleBookmark(game) {
      game.bookmarked = !game.bookmarked;
      if (game.bookmarked) {
        this.bookmarkedGames.push(game);
        this.updateBookmarkCount();
      } else {
        const index = this.bookmarkedGames.findIndex((g) => g.id === game.id);
        if (index !== -1) {
          this.bookmarkedGames.splice(index, 1);
          this.updateBookmarkCount();
        }
      }
    },
    toggleFavoritesList() {
      this.showFavorites = !this.showFavorites;
    },
    removeFromFavorites(game) {
      const index = this.bookmarkedGames.findIndex((g) => g.id === game.id);
      if (index !== -1) {
        this.bookmarkedGames.splice(index, 1);
        game.bookmarked = false;
        this.updateBookmarkCount();
      }
    },
    updateBookmarkCount() {
      this.bookmarkCount = this.bookmarkedGames.length;
    },
    truncateDescription(description) {
      const maxLength = 350;
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + " ...";
      } else {
        return description;
      }
    },
    filterGames() {
      let filteredGames = this.games;

      if (this.selectedPlatform) {
        filteredGames = filteredGames.filter(
          (game) => game.platform === this.selectedPlatform
        );
      }

      if (this.selectedCategory) {
        filteredGames = filteredGames.filter(
          (game) => game.genre === this.selectedCategory
        );
      }

      this.games = filteredGames;
    },
    resetFilters() {
      this.selectedPlatform = "";
      this.selectedCategory = "";

      this.fetchOriginalGames();
    },
    async fetchOriginalGames() {
      try {
        const response = await fetchGames();
        this.games = JSON.parse(response);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
  },
  watch: {
    bookmarkedGames: {
      handler() {
        localStorage.setItem(
          "bookmarkedGames",
          JSON.stringify(this.bookmarkedGames)
        );
        this.updateBookmarkCount();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.games-list {
  text-align: center;
  padding: 20px;
}

.favorites-placeholder {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #f8c8dc;
  cursor: pointer;
}

.favorites-placeholder:hover {
  color: black;
}

.games-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.game-card {
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

.game-card:hover {
  transform: scale(1.05);
}

.game-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
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

.game-title,
.game-id,
.game-publisher,
.game-developer,
.game-genre,
.game-platform {
  opacity: 1;
  transition: opacity 0.3s;
  margin-bottom: -10px;
  font-size: 16px;
}

.game-title {
  font-size: larger;
}

.game-description {
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

.game-card:hover .game-description {
  max-height: 100%;
  overflow: auto;
  opacity: 1;
  padding: 10px;
  pointer-events: auto;
  transition: max-height 0.3s, opacity 0.3s;
}

.game-title,
.game-id,
.game-publisher,
.game-developer,
.game-genre,
.game-platform {
  opacity: 1;
  transition: opacity 0.3s;
}

.game-card:hover .game-title,
.game-card:hover .game-id,
.game-card:hover .game-publisher,
.game-card:hover .game-developer,
.game-card:hover .game-genre,
.game-card:hover .game-platform {
  opacity: 0;
}

.bookmark-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.favorites-container {
  position: relative;
}

.favorites-placeholder {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #f8c8dc;
  cursor: pointer;
}

.favorites-placeholder:hover {
  color: black;
}

.favorites-sidebar {
  position: absolute;
  top: 100px;
  right: -10px;
  background-color: #f8c8dced;
  width: 275px;
  margin-right: 10px;
  padding-left: -30px;
  padding-right: 30px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorites-sidebar h2 {
  margin: 0 0 0 0px;
  font-size: 18px;
}

.fixed-button {
  position: fixed !important;
  z-index: 999;
}

.remove-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: red;
  font-size: 20px;
  position: fixed;
}

.bookmark-notification {
  position: absolute;
  top: 20px;
  left: 15px;
  background-color: rgba(255, 0, 0, 0.806);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.filter-section {
  text-align: center;
  margin: 20px;
}

.filter-section label {
  font-weight: bold;
  margin-right: 10px;
}

.filter-section select {
  padding: 5px;
  font-size: 16px;
}
</style>
