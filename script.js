const searchBtn = document.getElementById("search-btn");
const foodList = document.getElementById("food");
const foodDetailsContent = document.querySelector(".food-details-content");
const foodClodeBtn = document.getElementById("recipe-close-btn");

searchBtn.addEventListener("click", getMealList);
foodList.addEventListener("click", getMealRecipe);
foodClodeBtn.addEventListener("click", () => {
  foodDetailsContent.parentElement.classList.remove("showFood");
});

function getMealList() {
  let searchInputText = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="food-item" data-id= "${meal.idMeal}">
                <div class="food-img">
                  <img src= "${meal.strMealThumb}" alt="food" />
                </div>
                <div class="food-name">
                  <h3>${meal.strMeal}</h3>
                  <a href="#" class="food-btn">Get Recipe </a>
                </div>
              </div>
              `;
        });
        foodList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any food!";
        foodList.classList.add("notFound");
      }
      foodList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("food-btn")) {
    let foodItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        mealRecipeModal(data.meals);
      });
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
  <h2 class="food-title">${meal.strMeal}</h2>
            <p class="food-category">${meal.strCategory}</p>
            <div class="food-instruct">
              <h3>Instructions:</h3>
              <p>${meal.strInstructions}</p>
            </div>
            <div class="food-recipe-img">
              <img src="${meal.strMealThumb}">
            </div>
            <div class="recipe-link">
              <a href="${meal.strYoutube}" target="_blank">Watch video</a>
            </div>
  `;
  foodDetailsContent.innerHTML = html;
  foodDetailsContent.parentElement.classList.add("showFood");
}
