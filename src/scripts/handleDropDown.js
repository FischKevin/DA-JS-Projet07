import { capitalizeFirstLetter } from './utils.js';

// Update the dropdown lists with the matched recipes
export function updateListOptions(matchedRecipes) {
  const ingredientsSet = new Set();
  const ustensilesSet = new Set();
  const appareilsSet = new Set();

  matchedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });
    recipe.ustensils.forEach((ustensiles) => {
      ustensilesSet.add(ustensiles.toLowerCase());
    });
    appareilsSet.add(recipe.appliance.toLowerCase());
  });

  updateListElement(
    document.getElementById('ingredientsList'),
    ingredientsSet,
    'ingredient',
  );
  updateListElement(
    document.getElementById('ustensilesList'),
    ustensilesSet,
    'ustensil',
  );
  updateListElement(
    document.getElementById('appareilsList'),
    appareilsSet,
    'appliance',
  );
}

// Update the dropdown list with the elements of the matched recipes
export function updateListElement(listElement, itemsSet, itemType) {
  if (!listElement) {
    return;
  }

  listElement.innerHTML = '';

  // Convert itemsSet to an array, sort it, and capitalize the first letter of each item
  const sortedItems = Array.from(itemsSet).map(capitalizeFirstLetter).sort();

  sortedItems.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.textContent = item;

    // Adding data-type attribute
    liElement.setAttribute('data-type', itemType);

    listElement.appendChild(liElement);
  });
}
