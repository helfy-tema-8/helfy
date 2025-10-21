const mealType = new URLSearchParams(window.location.search).get("mealType");
console.log("Hej fra din far", mealType);

const mealTypeContainer = document.querySelector(".mealTypeContainer");
let allData;

// Hent data fra API
getData("https://dummyjson.com/recipes/meal-type/" + mealType);

// Tilføj click events til alle filter-knapper
document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", filterKlik);
});

function filterKlik(evt) {
  const filter = evt.currentTarget.dataset.mealtype; // små t
  console.log("Meal type", filter);
  showFiltered(filter);
}

function showFiltered(filter) {
  if (filter === "All") {
    getData("https://dummyjson.com/recipes/");
  } else {
    getData("https://dummyjson.com/recipes/meal-type/" + filter);
  }
}

// Hent data fra API
function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data.recipes;
      showMealType(allData);
    });
}

// Vis opskrifter på siden
function showMealType(mealTypeArray) {
  mealTypeContainer.innerHTML = "";
  mealTypeArray.forEach((recipe) => {
    mealTypeContainer.innerHTML += `
      <a href="opskrift.html?id=${recipe.id}">
        <article>
          <h2>${recipe.name}</h2>
          <img src="${recipe.image}" alt="${recipe.name}" width="200" />
          <p>${recipe.mealType.join(", ")}</p>
        </article>
      </a>
    `;
  });
}
