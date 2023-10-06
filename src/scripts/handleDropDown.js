import { capitalizeFirstLetter } from './getFilterItems.js';

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

  updateListElement(document.getElementById('ingredientsList'), ingredientsSet);
  updateListElement(document.getElementById('ustensilesList'), ustensilesSet);
  updateListElement(document.getElementById('appareilsList'), appareilsSet);
}

export function updateListElement(listElement, itemsSet) {
  if (!listElement) {
    console.error('List element not found!');
    return;
  }

  listElement.innerHTML = '';

  // Convert itemsSet to an array, sort it, and capitalize the first letter of each item
  const sortedItems = Array.from(itemsSet).map(capitalizeFirstLetter).sort();

  sortedItems.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    listElement.appendChild(liElement);
  });
}
