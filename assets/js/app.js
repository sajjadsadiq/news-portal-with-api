// Selector Element
const newsCategoryContainer = document.getElementById("newsCategoryContainer");

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
    categoryNameEl.addEventListener("click", () => {
      fetchNewsCategoryPost(category_id);
    });
  });
};

const fetchNewsCategoryPost = async (categoryId) => {
  console.log(categoryId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();
  console.log(data);
};
fetchCategoryName();
