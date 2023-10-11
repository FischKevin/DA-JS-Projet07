import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';

export let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    const matchedRecipes =
      currentSearchQuery.length >= 3
        ? searchRecipes(currentSearchQuery)
        : recipes;
    updateRecipeSection(matchedRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query, recipesToFilter = recipes) {
  const matchedRecipes = [];
  const searchTerms = query.split(' ');

  for (let i = 0; i < recipesToFilter.length; i++) {
    const { name, ingredients, description } = recipesToFilter[i];

    let searchableText = name.toLowerCase() + ' ' + description.toLowerCase();

    for (let j = 0; j < ingredients.length; j++) {
      searchableText += ' ' + ingredients[j].ingredient.toLowerCase();
    }

    let allTermsFound = true;
    for (let j = 0; j < searchTerms.length; j++) {
      const term = searchTerms[j].toLowerCase();

      let termFound = false;
      for (let k = 0; k <= searchableText.length - term.length; k++) {
        if (searchableText.substring(k, k + term.length) === term) {
          termFound = true;
          break;
        }
      }

      if (!termFound) {
        allTermsFound = false;
        break;
      }
    }

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

  if (matchedRecipes.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    errorMessage.textContent = `Aucune recette ne contient ‘${document
      .querySelector('.header--input')
      .value.trim()}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipeSection.appendChild(errorMessage);
  } else {
    matchedRecipes.forEach((recipe) => {
      const recipeCard = recipesFactory(recipe);
      recipeSection.appendChild(recipeCard);
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
