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

  // Itérer sur toutes les recettes
  recipes.forEach((recipeData) => {
    let allTagsFound = true;

    // Vérifier chaque tag sélectionné par rapport aux données de la recette courante
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

    // Si tous les tags sélectionnés sont trouvés dans cette recette, ajoutez-la à la liste d'affichage
    if (allTagsFound) {
      recipesToDisplay.push(recipeData);
    }
  });

  // Mettre à jour l'état des recettes filtrées par les tags
  filteredRecipesState.filteredRecipesByTags = recipesToDisplay;

  // Appliquer tous les autres filtres nécessaires (comme le filtre de recherche principal)
  applyFilters();

  return recipesToDisplay;
}
