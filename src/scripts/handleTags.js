const addedTags = new Set();

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdownContent ul li').forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('selected')) {
        addTag(item.textContent);
      }
    });
  });
});

export function addTag(content) {
  if (addedTags.has(content)) {
    return;
  }
  const tagsContainer = document.querySelector('.addedTags');
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = content;
  addedTags.add(content);

  newTag.addEventListener('click', () => {
    newTag.remove();
    addedTags.delete(content);
  });
  tagsContainer.appendChild(newTag);
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
