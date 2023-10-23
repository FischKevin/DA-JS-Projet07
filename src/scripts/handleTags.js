import { updateListElement } from './handleDropDown.js';
import { updateRecipeSection } from './searchMain.js';
import { searchByTags } from './searchTag.js';
import { recipes } from './recipes.js';

const addedTags = new Set();
let selectedTags = { ingredient: [], appliance: [], ustensil: [] };

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdownContent ul').forEach((li) => {
    li.addEventListener('click', (event) => {
      const li = event.target;
      const type = li.dataset.type;
      if (li.tagName === 'LI' && !li.classList.contains('selected')) {
        addTag(li.textContent, type);
      }
      searchByTags();
    });
  });
});

// Add a tag to the list of selected tags
export function addTag(content, type) {
  // Exit the function if 'type' is not provided
  if (!type) {
    return;
  }
  // Exit the function if the 'type' does not exist in the 'selectedTags' object
  if (!selectedTags[type]) {
    return;
  }
  // Exit the function if the tag is already added
  if (addedTags.has(content)) {
    return;
  }
  // Element where the tags are displayed
  const tagsContainer = document.querySelector('.addedTags');
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = content;
  addedTags.add(content);

  // Add a 'type' data attribute to identify the tag type
  newTag.dataset.type = type;

  // Add an event listener to the tag for the 'click' event
  newTag.addEventListener('click', () => {
    // When the tag is clicked, it should be removed from the list
    removeTag(newTag, content, type);
  });

  tagsContainer.appendChild(newTag);
  // Add the tag content to the appropriate array in the 'selectedTags' object
  selectedTags[type].push(content.toLowerCase());
  // Dispatch a custom event to notify that a tag has been added, passing details along
  const event = new CustomEvent('tagAdded', { detail: { content, type } });
  document.dispatchEvent(event);
}

// Remove a tag from the list of selected tags
function removeTag(tagElement, content, type) {
  tagElement.remove();
  addedTags.delete(content);
  // Find the index of the tag content in the appropriate array and remove it
  const index = selectedTags[type].indexOf(content.toLowerCase());
  if (index > -1) {
    selectedTags[type].splice(index, 1);
  }
  // Update the list element and recipe section in the UI
  updateListElement();
  updateRecipeSection(recipes);
  // Re-run the search with the updated list of tags
  searchByTags();
}

document.addEventListener('DOMContentLoaded', () => {
  // Set up the filter functionality for each dropdown
  setupDropdownFilter('dropdownSearchIngredients', 'ingredientsList');
  setupDropdownFilter('dropdownSearchUstensiles', 'ustensilesList');
  setupDropdownFilter('dropdownSearchAppareils', 'appareilsList');
});

/**
 * Set up a filter functionality for a dropdown.
 *
 * @param {string} inputId - The ID of the input element.
 * @param {string} listId - The ID of the ul list element.
 */
// Function to enable live search for dropdown lists
function setupDropdownFilter(inputId, listId) {
  const searchInput = document.getElementById(inputId);
  const itemList = document.getElementById(listId);
  // Add an 'input' event listener to the search field
  searchInput.addEventListener('input', () => {
    // Get the search query, trimmed and in lower case
    const query = searchInput.value.trim().toLowerCase();

    // For each list item in the dropdown
    Array.from(itemList.children).forEach((li) => {
      // Text content of the list item, trimmed and in lower case
      const itemText = li.textContent.trim().toLowerCase();
      const isVisible = itemText.includes(query);

      // If the item should be visible, reset the display style, else hide it.
      li.style.display = isVisible ? '' : 'none';
    });
  });
}
