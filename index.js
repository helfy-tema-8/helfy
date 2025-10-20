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

function createCategories(data) {
  const allowedMealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"]; // rækkefølge

  // Tøm containeren først
  categoryContainer.innerHTML = "";

  allowedMealTypes.forEach((type) => {
    // Tjek om mindst én opskrift har denne type
    const hasType = data.some((recipe) => recipe.mealType.includes(type));
    if (hasType) {
      const a = document.createElement("a");
      a.href = `opskriftliste.html?mealType=${encodeURIComponent(type)}`;

      const button = document.createElement("button");
      button.textContent = type;
      button.classList.add(type.toLowerCase().replace(/\s+/g, "_")); // gør klasse brugbar

      a.appendChild(button);
      categoryContainer.appendChild(a);
    }
  });
}
