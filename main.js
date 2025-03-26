import { data } from "./data.js";
let indexBanner = document.querySelector(".index_banner_movies");
const searchFormInput = document.getElementById("searchForm_input");
let moviesData = JSON.parse(localStorage.getItem("bookmarksData")) || [];

getScreen(data);
function getScreen(data) {
  indexBanner.innerHTML = data
    .map((movie) => {
      let isBookmarked = moviesData.some((item) => item.id === movie.id);
      return `
         <div class="recommended_banner_movies_item" data-id=${movie.id}>
            <div class="recommended_banner_movies_item_img">
                <img class="recommended_banner_movies_item_img_item" src="images/movie/${
                  movie.imgSrc
                }" alt="img">
                <button class="recommended_banner_movies_item_img_bookmarkBtn" data-id=${
                  movie.id
                }>
                    <i class="recommended_banner_movies_item_img_bookmarkBtn_icon fa-${
                      isBookmarked ? "solid" : "regular"
                    } fa-bookmark"></i>
                </button>
            </div>
            <div class="recommended_banner_movies_item_about">
                <ul class="recommended_banner_movies_item_about_info">
                    <li class="recommended_banner_movies_item_about_info_item">${
                      movie.year
                    }</li>
                    <li class="recommended_banner_movies_item_about_info_item"><i class="fa-solid fa-film"></i> ${
                      movie.type
                    }</li>
                    <li class="recommended_banner_movies_item_about_info_item">${
                      movie.category
                    }</li>
                </ul>
                <h2 class="recommended_banner_movies_item_about_name">${
                  movie.name
                }</h2>
            </div>
        </div>
        `;
    })
    .join("");
  attachBookmarkEvents();
}
searchFormInput.addEventListener("input", (e) => {
  e.preventDefault();
  let inputValue = searchFormInput.value.trim().toLowerCase();
  const filterData = data.filter((movie) =>
    movie.name.trim().toLowerCase().includes(inputValue)
  );
  getScreen(filterData);
});

function attachBookmarkEvents() {
  let bookmarkBtn = document.querySelectorAll(
    ".recommended_banner_movies_item_img_bookmarkBtn"
  );
  bookmarkBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let movie = data.find((movie) => movie.id == btn.dataset.id);
      const bookmark = btn.children[0];
      if (bookmark.classList.contains("fa-solid")) {
        bookmark.classList.remove("fa-solid");
        bookmark.classList.add("fa-regular");
        moviesData = moviesData.filter((item) => item.id !== movie.id);
      } else {
        bookmark.classList.remove("fa-regular");
        bookmark.classList.add("fa-solid");
        moviesData.push(movie);
      }
      localStorage.setItem("bookmarksData", JSON.stringify(moviesData));
    });
  });
}
