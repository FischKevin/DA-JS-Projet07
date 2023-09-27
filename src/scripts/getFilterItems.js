import { recipes } from './recipes.js';

function populateDropdown(ulSelector, itemsSet) {
  const ulElement = document.querySelector(ulSelector);
  ulElement.innerHTML = '';

  itemsSet.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ulElement.appendChild(li);
  });
}

export function getIngredientsOptions() {
  let ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient);
    });
  });

  populateDropdown(
    '#dropdownSearchIngredients + .fa-solid + ul',
    ingredientsSet,
  );
}

export function getApparelsOptions() {
  let appliancesSet = new Set();
  recipes.forEach((recipe) => {
    appliancesSet.add(recipe.appliance);
  });

  populateDropdown('#dropdownSearchAppareils + .fa-solid + ul', appliancesSet);
}

export function getUstensilsOptions() {
  let ustensilsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet.add(ustensil);
    });
  });

  populateDropdown('#dropdownSearchUstensiles + .fa-solid + ul', ustensilsSet);
}
