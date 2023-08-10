<template>
  <!-- Your component's template -->
</template>

<script>
export default {
  setup() {
    const fetchData = async () => {
      const url = 'https://mmo-games.p.rapidapi.com/game?id=452';
      const result = await $fetchGameData(url); // Directly use $fetchGameData
      if (result) {
        console.log(result);
      }
    };

    fetchData();
  }
};
</script>
