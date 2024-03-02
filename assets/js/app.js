// Selector Element
const newsCategoryContainer = document.getElementById("newsCategoryContainer");
const newsPostContainer = document.getElementById("news-post-container");
const loadingSpinner = document.getElementById("loading_spinner");
const dataNotFound = document.getElementById("data-not-found");

let selectedCategory = "08";

// fetch Categori
const fetchCategoryName = async () => {
  loadingSpinnerFun(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  const newsCategory = data.data.news_category;
  newsCategory.forEach((category) => {
    const { category_name, category_id } = category;

    const categoryNameEl = document.createElement("a");
    categoryNameEl.innerText = category_name;
    categoryNameEl.classList = "news-btn btn";
    newsCategoryContainer.appendChild(categoryNameEl);

    // Add Event Listener
    categoryNameEl.addEventListener("click", () => {
      fetchNewsCategoryPost(category_id);

      // Button background color set
      const newsButtonAll = document.querySelectorAll(".news-btn");
      newsButtonAll.forEach((btn) => {
        btn.classList.remove(
          "bg-green-600",
          "hover:bg-green-500",
          "text-white"
        );
      });
      categoryNameEl.classList.add(
        "bg-green-600",
        "hover:bg-green-500",
        "text-white"
      );
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

  // data not found
  if (newsPost.length === 0) {
    dataNotFound.classList.remove("hidden");
  } else {
    dataNotFound.classList.add("hidden");
  }
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
  loadingSpinnerFun(false);
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

// Loading Spinner
const loadingSpinnerFun = (isTrue) => {
  if (isTrue) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// Function Call
fetchCategoryName();

fetchNewsCategoryPost(selectedCategory);
