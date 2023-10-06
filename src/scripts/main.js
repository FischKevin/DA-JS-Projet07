import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { addTag } from './handleTags.js';
import { searchRecipes, updateRecipeSection } from './sort.js';
import { updateRecipeCount, clearSearchFields } from './utils.js';
import { updateListOptions, updateListElement } from './handleDropDown.js';
import {
  getApparelsOptions,
  getIngredientsOptions,
  getUstensilsOptions,
} from './getFilterItems.js';

// Initializes the page with default settings and loads content.
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

// Initializes the page with default settings and loads content.
function initializePage() {
  clearInitialSearchFields();
  populateDropdownOptions();
  displayInitialRecipeCount();
}

// Clears search input fields when the page loads.
function clearInitialSearchFields() {
  document.getElementById('searchInput').value = '';
  clearSearchFields([
    'dropdownSearchIngredients',
    'dropdownSearchUstensiles',
    'dropdownSearchAppareils',
  ]);
}

// Gets filter items and populates the dropdown lists.
function populateDropdownOptions() {
  getIngredientsOptions();
  getApparelsOptions();
  getUstensilsOptions();
}

// Displays the initial number of recipes.
function displayInitialRecipeCount() {
  updateRecipeCount();
}
