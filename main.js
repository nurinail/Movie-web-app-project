import {data} from './data.js';
let indexBanner=document.querySelector(".index_banner_movies");
const searchFormInput=document.getElementById("searchForm_input");
const allDataBtn=document.querySelector("#allDataBtn");
const salesDataBtn=document.querySelector('#salesDataBtn');
let moviesData=[];
getScreen(data);

function getScreen(data){
    indexBanner.innerHTML=data.map((data)=>(
        `
         <div class="recommended_banner_movies_item" data-id=${data.id}>
            <div class="recommended_banner_movies_item_img">
                <img class="recommended_banner_movies_item_img_item" src="images/movie/${data.imgSrc}" alt="img">
                <button class="recommended_banner_movies_item_img_bookmarkBtn" data-id=${data.id}>
                    <i class="recommended_banner_movies_item_img_bookmarkBtn_icon fa-regular fa-bookmark"></i>
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
    )).join("")
}
searchFormInput.addEventListener("input",(e)=>{
    e.preventDefault();
    let inputValue=searchFormInput.value.trim().toLowerCase();
    const filterData=data.filter((data)=>data.name.trim().toLowerCase().includes(inputValue));
    getScreen(filterData);
});

let bookmarkBtn=document.querySelectorAll(".recommended_banner_movies_item_img_bookmarkBtn");
bookmarkBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        let movie=data.find(movie=>movie.id==btn.dataset.id);
        const bookmark=btn.children[0];
        if (bookmark.classList.contains("fa-solid")) {
            bookmark.classList.remove("fa-solid");
            moviesData=moviesData.filter((item)=>item.id!==movie.id);
            console.log(moviesData)

        }else{
            bookmark.classList.add("fa-solid");
            moviesData.push(movie)
            console.log(moviesData)
        }
        localStorage.setItem("bookmarksData",JSON.stringify(moviesData))
    })
})

