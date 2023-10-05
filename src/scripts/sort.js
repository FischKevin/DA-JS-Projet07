import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { capitalizeFirstLetter } from './getFilterItems.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length >= 3) {
      const matchedRecipes = searchRecipes(query);
      updateRecipeSection(matchedRecipes);
    } else {
      updateRecipeSection(recipes);
    }
  });
});

function updateRecipeCount(matchedRecipes) {
  const recipesNumberDiv = document.querySelector('.recipesNumber');
  recipesNumberDiv.textContent = `${matchedRecipes.length} recettes`;
}

export function searchRecipes(query) {
  return recipes.filter((recipe) => {
    const { name, ingredients, description } = recipe;
    return (
      name.toLowerCase().includes(query) ||
      ingredients.some((ing) => ing.ingredient.toLowerCase().includes(query)) ||
      description.toLowerCase().includes(query)
    );
  });
}

export function updateRecipeSection(matchedRecipes) {
  const recipeSection = document.querySelector('.recipeSection');
  recipeSection.innerHTML = '';

  matchedRecipes.forEach((recipe) => {
    const recipeCard = recipesFactory(recipe);
    recipeSection.appendChild(recipeCard);
  });
  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}

function updateListOptions(matchedRecipes) {
  const ingredientsSet = new Set();
  const ustensilesSet = new Set();
  const appareilsSet = new Set();

  matchedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient);
    });
    recipe.ustensils.forEach((ustensiles) => {
      ustensilesSet.add(ustensiles);
    });
    appareilsSet.add(recipe.appliance);
  });

  updateListElement(document.getElementById('ingredientsList'), ingredientsSet);
  updateListElement(document.getElementById('ustensilesList'), ustensilesSet);
  updateListElement(document.getElementById('appareilsList'), appareilsSet);
}

function updateListElement(listElement, itemsSet) {
  if (!listElement) {
    console.error('List element not found!');
    return;
  }

  listElement.innerHTML = '';

  // Convert itemsSet to an array, sort it, and capitalize the first letter of each item
  const sortedItems = Array.from(itemsSet).map(capitalizeFirstLetter).sort();

  sortedItems.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    listElement.appendChild(liElement);
  });
}
