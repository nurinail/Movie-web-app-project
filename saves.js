const savesBanner=document.getElementById("saves_banner_movies");
// console.log(savesBanner)
let savesAllData = JSON.parse(localStorage.getItem("bookmarksData")) || [];
getScreen(savesAllData);
function getScreen(data){
    savesBanner.innerHTML=data.map(data=>(
`
 <div class="recommended_banner_movies_item">
    <div class="recommended_banner_movies_item_img">
        <img class="recommended_banner_movies_item_img_item" src="images/movie/${data.imgSrc}" alt="img">
        <button class="recommended_banner_movies_item_img_bookmarkBtn"  data-id=${data.id}>
            <i class="recommended_banner_movies_item_img_bookmarkBtn_icon fa-solid fa-bookmark"></i>
        </button>
    </div>
    <div class="recommended_banner_movies_item_about">
        <ul class="recommended_banner_movies_item_about_info">
            <li class="recommended_banner_movies_item_about_info_item">${data.year}</li>
            <li class="recommended_banner_movies_item_about_info_item"><i class="fa-solid fa-film"></i> ${data.type}</li>
            <li class="recommended_banner_movies_item_about_info_item">${data.category}</li>
        </ul>
        <h2 class="recommended_banner_movies_item_about_name">${data.name}</h2>
    </div>
</div>
`
    )).join("");
    let bookmarkBtn=document.querySelectorAll(".recommended_banner_movies_item_img_bookmarkBtn");
    bookmarkBtn.forEach(btn=>{
        btn.addEventListener("click",(e)=>{
            e.preventDefault();
            savesAllData=savesAllData.filter(data=>data.id!=btn.dataset.id);
            localStorage.setItem("bookmarksData", JSON.stringify(savesAllData));
            getScreen(savesAllData);
        })
    })
};
