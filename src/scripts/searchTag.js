import { recipes } from './recipes.js';
import { updateRecipeSection, searchRecipes } from './searchMain.js';
import { currentSearchQuery } from './searchMain.js';

export function searchByTags() {
  let selectedTags = document.querySelectorAll('.tag');
  let recipesToDisplay = [];

  recipes.forEach((recipeData) => {
    let allTagsFound = true;

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

    if (allTagsFound) {
      recipesToDisplay.push(recipeData);
    }
  });

  // Filtrer avec la requête de recherche si existante
  if (currentSearchQuery && currentSearchQuery.length >= 3) {
    recipesToDisplay = searchRecipes(currentSearchQuery, recipesToDisplay);
  }

  updateRecipeSection(recipesToDisplay);
}
