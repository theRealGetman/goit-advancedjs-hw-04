import { getPhotos } from "./js/pixabay-api";
import * as render from "./js/render-functions";

const searchForm = document.querySelector(".search-form");
let searchQuery = "";
let _page = 1;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  _page = 1;
  searchQuery = document.querySelector("#search-box").value;

  if (searchQuery.trim() === "") {
    render.showEmptyQueryError();
    return;
  }

  render.showLoader();

  try {
    const data = await getPhotos(searchQuery);
    const images = data.hits;
    render.clearGallery();

    if (images.length === 0) {
      render.showEmptyError();
      return;
    }
    render.showGallery(images);

    if (data.hasMore) {
      render.showLoadMoreButton();
    } else {
      render.hideLoadMoreButton();
      render.showNoMoreImagesMessage();
    }
  } catch (error) {
    console.log(error);
    render.showUnknownError();
  } finally {
    render.hideLoader();
  }
});

document.querySelector(".load-more").addEventListener("click", async () => {
  _page += 1;

  render.showLoader();
  render.hideLoadMoreButton();

  try {
    const data = await getPhotos(searchQuery, _page);
    render.addItemsToGallery(data.hits);

    if (data.hasMore) {
      render.showLoadMoreButton();
    } else {
      render.hideLoadMoreButton();
      render.showNoMoreImagesMessage();
    }
  } catch (error) {
    console.log(error);
    render.showUnknownError();
  } finally {
    render.hideLoader();
  }
});
