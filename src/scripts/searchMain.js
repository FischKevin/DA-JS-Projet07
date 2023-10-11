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

export function searchRecipes(query, recipesToFilter = recipes) {
  const searchTerms = query.split(' ');

  return recipesToFilter.filter(({ name, ingredients, description }) => {
    const searchableText =
      [name, description].map((text) => text.toLowerCase()).join(' ') +
      ' ' +
      ingredients.map((ing) => ing.ingredient.toLowerCase()).join(' ');

    return searchTerms.every((term) =>
      searchableText.includes(term.toLowerCase()),
    );
  });
}

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
      recipeSection.appendChild(recipesFactory(recipe));
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
