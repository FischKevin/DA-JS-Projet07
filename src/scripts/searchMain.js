import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    const matchedRecipes = query.length >= 3 ? searchRecipes(query) : recipes;
    updateRecipeSection(matchedRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query) {
  const searchTerms = query.split(' ');

  return recipes.filter((recipe) => {
    const { name, ingredients, description } = recipe;

    let searchableText = [name, description]
      .concat(ingredients.map((ing) => ing.ingredient))
      .join(' ')
      .toLowerCase();

    return searchTerms.every((term) => searchableText.includes(term));
  });
}

// Update the recipe section with the matched recipes
export function updateRecipeSection(matchedRecipes) {
  if (!matchedRecipes) {
    console.error('matchedRecipes est indéfini');
    return;
  }

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
