const apiKey = "56f3c03e51mshe077fecdd2252aep131963jsnee4540e7b907";

async function fetchData(url) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchGameDetails(gameId) {
  const url = `https://mmo-games.p.rapidapi.com/game?id=${gameId}`;
  return await fetchData(url);
}

export async function fetchLatestNews() {
  const url = "https://mmo-games.p.rapidapi.com/latestnews";
  return await fetchData(url);
}

export async function fetchGiveaways() {
  const url = "https://mmo-games.p.rapidapi.com/giveaways";
  return await fetchData(url);
}

export async function fetchFilteredGames(tag, platform) {
  const url = `https://mmo-games.p.rapidapi.com/filter?tag=${tag}&platform=${platform}`;
  return await fetchData(url);
}

export async function fetchGamesByCategoryAndSort(category, sortBy) {
  const url = `https://mmo-games.p.rapidapi.com/games?category=${category}&sort-by=${sortBy}`;
  return await fetchData(url);
}

export async function fetchGamesByPlatform(platform) {
  const url = `https://mmo-games.p.rapidapi.com/games?platform=${platform}`;
  return await fetchData(url);
}

export async function fetchGamesBySort(sortBy) {
  const url = `https://mmo-games.p.rapidapi.com/games?sort-by=${sortBy}`;
  return await fetchData(url);
}

export async function fetchGamesByCategory(category) {
  const url = `https://mmo-games.p.rapidapi.com/games?category=${category}`;
  return await fetchData(url);
}

export async function fetchGames() {
  const url = "https://mmo-games.p.rapidapi.com/games";
  return await fetchData(url);
}
