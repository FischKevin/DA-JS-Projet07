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
  const searchInput = document.getElementById('dropdownSearchIngredients');
  const ingredientsList = document.getElementById('ingredientsList');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    Array.from(ingredientsList.children).forEach((li) => {
      const ingredient = li.textContent.trim().toLowerCase();
      const isVisible = ingredient.includes(query);

      li.style.display = isVisible ? '' : 'none';
    });
  });
});
