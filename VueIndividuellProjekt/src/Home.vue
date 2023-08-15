<template>
  <div class="home">
    <header class="header">
      <h1>Welcome to MMO World!</h1>
      <h2>Latest news, giveaways, video games information and more!</h2>
      <p>
        Explore the world of video games like never before with our diverse range of content.
      </p>
    </header>

    <div class="carousel-container">
      <Carousel :autoplay="4000" :wrap-around="true">
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="carousel-item">
            <img :src="slide.image" :alt="slide.title" />
            <div class="overlay">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>

    <footer></footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Home',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {

      // titles and descriptions from the endpoints at https://rapidapi.com/digiwalls/api/mmo-games
      slides: [
        {
          id: 1,
          image: 'src/pictures/games1.png',
          title: 'Games list',
          description: 'Live games list',
          route: '/GamesList',
      
        },
        {
          id: 2,
          image: 'src/pictures/games2.png',
          title: 'Latest MMO News',
          description: 'Latest MMO News powered by MMOBomb',
          route: '/MMONews',
        },
        {
          id: 3,
          image: 'src/pictures/games3.png',
          title: 'Latest MMO Giveaways',
          description: 'Live Giveaways list',
          route: '/Giveaways',

        },
        {
          id: 4,
          image: 'src/pictures/games4.png',
          title: 'Filter Games by multiple tags',
          description: 'Filter Games by multiple tags for personalized results. Insert tag, eg: mmorpg, shooter, pvp, mmofps and more at https://www.mmobomb.com/api . Optionally you can also use the "platform"...',
          route: '/FilterMultiTags',
        },
        {
          id: 5,
          image: 'src/pictures/games5.png',
          title: 'Games by platform & category & sorted',
          description: 'Games by platform & category & sorted',
          route: '/PlatCatSort',
        },
        {
          id: 6,
          image: 'src/pictures/games6.png',
          title: 'Sort Games',
          description: 'Sort games by release date, alphabetical, popularity or relevance',
          route: '/SortGames',
        },
        {
          id: 7,
          image: 'src/pictures/games7.png',
          title: 'Games by category or tag',
          description: 'Insert game category or tag, eg: mmorpg, shooter, pvp, mmofps and more. Full tag list at https://www.mmobomb.com/api',
          route: '/CategoryTag',
        },
        {
          id: 8,
          image: 'src/pictures/games8.png',
          title: 'Games by Platform',
          description: 'Insert platform, eg: pc, browser or all',
          route: '/GamesByPlat',

        },
        {
          id: 9,
          image: 'src/pictures/games9.png',
          title: 'Return details from a specific game',
          description: 'Insert game id',
          route: '/SpecificDetail',

        },
      
      ],
    };
  },
});
</script>

<style scoped>
.header {
  text-align: center;
  margin: auto;
  max-width: 800px;
}

.header h1 {
  font-size: 24px;
  margin-bottom: 15px;
}

.header h2 {
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.header p {
  font-size: 16px;
  margin-bottom: 30px;
}

.carousel-container {
  margin: auto;
  max-width: 800px;
  text-align: center;
}

.carousel-item {
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #f0f0f0;
  padding: 15px;
}

.overlay h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.overlay p {
  font-size: 16px;
  line-height: 1.4;
}

.carousel img {
  max-width: 100%;
  height: auto;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination span {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #888;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
}

.pagination span.active {
  background-color: #444;
}
</style>
