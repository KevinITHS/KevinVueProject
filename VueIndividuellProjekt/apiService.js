export async function fetchGameData(url) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '56f3c03e51mshe077fecdd2252aep131963jsnee4540e7b907',
      'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
    }
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