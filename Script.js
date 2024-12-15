const apiKey = "91913ca2cbdd4119a8a3b7170728cdcf";
const recipeResults = document.getElementById("recipe-results");
const challengeTimer = document.getElementById("challenge-timer");
const challengeRecipe = document.getElementById("challenge-recipe");

function findRecipes() {
const ingredients = document.getElementById("ingredients").value;
if (!ingredients) {
recipeResults.innerHTML = "<p>Please enter some ingredients!</p>";
return;
}
fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`)
.then(response => response.json())
.then(data => {
recipeResults.innerHTML = "";
if (data.length === 0) {
recipeResults.innerHTML = "<p>No recipes found!</p>";
return;
}
data.forEach(recipe => {
recipeResults.innerHTML += `<div><h3>${recipe.title}</h3><img src="${recipe.image}" alt="${recipe.title}" width="150"></div>`;
});
}).catch(error => {
recipeResults.innerHTML = "<p>Failed to fetch recipes. Try again later.</p>";
console.error(error);
});
}

let timer;
let timeLeft = 600;

function startChallenge() {
clearInterval(timer);
timeLeft = 600;
fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`)
.then(response => response.json())
.then(data => {
const recipe = data.recipes[0];
challengeRecipe.innerHTML = `<h3>${recipe.title}</h3><img src="${recipe.image}" alt="${recipe.title}" width="150"><p>${recipe.instructions || "Instructions not available."}</p>`;
}).catch(error => {
challengeRecipe.innerHTML = "<p>Failed to fetch a recipe. Try again later.</p>";
console.error(error);
});
timer = setInterval(() => {
const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;
challengeTimer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
timeLeft--;
if (timeLeft < 0) {
clearInterval(timer);
alert("Time's up! Did you finish your dish?");
}
}, 1000);
}
