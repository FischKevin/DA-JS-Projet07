import { capitalizeFirstLetter } from './utils.js';

// Function to update dropdown lists based on the recipes that matched the search criteria
export function updateListOptions(matchedRecipes) {
  // Create sets to store unique ingredient, utensil, and appliance values.
  const ingredientsSet = new Set();
  const ustensilesSet = new Set();
  const appareilsSet = new Set();

  // Iterate over each recipe that matched the search.
  matchedRecipes.forEach((recipe) => {
    // Add each ingredient from the recipe to the ingredients set.
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.ingredient.toLowerCase());
    });
    // Add each utensil from the recipe to the utensils set
    recipe.ustensils.forEach((ustensiles) => {
      ustensilesSet.add(ustensiles.toLowerCase());
    });
    // Add the appliance from the recipe to the appliances set
    appareilsSet.add(recipe.appliance.toLowerCase());
  });

  // Call a function to update the UI list element for each category
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

  listElement.textContent = '';

  // Convert itemsSet to an array, sort it, and capitalize the first letter of each item
  const sortedItems = Array.from(itemsSet).map(capitalizeFirstLetter).sort();

  // Create and append list items (li elements) for each item in the sorted items list
  sortedItems.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.textContent = item;

    // Add data-type attribute
    liElement.setAttribute('data-type', itemType);

    // Add the created list item to the dropdown list
    listElement.appendChild(liElement);
  });
}
