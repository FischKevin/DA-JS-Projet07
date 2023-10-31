import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';

export let currentSearchQuery = '';

// Handle search input
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    const matchedRecipes =
      currentSearchQuery.length >= 3
        ? // If the search query is at least 3 characters long, search the recipes, else display all recipes
          searchRecipes(currentSearchQuery)
        : recipes;
    updateRecipeSection(matchedRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query, recipesToFilter = recipes) {
  // Split the search query into individual terms
  const searchTerms = query.split(' ');
  // Filter the recipes based on the search terms
  return recipesToFilter.filter(({ name, ingredients, description }) => {
    // Create a searchable text string from the recipe's name, description, and ingredients
    const searchableText =
      [name, description].map((text) => text.toLowerCase()).join(' ') +
      ' ' +
      ingredients.map((ing) => ing.ingredient.toLowerCase()).join(' ');
    // Check if all search terms are included in the searchable text
    return searchTerms.every((term) =>
      searchableText.includes(term.toLowerCase()),
    );
  });
}

// Update the recipe section with the matched recipes
export function updateRecipeSection(matchedRecipes) {
  const recipeSection = document.querySelector('.recipeSection');
  recipeSection.textContent = '';
  // If no recipe is found, display an error message
  if (matchedRecipes.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    errorMessage.textContent = `Aucune recette ne contient ‘${document
      .querySelector('.header--input')
      .value.trim()}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipeSection.appendChild(errorMessage);
    // Else, display the matched recipes
  } else {
    matchedRecipes.forEach((recipe) => {
      recipeSection.appendChild(recipesFactory(recipe));
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
