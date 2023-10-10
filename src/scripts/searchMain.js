import { recipes } from './recipes.js';
import { recipesFactory } from './factories/recipeFactory.js';
import { updateRecipeCount } from './utils.js';
import { updateListOptions } from './handleDropDown.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.header--input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    let matchedRecipes;
    if (query.length >= 3) {
      matchedRecipes = searchRecipes(query);
    } else {
      matchedRecipes = recipes;
    }
    updateRecipeSection(matchedRecipes);
  });
});

// Search recipes by name, ingredients, or description
export function searchRecipes(query) {
  const matchedRecipes = [];
  const searchTerms = query.split(' ');

  for (let i = 0; i < recipes.length; i++) {
    const { name, ingredients, description } = recipes[i];

    let searchableText = name.toLowerCase() + ' ' + description.toLowerCase();

    for (let j = 0; j < ingredients.length; j++) {
      searchableText += ' ' + ingredients[j].ingredient.toLowerCase();
    }

    let allTermsFound = true;
    for (let j = 0; j < searchTerms.length; j++) {
      const term = searchTerms[j].toLowerCase();

      let termFound = false;
      for (let k = 0; k <= searchableText.length - term.length; k++) {
        if (searchableText.substring(k, k + term.length) === term) {
          termFound = true;
          break;
        }
      }

      if (!termFound) {
        allTermsFound = false;
        break;
      }
    }

    if (allTermsFound) {
      matchedRecipes.push(recipes[i]);
    }
  }

  return matchedRecipes;
}

// Check if any ingredient contains the query
// function ingredientContainsQuery(ingredients, query) {
//   for (let i = 0; i < ingredients.length; i++) {
//     if (ingredients[i].ingredient.toLowerCase().includes(query)) {
//       return true;
//     }
//   }
//   return false;
// }

// Update the recipe section with the matched recipes
export function updateRecipeSection(matchedRecipes) {
  // vérifier si matchedRecipes est défini
  if (!matchedRecipes) {
    console.error('matchedRecipes est indéfini');
    return;
  }

  const recipeSection = document.querySelector('.recipeSection');
  recipeSection.innerHTML = '';

  for (let i = 0; i < matchedRecipes.length; i++) {
    const recipeCard = recipesFactory(matchedRecipes[i]);
    recipeSection.appendChild(recipeCard);
  }

  updateRecipeCount(matchedRecipes);
  updateListOptions(matchedRecipes);
}
