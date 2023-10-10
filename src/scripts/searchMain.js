import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    let matchedRecipes;
    if (query.length >= 3) {
      matchedRecipes = searchRecipes(query);
    } else {
      matchedRecipes = recipes;
    }
    updateRecipeSection(matchedRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query) {
  const matchedRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const { name, ingredients, description } = recipes[i];
    if (
      name.toLowerCase().includes(query) ||
      ingredientContainsQuery(ingredients, query) ||
      description.toLowerCase().includes(query)
    ) {
      matchedRecipes.push(recipes[i]);
    }
  }
  return matchedRecipes;
}

// Check if any ingredient contains the query
function ingredientContainsQuery(ingredients, query) {
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i].ingredient.toLowerCase().includes(query)) {
      return true;
    }
  }
  return false;
}

// Update the recipe section with the matched recipes
export function updateRecipeSection(matchedRecipes) {
  // vérifier si matchedRecipes est défini
  if (!matchedRecipes) {
    console.error('matchedRecipes est indéfini');
    return;
  }

  const recipeSection = document.querySelector('.recipeSection');
  recipeSection.innerHTML = '';

  for (let i = 0; i < matchedRecipes.length; i++) {
    const recipeCard = recipesFactory(matchedRecipes[i]);
    recipeSection.appendChild(recipeCard);
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
