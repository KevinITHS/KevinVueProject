<template>
  <router-link to="/" class="fixed-button back-button">
    <i class="fa-solid fa-circle-left fa-2xl"></i>
  </router-link>
  <div class="mmonews">
    <h1>The latest video games news!</h1>
    <ul class="news-container">
      <li v-for="article in articles" :key="article.title" class="news-card">
        <div class="news-content">
          <img :src="article.thumbnail" :alt="article.title" />
          <h2 class="news-title">{{ article.title }}</h2>
          <div class="news-description">
            <p v-html="article.short_description"></p>
          </div>
          <a
            href="#"
            @click="confirmRedirect(article.article_url)"
            class="read-more"
          >
            Read More
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchLatestNews } from "../apiService.js";


export default {
  name: "MMONews",
  data() {
    return {
      articles: [],
    };
  },
  async mounted() {
    try {
      const response = await fetchLatestNews();
      this.articles = JSON.parse(response);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  },
  methods: {
    confirmRedirect(articleUrl) {
      const confirmation = window.confirm(
        "You're about to be redirected. Are you sure you want to leave this site?"
      );
      if (confirmation) {
        window.open(articleUrl, "_blank");
      }
    },
  },
};
</script>

<style scoped>
.mmonews {
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

.news-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.news-card {
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

.news-card:hover {
  transform: scale(1.05);
}

.news-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.news-description {
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

.news-card:hover .news-description {
  max-height: 100%;
  overflow: auto;
  opacity: 1;
  padding: 10px;
  pointer-events: auto;
  transition: max-height 0.3s, opacity 0.3s;
}

.news-title {
  opacity: 1;
  transition: opacity 0.3s;
}

.news-card:hover .news-title {
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

.news-card:hover .read-more {
  opacity: 1;
}

.fixed-button {
  position: fixed !important;
  z-index: 999;
}
</style>
