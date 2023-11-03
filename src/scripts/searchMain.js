import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';
import { filteredRecipesState } from './searchTag.js';
import { searchByTags } from './searchTag.js';

export let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');
  const tagContainer = document.querySelector('.addedTags');
  searchInput.addEventListener('input', () => {
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  // Add event listener to the tag container to listen for changes
  tagContainer.addEventListener('change', () => {
    // Update the filtered recipes by tags
    let filteredRecipes = searchByTags();
    if (filteredRecipes) {
      filteredRecipesState.filteredRecipesByTags = filteredRecipes;
    }

    // Check if the search query is valid
    if (currentSearchQuery && currentSearchQuery.length >= 3) {
      // Apply the search query to the filtered recipes
      filteredRecipes = searchRecipes(currentSearchQuery, filteredRecipes);
    }

    // Update the recipe section with the filtered recipes
    updateRecipeSection(filteredRecipes);
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
  if (!matchedRecipes) {
    console.error('matchedRecipes is undefined');
    return; // Exit the function if matchedRecipes is undefined
  }
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
      const recipeCard = recipesFactory(recipe);
      recipeSection.appendChild(recipeCard);
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}

// Apply the filters to the recipes
export function applyFilters() {
  let recipesToDisplay = recipes;

  // First apply the tag filter if necessary
  if (filteredRecipesState.filteredRecipesByTags.length > 0) {
    recipesToDisplay = filteredRecipesState.filteredRecipesByTags;
  }

  // Then apply the search query filter if necessary
  if (currentSearchQuery && currentSearchQuery.length >= 3) {
    recipesToDisplay = searchRecipes(currentSearchQuery, recipesToDisplay);
  }

  // Update the recipe section with the filtered recipes
  updateRecipeSection(recipesToDisplay);
}
