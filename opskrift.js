console.log("Single view loaded");

// Hent id fra URL’en (fx ?id=12)
const recipeId = new URLSearchParams(window.location.search).get("id");
const mealContainer = document.querySelector(".mealContainer");

// Hent alle opskrifter
fetch("https://dummyjson.com/recipes")
  .then((res) => res.json())
  .then((data) => {
    const allRecipes = data.recipes;
    const recipe = allRecipes.find((r) => r.id == recipeId);

    if (recipe) {
      showRecipe(recipe, allRecipes);
    } else {
      mealContainer.innerHTML = `<p>Could not be able to get the recipe 😢</p>`;
    }
  })
  .catch((err) => {
    console.error("Fejl ved hentning:", err);
    mealContainer.innerHTML = "<p>Could not be able to get the recipe 😢</p>";
  });

function showRecipe(recipe, allRecipes) {
  // Tilføj opskrift HTML
  mealContainer.innerHTML = `
    <article class="singleRecipe">
      <button class="backButton" onclick="window.history.back()">← Back</button>

      <div class="opskrift-billede"> 
        <img src="${recipe.image}" alt="${recipe.name}" />
      </div>
      <div class="h1-opskrift-single"> 
        <h1>${recipe.name}</h1>

      </div>  

      <p><strong>Preparation time:</strong> ${recipe.prepTimeMinutes} min</p>

      <div class="grid_1-1">
        <div> 
          <p><strong>Ingredients:</strong></p>
          <ul>
            ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div> 
          <p><strong>Instructions:</strong></p>
          <ol>
            ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </div>
      </div>
              <hr class="stregunder">

      <h1>Other good suggestions:</h1>

      <div class="slider-container">
        <div class="arrow left">&#10094;</div>
        <div class="slider-wrapper">
          <div class="slider" id="suggestion-slider"></div>
        </div>
        <div class="arrow right">&#10095;</div>
      </div>
    </article>
  `;

  // ------------------------
  // Indsæt andre opskrifter i slideren
  // ------------------------
  const slider = document.getElementById("suggestion-slider");
  const suggestions = allRecipes
    .filter((r) => r.id != recipe.id) // Fjern den aktuelle opskrift
    .sort(() => 0.5 - Math.random()) // Bland rækkefølgen
    .slice(0, 6); // Tag fx 6 forslag

  slider.innerHTML = suggestions
    .map(
      (r) => `
      <div class="card">
        <a href="opskrift.html?id=${r.id}">
          <article>
            <h2>${r.name}</h2>
            <img src="${r.image}" alt="${r.name}" width="200" />
            <p>${r.tags ? r.tags.join(", ") : ""}</p>
          </article>
        </a>
      </div>`
    )
    .join("");

  // ------------------------
  // Slider funktionalitet
  // ------------------------
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  const cardWidth = 250;
  const gap = 15;
  const visibleCards = 3;
  let position = 0;

  rightArrow.addEventListener("click", () => {
    const maxPosition = slider.children.length - visibleCards;
    if (position < maxPosition) {
      position++;
      slider.style.transform = `translateX(-${position * (cardWidth + gap)}px)`;
    }
  });

  leftArrow.addEventListener("click", () => {
    if (position > 0) {
      position--;
      slider.style.transform = `translateX(-${position * (cardWidth + gap)}px)`;
    }
  });
}
