import { recipes } from './recipes.js';
import { updateRecipeSection, searchRecipes } from './searchMain.js';
import { currentSearchQuery } from './searchMain.js';

// Filter recipes based on selected tags
export function searchByTags() {
  let selectedTags = document.querySelectorAll('.tag');
  let recipesToDisplay = [];

  // Iterate over all recipes
  recipes.forEach((recipeData) => {
    let allTagsFound = true;

    // Check each selected tag against the current recipe's data
    selectedTags.forEach((selectedTag) => {
      let tagType = selectedTag.dataset.type;
      let tagValue = selectedTag.textContent.trim().toLowerCase();

      // Switch statement to handle different tag types.
      switch (tagType) {
        case 'ingredient': {
          let ingredientNames = recipeData.ingredients.map((ing) =>
            ing.ingredient.trim().toLowerCase(),
          );
          // If this recipe doesn't contain the ingredient, mark as not all tags found.
          if (!ingredientNames.includes(tagValue)) allTagsFound = false;
          break;
        }
        case 'ustensil': {
          let isUstensilFound = recipeData.ustensils.some(
            (ustensil) =>
              ustensil.trim().toLowerCase() === tagValue.trim().toLowerCase(),
          );
          if (!isUstensilFound) allTagsFound = false;
          break;
        }
        case 'appliance': {
          if (
            recipeData.appliance.trim().toLowerCase() !==
            tagValue.trim().toLowerCase()
          ) {
            allTagsFound = false;
          }
          break;
        }
      }
    });

    // If all selected tags are found in this recipe, add it to the display list
    if (allTagsFound) {
      recipesToDisplay.push(recipeData);
    }
  });

  // If there is an active search query (at least 3 characters), filter the recipes
  if (currentSearchQuery && currentSearchQuery.length >= 3) {
    recipesToDisplay = searchRecipes(currentSearchQuery, recipesToDisplay);
  }

  // Update the UI to display the filtered recipes.
  updateRecipeSection(recipesToDisplay);
}
