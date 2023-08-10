<template>
  </template>
  
  <script>
  export default {
    setup() {
      const fetchData = async () => {
        const url = 'https://mmo-games.p.rapidapi.com/game?id=452';
        const result = await $fetchGameData(url); 
        if (result) {
          console.log(result);
        }
      };
  
      fetchData();
    }
  };
  </script>
  