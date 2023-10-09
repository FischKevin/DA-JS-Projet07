import { recipes } from './recipes.js';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function populateDropdown(ulSelector, itemsSet, type) {
  const ulElement = document.querySelector(ulSelector);
  ulElement.innerHTML = '';

  itemsSet.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.setAttribute('data-type', type);
    ulElement.appendChild(li);
  });
}

export function getIngredientsOptions() {
  let ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });
  });

  ingredientsSet = new Set(
    [...ingredientsSet]
      .map(capitalizeFirstLetter)
      .sort((a, b) => a.localeCompare(b, 'fr')),
  );

  populateDropdown(
    '#dropdownSearchIngredients + .fa-solid + ul',
    ingredientsSet,
    'ingredient',
  );
}

export function getAppliancesOptions() {
  let appliancesSet = new Set();

  recipes.forEach((recipe) => {
    appliancesSet.add(recipe.appliance.toLowerCase());
  });

  appliancesSet = new Set(
    [...appliancesSet]
      .map(capitalizeFirstLetter)
      .sort((a, b) => a.localeCompare(b, 'fr')),
  );

  populateDropdown(
    '#dropdownSearchAppareils + .fa-solid + ul',
    appliancesSet,
    'appliance',
  );
}

export function getUstensilsOptions() {
  let ustensilsSet = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil.toLowerCase());
    });
  });

  ustensilsSet = new Set(
    [...ustensilsSet]
      .map(capitalizeFirstLetter)
      .sort((a, b) => a.localeCompare(b, 'fr')),
  );

  populateDropdown(
    '#dropdownSearchUstensiles + .fa-solid + ul',
    ustensilsSet,
    'ustensil',
  );
}
