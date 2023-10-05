import { recipes } from '../recipes.js';

export function recipesFactory(data) {
  const {
    // id,
    image,
    time,
    name,
    description,
    ingredients,
    // servings,
    // appliance,
    // ustensils,
  } = data;

  // Create div element for recipe
  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe');

  // Add an image
  const recipeImg = document.createElement('img');
  recipeImg.src = `assets/recipes/${image}`;
  recipeDiv.appendChild(recipeImg);

  // Add recipe duration
  const recipeDuration = document.createElement('span');
  recipeDuration.classList.add('recipeDuration');
  recipeDuration.textContent = `${time} min`;
  recipeDiv.appendChild(recipeDuration);

  // Add recipe name
  const recipeName = document.createElement('h2');
  recipeName.classList.add('recipeName');
  recipeName.textContent = name;
  recipeDiv.appendChild(recipeName);

  // Add recipe description
  const recipeDescription = document.createElement('div');
  const recipeDescriptionTitle = document.createElement('h3');
  recipeDescriptionTitle.innerText = 'RECETTE';
  recipeDescription.appendChild(recipeDescriptionTitle);

  recipeDescription.classList.add('recipeDescription');
  recipeDescription.appendChild(document.createTextNode(description));
  recipeDiv.appendChild(recipeDescription);

  // Add recipe ingredients
  const recipeIngredients = document.createElement('div');
  const recipeIngredientsTitle = document.createElement('h3');
  recipeIngredientsTitle.innerText = 'INGRÉDIENTS';
  recipeIngredients.appendChild(recipeIngredientsTitle);

  const recipeIngredientsItems = document.createElement('div');
  recipeIngredientsItems.classList.add('recipeIngredientsItems');
  recipeIngredients.appendChild(recipeIngredientsItems);

  // Loop through the ingredients array
  ingredients.forEach((ingredient) => {
    const ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('recipeIngredientsItems');

    const ingredientName = document.createElement('span');
    ingredientName.innerText = ingredient.ingredient;
    ingredientName.classList.add('recipeIngredientsName');

    // Check if there's a quantity and unit, then display them with the ingredient name
    const ingredientQuantity = document.createElement('span');
    ingredientQuantity.classList.add('recipeIngredientsQuantity');
    if (ingredient.quantity && ingredient.unit) {
      ingredientQuantity.innerText = `${ingredient.quantity} ${ingredient.unit}`;
    } else if (ingredient.quantity) {
      ingredientQuantity.innerText = `${ingredient.quantity}`;
    } else {
      ingredientQuantity.innerText = '-';
    }

    ingredientDiv.appendChild(ingredientName);
    ingredientDiv.appendChild(ingredientQuantity);
    recipeIngredients.appendChild(ingredientDiv);
  });

  recipeIngredients.classList.add('recipeIngredients');
  recipeDiv.appendChild(recipeIngredients);

  return recipeDiv;
}

// Create and add recipes cards to recipes section
const recipeSection = document.querySelector('.recipeSection');

recipes.forEach((recipe) => {
  const recipeCard = recipesFactory(recipe);
  recipeSection.appendChild(recipeCard);
});
