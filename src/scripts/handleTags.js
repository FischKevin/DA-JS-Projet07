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
  console.log('addTag is called with content:', content); // Log 1
  if (addedTags.has(content)) {
    console.log('Tag already added:', content); // Log 2
    return;
  }

  const tagsContainer = document.querySelector('.addedTags');
  console.log('tagsContainer:', tagsContainer); // Log 3
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = content;
  addedTags.add(content);

  newTag.addEventListener('click', () => {
    newTag.remove();
    addedTags.delete(content);
  });
  console.log('Appending new tag:', newTag); // Log 4
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
