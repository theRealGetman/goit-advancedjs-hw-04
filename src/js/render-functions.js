export {
  showEmptyQueryError,
  showEmptyError,
  showUnknownError,
  showLoader,
  hideLoader,
  clearGallery,
  showGallery,
  addItemsToGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  showNoMoreImagesMessage,
  scrollToImages,
};

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

function renderGalleryMarkup(images) {
  return images
    .map((image) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img class="gallery-image" src="${webformatURL}" data-source="${largeImageURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </li>
            `;
    })
    .join("");
}

function showEmptyQueryError() {
  iziToast.error({
    message: "Please enter a search query!",
    position: "topRight",
    timeout: 3000,
  });
}

function showEmptyError() {
  iziToast.error({
    message:
      "Sorry, there are no images matching your search query. Please try again!",
    position: "topRight",
    timeout: 3000,
  });
}

function showUnknownError() {
  iziToast.error({
    message: "Sorry, something went wrong. Please try again!",
    position: "topRight",
    timeout: 3000,
  });
}

function showLoader() {
  document.querySelector(".loader").style.display = "block";
}

function hideLoader() {
  document.querySelector(".loader").style.display = "none";
}

function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}

function showGallery(images) {
  document.querySelector(".gallery").innerHTML = renderGalleryMarkup(images);
  lightbox.refresh();
}

function addItemsToGallery(images) {
  document
    .querySelector(".gallery")
    .insertAdjacentHTML("beforeend", renderGalleryMarkup(images));
  lightbox.refresh();
  scrollToImages();
}

function showLoadMoreButton() {
  document.querySelector(".load-more").style.display = "block";
}

function hideLoadMoreButton() {
  document.querySelector(".load-more").style.display = "none";
}

function showNoMoreImagesMessage() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",
    position: "topRight",
    timeout: 3000,
  });
}

function scrollToImages() {
  window.scrollBy({
    top:
      document.querySelector(".gallery-item").getBoundingClientRect().height *
      2,
    behavior: "smooth",
  });
}
