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
  // Tilføj opskrift HTML
  mealContainer.innerHTML = `
    <article class="singleRecipe">
      <button class="backButton" onclick="window.history.back()">← Tilbage</button>

      <div class="opskrift-billede"> 
        <img src="${recipe.image}" alt="${recipe.name}" />
      </div>
      
      <div class="h1-opskrift-single"> 
        <h1>${recipe.name}</h1>
      </div>  

      <p><strong>Tilberedningstid:</strong> ${recipe.prepTimeMinutes} min</p>

      <div class="grid_1-1">
        <div> 
          <p><strong>Ingredienser:</strong></p>
          <ul>
            ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div> 
          <p><strong>Instruktioner:</strong></p>
          <ol>
            ${recipe.instructions.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </div>
      </div>

      <h1>Andre gode forslag:</h1>

      <div class="slider-container">
        <div class="arrow left">&#10094;</div>

        <div class="slider-wrapper">
          <div class="slider">
            <div class="card">1</div>
            <div class="card">2</div>
            <div class="card">3</div>
            <div class="card">4</div>
            <div class="card">5</div>
            <div class="card">6</div>
          </div>
        </div>

        <div class="arrow right">&#10095;</div>
      </div>
    </article>
  `;

  // ------------------------
  // Slider funktionalitet
  // ------------------------
  const slider = document.querySelector(".slider");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  if (!slider || !leftArrow || !rightArrow) return; // sikkerhed

  const cardWidth = 250; // bredde på ét kort
  const gap = 15; // mellemrum mellem kort
  const visibleCards = 3; // hvor mange kort vi viser ad gangen
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
