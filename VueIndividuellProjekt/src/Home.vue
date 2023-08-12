<template>
  <div class="home">
    <h1>Welcome to My Vue App</h1>
    <p>This is the home page content. You can replace this with your own content.</p>
  </div>
</template>

<script>
export default {
  name: 'Home', // Specify the component name
  setup() {
    // Your setup logic if needed

    // Example fetchData function (you can modify or remove this)
    const fetchData = async () => {
      const url = 'https://mmo-games.p.rapidapi.com/game?id=452';
      const result = await $fetchGameData(url);
      if (result) {
        console.log(result);
      }
    };

    fetchData(); // Call fetchData if needed

    // Return any properties, methods, etc. if needed
    return {};
  },
};
</script>

<style scoped>
/* Add styles for the home page here */
</style>
