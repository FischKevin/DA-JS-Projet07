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
  const matchedRecipes = [];
  const searchTerms = query.split(' ');
  // For each recipe, check if all the search terms are found in the recipe name, description, or ingredients
  for (let i = 0; i < recipesToFilter.length; i++) {
    const { name, ingredients, description } = recipesToFilter[i];

    let searchableText = name.toLowerCase() + ' ' + description.toLowerCase();
    // Add all the ingredients to the searchable text
    for (let j = 0; j < ingredients.length; j++) {
      searchableText += ' ' + ingredients[j].ingredient.toLowerCase();
    }

    let allTermsFound = true;
    // Check if all the search terms are found in the searchable text
    for (let j = 0; j < searchTerms.length; j++) {
      const term = searchTerms[j].toLowerCase();

      let termFound = false;
      // Check if the search term is found in the searchable text
      for (let k = 0; k <= searchableText.length - term.length; k++) {
        // If the search term is found, break the loop
        if (searchableText.substring(k, k + term.length) === term) {
          termFound = true;
          break;
        }
      }
      // If the search term is not found, break the loop
      if (!termFound) {
        allTermsFound = false;
        break;
      }
    }
    // If all the search terms are found, add the recipe to the matched recipes
    if (allTermsFound) {
      matchedRecipes.push(recipesToFilter[i]);
    }
  }

  return matchedRecipes;
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
      const recipeCard = recipesFactory(recipe);
      recipeSection.appendChild(recipeCard);
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
