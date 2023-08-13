<template>
  <header>
    <div class="home">
      <h1>Welcome to MMO World!</h1>

      <h2>Latest news, giveaways, video games information and more!</h2>
      <p>
        Explore the world of video games like never before with our diverse
        range of content.
      </p>
    </div>
  </header>

  <body></body>

  <footer></footer>
</template>

<script>
export default {
  name: "Home",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin: auto;
  max-width: 800px;
}

.home h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.home h2 {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.home p {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
