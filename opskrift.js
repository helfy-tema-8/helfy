console.log("Single view loaded");

// Hent id fra URL’en (fx ?id=12)
const recipeId = new URLSearchParams(window.location.search).get("id");
const mealContainer = document.querySelector(".mealContainer");

// Hent ALLE opskrifter (samme API som i listen)
fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    const allRecipes = data.recipes;
    const recipe = allRecipes.find((r) => r.id == recipeId);

    if (recipe) {
      showRecipe(recipe);
    } else {
      mealContainer.innerHTML = `<p>Opskriften blev ikke fundet 😢</p>`;
    }
  })
  .catch((err) => {
    console.error("Fejl ved hentning:", err);
    mealContainer.innerHTML = "<p>Kunne ikke hente opskriften 😢</p>";
  });

function showRecipe(recipe) {
  mealContainer.innerHTML = `
    <article class="singleRecipe">
      <button class="backButton" onclick="window.history.back()">← Tilbage</button>
      <h1>${recipe.name}</h1>
      <img src="${recipe.image}" alt="${recipe.name}" />
      <p><strong>Type:</strong> ${recipe.mealType.join(", ")}</p>
      <p><strong>Tilberedningstid:</strong> ${recipe.prepTimeMinutes} min</p>
      <p><strong>Ingredienser:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Instruktioner:</strong> ${recipe.instructions}</p>
    </article>
  `;
}
