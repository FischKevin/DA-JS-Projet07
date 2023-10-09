import { searchByTags } from './searchTag.js';

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
  if (!type) {
    return;
  }

  if (!selectedTags[type]) {
    return;
  }

  if (addedTags.has(content)) {
    return;
  }
  const tagsContainer = document.querySelector('.addedTags');
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = content;
  addedTags.add(content);

  newTag.dataset.type = type;

  newTag.addEventListener('click', () => {
    removeTag(newTag, content, type);
  });

  tagsContainer.appendChild(newTag);

  selectedTags[type].push(content.toLowerCase());
  const event = new CustomEvent('tagAdded', { detail: { content, type } }); // transmettez le type et le contenu en tant que détail
  document.dispatchEvent(event);
}

// Remove a tag from the list of selected tags
function removeTag(tagElement, content, type) {
  tagElement.remove();
  addedTags.delete(content);

  const index = selectedTags[type].indexOf(content.toLowerCase());
  if (index > -1) {
    selectedTags[type].splice(index, 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
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
function setupDropdownFilter(inputId, listId) {
  const searchInput = document.getElementById(inputId);
  const itemList = document.getElementById(listId);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    Array.from(itemList.children).forEach((li) => {
      const itemText = li.textContent.trim().toLowerCase();
      const isVisible = itemText.includes(query);

      li.style.display = isVisible ? '' : 'none';
    });
  });
}
