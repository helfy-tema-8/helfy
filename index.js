console.log("Hej fra index.js");

const categoryContainer = document.querySelector(".category_list_container");
let allData = [];

// Hent data fra dummyjson
getData("https://dummyjson.com/recipes");

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allData = data.recipes;
      createCategories(allData);
    });
}

// Funktion til at finde unikke mealTypes og lave knapper
function createCategories(data) {
  // Lav et sæt til unikke mealType
  const uniqueMealTypes = new Set();

  data.forEach((recipe) => {
    recipe.mealType.forEach((type) => uniqueMealTypes.add(type));
  });

  // Tøm containeren først
  categoryContainer.innerHTML = "";

  // Opret knapper for hver unik mealType
  uniqueMealTypes.forEach((type) => {
    const a = document.createElement("a");
    a.href = `opskriftliste.html?mealType=${encodeURIComponent(type)}`;

    const button = document.createElement("button");
    button.textContent = type;
    button.classList.add(type.toLowerCase().replace(/\s+/g, "_")); // gør klasse brugbar

    a.appendChild(button);
    categoryContainer.appendChild(a);
  });
}
