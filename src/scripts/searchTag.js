import { recipes } from './recipes.js';
import { applyFilters } from './searchMain.js';

export let filteredRecipesState = {
  filteredRecipesByTags: [],
};

// Filter recipes based on selected tags
export function searchByTags() {
  let selectedTags = document.querySelectorAll('.tag');
  let recipesToDisplay = [];

  if (selectedTags.length === 0) {
    filteredRecipesState.filteredRecipesByTags = recipes;
    applyFilters();
    return recipes;
  }

  // Itereate over each recipe
  recipes.forEach((recipeData) => {
    let allTagsFound = true;

    // Check each selected tag to see if it is found in the current recipe
    selectedTags.forEach((selectedTag) => {
      let tagType = selectedTag.dataset.type;
      let tagValue = selectedTag.textContent.trim().toLowerCase();

      switch (tagType) {
        case 'ingredient': {
          let ingredientNames = recipeData.ingredients.map((ing) =>
            ing.ingredient.trim().toLowerCase(),
          );
          if (!ingredientNames.includes(tagValue)) allTagsFound = false;
          break;
        }
        case 'ustensil': {
          let isUstensilFound = recipeData.ustensils.some(
            (ustensil) => ustensil.trim().toLowerCase() === tagValue,
          );
          if (!isUstensilFound) allTagsFound = false;
          break;
        }
        case 'appliance': {
          if (recipeData.appliance.trim().toLowerCase() !== tagValue) {
            allTagsFound = false;
          }
          break;
        }
      }
    });

    // If all tags are found, add the recipe to the list of recipes to display
    if (allTagsFound) {
      recipesToDisplay.push(recipeData);
    }
  });

  // Update the filtered recipes state
  filteredRecipesState.filteredRecipesByTags = recipesToDisplay;

  // Apply the filters
  applyFilters();

  return recipesToDisplay;
}
