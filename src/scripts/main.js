import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { addTag } from './handleTags.js';
import {
  getApparelsOptions,
  getIngredientsOptions,
  getUstensilsOptions,
} from './getFilterItems.js';

// Execute function to get filter items in dropdown lists
getIngredientsOptions();
getApparelsOptions();
getUstensilsOptions();

// Display recipes number
// Select .recipesNumber element
const recipesNumberElement = document.querySelector('.recipesNumber');

// Select all .recipe elements in .recipeSection
const allRecipes = document.querySelectorAll('.recipeSection .recipe');

// Update .recipesNumber element with the number of recipes
if (allRecipes.length === 0) {
  recipesNumberElement.textContent = '0 recette';
} else if (allRecipes.length === 1) {
  recipesNumberElement.textContent = '1 recette';
} else {
  recipesNumberElement.textContent = allRecipes.length + ' recettes';
}
