const recommendBannerMovies = document.querySelector(
  ".recommended_banner_movies"
);
const trendingBannerMovies = document.querySelector(".trending_banner_movies");

//img= data.node.image.url
//movieName= data.node.byline
//movieDate=data.node.date.slice(0,4);

const url =
  "https://imdb8.p.rapidapi.com/news/v2/get-by-category?category=MOVIE&first=20&country=US&language=en-US";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "15be5360d2msh9050f4e5bec6e8fp1b5773jsn4f1444022882",
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
  },
};

async function getData() {
  try {
    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const moviesArr = data.data.news.edges;

        trendingBannerMovies.innerHTML += moviesArr
          .map(
            (data) =>
              `
              <div class="trending_banner_movies_item" style="background-image: url(${
                data.node.image.url
              })">
                        <div class="trending_banner_movies_item_opacity">
                            <div class="trending_banner_movies_item_opacity_save">
                                <button class="trending_banner_movies_item_opacity_save_btn"><i class="trending_banner_movies_item_opacity_save_btn_icon fa-regular fa-bookmark"></i></button>
                            </div>
                            <div class="trending_banner_movies_item_opacity_about">
                                <ul class="trending_banner_movies_item_opacity_about_info">
                                    <li class="trending_banner_movies_item_opacity_about_info_item">${data.node.date.slice(
                                      0,
                                      4
                                    )}</li>
                                    <li class="trending_banner_movies_item_opacity_about_info_item"><i class="fa-solid fa-film"></i> Movie</li>
                                    <li class="trending_banner_movies_item_opacity_about_info_item">PG</li>
                                </ul>
                                <h2 class="trending_banner_movies_item_opacity_about_name">${
                                  data.node.byline
                                }</h2>
                            </div>

                        </div>
                    </div>
                `
          )
          .join("");
      });
  } catch (error) {
    console.error(error);
  }
}
getData();
async function getAll(search) {
  const url = `https://imdb8.p.rapidapi.com/v2/search?searchTerm=${search}&type=NAME&first=20&country=US&language=en-US`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "15be5360d2msh9050f4e5bec6e8fp1b5773jsn4f1444022882",
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options)
    .then((data) => data.json())
    .then((data) => {
      // img=data.node.entity.primaryImage.url
      // name=data.node.entity.nameText.text
      // year=data.node.entity.knownFor.edges[0].node.title.releaseDate.year
      const moviesArr = data.data.mainSearch.edges;
      console.log(moviesArr);
      recommendBannerMovies.innerHTML += moviesArr
        .map(
          (data) =>
            `
            <div class="recommended_banner_movies_item">
                    <div class="recommended_banner_movies_item_img">
                        <img class="recommended_banner_movies_item_img_item" src="${data.node.entity}" alt="img">
                        <button class="recommended_banner_movies_item_img_bookmarkBtn">
                            <i class="recommended_banner_movies_item_img_bookmarkBtn_icon fa-regular fa-bookmark"></i>
                        </button>
                    </div>
                    <div class="recommended_banner_movies_item_about">
                        <ul class="recommended_banner_movies_item_about_info">
                            <li class="recommended_banner_movies_item_about_info_item">${data.node.entity.knownFor}</li>
                            <li class="recommended_banner_movies_item_about_info_item"><i class="fa-solid fa-film"></i> Movie</li>
                            <li class="recommended_banner_movies_item_about_info_item">PG</li>
                        </ul>
                        <h2 class="recommended_banner_movies_item_about_name">${data.node.entity.nameText.text}</h2>
                    </div>
                </div>
            `
        )
        .join("");
    });
}
const searchForm_input = document.getElementById("searchForm_input");
searchForm_input.addEventListener("input", () => {
  let inputValue = searchForm_input.value.trim().toLowerCase();
  getAll(inputValue);
});
// getAll("interstellar")
