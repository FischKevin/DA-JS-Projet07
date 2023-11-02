import { recipes } from './recipes.js';
import { capitalizeFirstLetter } from './utils.js';

// Populate dropdown list with elements
function populateDropdown(ulSelector, itemsSet, type) {
  const ulElement = document.querySelector(ulSelector);
  ulElement.textContent = '';

  // For each item in the provided set, create a new list item (li) and append it to the ul
  itemsSet.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.setAttribute('data-type', type);
    ulElement.appendChild(li);
  });
}

// Get ingredients options for dropdown menu
export function getIngredientsOptions() {
  // Create a new Set to store ingredients
  let ingredientsSet = new Set();
  // Loop through all recipes
  recipes.forEach((recipe) => {
    // For each recipe, loop through its ingredients
    recipe.ingredients.forEach((ingredient) => {
      // Add the ingredient name to the set
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });
  });

  // Convert the set to an array
  ingredientsSet = new Set(
    [...ingredientsSet]
      // transform each element,
      .map(capitalizeFirstLetter)
      // then sort it
      .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
  );
  // Calls the function to fill the ingredients dropdown with items from the set
  populateDropdown(
    '#dropdownSearchIngredients + .fa-solid + ul',
    ingredientsSet,
    'ingredient',
  );
}

// Get appliances options for dropdown menu
export function getAppliancesOptions() {
  // Create a new Set to store appliances
  let appliancesSet = new Set();

  // Loop through all recipes and extracting appliance information
  recipes.forEach((recipe) => {
    appliancesSet.add(recipe.appliance.toLowerCase());
  });

  // Convert the set to an array
  appliancesSet = new Set(
    [...appliancesSet]
      // transform each element,
      .map(capitalizeFirstLetter)
      // then sort it
      .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
  );

  // Calls the function to fill the appliances dropdown with items from the set
  populateDropdown(
    '#dropdownSearchAppareils + .fa-solid + ul',
    appliancesSet,
    'appliance',
  );
}

// Get ustensils options for dropdown menu
export function getUstensilsOptions() {
  // Create a new Set to store ustensils
  let ustensilsSet = new Set();

  // Loop through all recipes and extracting ustensils information
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });
  });

  // Convert the set to an array
  ustensilsSet = new Set(
    [...ustensilsSet]
      // transform each element,
      .map(capitalizeFirstLetter)
      // then sort it
      .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })),
  );

  // Calls the function to fill the ustensils dropdown with items from the set
  populateDropdown(
    '#dropdownSearchUstensiles + .fa-solid + ul',
    ustensilsSet,
    'ustensil',
  );
}
