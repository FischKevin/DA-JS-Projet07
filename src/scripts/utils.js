export function updateRecipeCount() {
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
}

// Clear search field
export function clearSearchFields(inputIds) {
  inputIds.forEach((id) => {
    const inputElement = document.getElementById(id);
    if (inputElement) {
      inputElement.value = '';
    }
  });
}

// Capitalize first letter
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
