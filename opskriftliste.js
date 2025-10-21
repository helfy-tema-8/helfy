console.log("Hej fra din far");
const mealType = new URLSearchParams(window.location.search).get("mealType");
const mealTypeContainer = document.querySelector(".mealTypeContainer");
let allData;
getData("https://dummyjson.com/recipes");
document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", filterKlik);
});

function filterKlik(evt) {
  showFiltered(evt.currentTarget.dataset.mealType);
}

function showFiltered(filter) {
  if (filter == "All") {
    showMealType(allData);
  } else {
    const filteredMealType = allData.filter((recipe) => recipe.mealType === filter);
    showMealType(filteredMealType);
  }

  console.log("showFiltered", filter);
  // console.log(allData.filter((prod) => prod.gender === filter));
}

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data.recipes;
      showMealType(allData);
    });
}

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
