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
    <img class="opskrift-billede" src="${recipe.image}" alt="${recipe.name}" />
    <button class="backButton" onclick="window.history.back()">← Tilbage</button>
    <div class="h1-opskrift-single"> 
    <h1>${recipe.name}</h1>
    </div>  
    
      <p><strong>Tilberedningstid:</strong> ${recipe.prepTimeMinutes} min</p>
  <div class="grid_1-1">
  <div> 
  <p><strong>Ingredienser:</strong></p>
  <ul>
    ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
  </ul>
</div>
<div> 
  <p><strong>Instruktioner:</strong></p>
  <ol>
    ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
  </ol>
  </div>
</div>
    </article>
  `;
}
