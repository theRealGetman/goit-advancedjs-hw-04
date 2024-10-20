export { getPhotos };

import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "46495648-ca89e041c4cf307aa03db9722";
const PER_PAGE = 15;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  per_page: PER_PAGE,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

async function getPhotos(searchQuery, page = 1) {
  const response = await axios.get("", {
    params: {
      q: searchQuery,
      page,
    },
  });

  return {
    hits: response.data.hits,
    hasMore: page * PER_PAGE < response.data.totalHits,
  };
}
