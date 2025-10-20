// BURGER MENU ved tryk på knap
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");

burger.addEventListener("click", burgerClick);
function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
}

menu.addEventListener("click", menuClick);
function menuClick() {
  burger.classList.remove("active");
  nav.classList.remove("active");
}

// LOGIN POPUP Ved tryk på knap
const loginBtn = document.getElementById("loginBtn");
const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginOverlay.classList.add("active");
});

closeLogin.addEventListener("click", () => {
  loginOverlay.classList.remove("active");
});

// Luk popup ved klik udenfor boksen
loginOverlay.addEventListener("click", (e) => {
  if (e.target === loginOverlay) {
    loginOverlay.classList.remove("active");
  }
});
