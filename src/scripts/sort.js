import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';

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
}
