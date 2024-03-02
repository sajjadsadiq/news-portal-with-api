// Selector Element
const newsCategoryContainer = document.getElementById("newsCategoryContainer");
const newsPostContainer = document.getElementById("news-post-container");

let selectedCategory = "08";

// fetch Categori
const fetchCategoryName = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const newsCategory = data.data.news_category;
  newsCategory.forEach((category) => {
    const { category_name, category_id } = category;

    const categoryNameEl = document.createElement("a");
    categoryNameEl.innerText = category_name;
    categoryNameEl.classList = "btn";
    newsCategoryContainer.appendChild(categoryNameEl);

    // Add Event Listener
    // console.log(categoryNameEl);
    categoryNameEl.addEventListener("click", () => {
      fetchNewsCategoryPost(category_id);
    });
  });
};

const fetchNewsCategoryPost = async (categoryId) => {
  selectedCategory = categoryId;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  const newsPost = data.data;
  newsPostContainer.innerHTML = "";

  newsPost.forEach((newsItem) => {
    // console.log(newsItem);
    const { thumbnail_url, title, total_view, details, author, _id } = newsItem;
    // console.log(_id);
    const { name, img, published_date } = author;

    // Dynamic News
    const newsPostEl = document.createElement("div");
    newsPost.classList = "";
    newsPostEl.innerHTML = `
    <div class="card card-side bg-base-100 shadow-xl p-6 my-10">
    <figure class="w-4/12"><img class="rounded-xl" src=${thumbnail_url} alt="Movie"/></figure>
    <div class="card-body w-8/12">
      <h2 class="card-title">${title}</h2>
      <p>${details.slice(0, 300)}</p>
      <div class="card-actions items-center justify-between">
        <div class="author-name-image flex items-center justify-center gap-2">
          <img class="rounded-full w-10 h-10" src=${img} alt="">
          <div class="name-time">
            <strong>${name}</strong>
            <p>Jan 10, 2022 </p>
          </div>
        </div>
        <div class="views flex items-center gap-2">
          <img src="./assets/images/carbon_view.svg" alt="">
          <p><span>${total_view}</span>M</p>
        </div>
        <div class="start">
          <img src="./assets/images/star-outlined.svg" alt="">
        </div>
        <button onclick="fetchNewsPostDetails('${_id}')" id="more-btn" class="more_btn cursor-pointer">
          <img src="./assets/images/arrow-right.svg" alt="">
        </button>
      </div>
    </div>
    </div>
    `;
    newsPostContainer.appendChild(newsPostEl);
  });
};

const fetchNewsPostDetails = async (news_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${news_id}`
  );
  const data = await res.json();
  const newsDetails = data.data[0];
  console.log(newsDetails);
};

const handleSearchNews = () => {
  const searchInputField = document.getElementById("searchInputField");

  let searchValue = searchInputField.value;
  // console.log(searchValue);
  if (searchValue) {
    fetchNewsCategoryPost(searchValue);
    // Clear a input field
    searchInputField.value = "";
  } else {
    alert("Please enter a valid search value");
  }
};
// Function Call
fetchCategoryName();
fetchNewsCategoryPost(selectedCategory);
