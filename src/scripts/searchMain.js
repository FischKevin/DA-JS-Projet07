import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';
import { filteredRecipesState } from './searchTag.js';
import { searchByTags } from './searchTag.js';

export let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');
  const tagContainer = document.querySelector('.addedTags');
  searchInput.addEventListener('input', () => {
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    applyFilters(); // Appliquez simplement tous les filtres
  });

  // Ajoutez un écouteur pour les changements de tags
  tagContainer.addEventListener('change', () => {
    // Mettez à jour la liste des recettes filtrées par tags
    let filteredRecipes = searchByTags();
    if (filteredRecipes) {
      filteredRecipesState.filteredRecipesByTags = filteredRecipes;
    }

    // Vérifiez s'il y a une requête de recherche valide dans le champ de recherche principal
    if (currentSearchQuery && currentSearchQuery.length >= 3) {
      // Appliquez la recherche principale aux recettes filtrées par tags
      filteredRecipes = searchRecipes(currentSearchQuery, filteredRecipes);
    }

    // Mettez à jour la section des recettes avec les recettes filtrées
    updateRecipeSection(filteredRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query, recipesToFilter = recipes) {
  const matchedRecipes = [];
  const searchTerms = query.split(' ');
  // For each recipe, check if all the search terms are found in the recipe name, description, or ingredients
  for (let i = 0; i < recipesToFilter.length; i++) {
    const { name, ingredients, description } = recipesToFilter[i];

    let searchableText = name.toLowerCase() + ' ' + description.toLowerCase();
    // Add all the ingredients to the searchable text
    for (let j = 0; j < ingredients.length; j++) {
      searchableText += ' ' + ingredients[j].ingredient.toLowerCase();
    }

    let allTermsFound = true;
    // Check if all the search terms are found in the searchable text
    for (let j = 0; j < searchTerms.length; j++) {
      const term = searchTerms[j].toLowerCase();

      let termFound = false;
      // Check if the search term is found in the searchable text
      for (let k = 0; k <= searchableText.length - term.length; k++) {
        // If the search term is found, break the loop
        if (searchableText.substring(k, k + term.length) === term) {
          termFound = true;
          break;
        }
      }
      // If the search term is not found, break the loop
      if (!termFound) {
        allTermsFound = false;
        break;
      }
    }
    // If all the search terms are found, add the recipe to the matched recipes
    if (allTermsFound) {
      matchedRecipes.push(recipesToFilter[i]);
    }
  }

  return matchedRecipes;
}

// Update the recipe section with the matched recipes
export function updateRecipeSection(matchedRecipes) {
  if (!matchedRecipes) {
    console.error('matchedRecipes is undefined');
    return; // Quitter la fonction si matchedRecipes est indéfini
  }
  const recipeSection = document.querySelector('.recipeSection');
  recipeSection.textContent = '';
  // If no recipe is found, display an error message
  if (matchedRecipes.length === 0) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('errorMessage');
    errorMessage.textContent = `Aucune recette ne contient ‘${document
      .querySelector('.header--input')
      .value.trim()}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    recipeSection.appendChild(errorMessage);
    // Else, display the matched recipes
  } else {
    matchedRecipes.forEach((recipe) => {
      const recipeCard = recipesFactory(recipe);
      recipeSection.appendChild(recipeCard);
    });
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}

// Cette fonction appliquera tous les filtres (recherche principale et tags)
export function applyFilters() {
  let recipesToDisplay = recipes;

  // Appliquez d'abord le filtre des tags
  if (filteredRecipesState.filteredRecipesByTags.length > 0) {
    recipesToDisplay = filteredRecipesState.filteredRecipesByTags;
  }

  // Ensuite, appliquez le filtre de recherche principale si nécessaire
  if (currentSearchQuery && currentSearchQuery.length >= 3) {
    recipesToDisplay = searchRecipes(currentSearchQuery, recipesToDisplay);
  }

  // Mettez à jour la section des recettes avec les recettes filtrées
  updateRecipeSection(recipesToDisplay);
}
