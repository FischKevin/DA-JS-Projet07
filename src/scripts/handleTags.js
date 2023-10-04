// JavaScript
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdownContent ul li').forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('selected')) {
        addTag(item.textContent);
        item.classList.add('selected');
      }
    });
  });
});

const addedTags = new Set();

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

    document.querySelectorAll('.dropdownContent ul li').forEach((item) => {
      if (item.textContent === content) {
        item.classList.remove('selected');
      }
    });
  });

  tagsContainer.appendChild(newTag);
}
