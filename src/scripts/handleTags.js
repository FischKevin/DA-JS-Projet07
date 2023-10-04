document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdownContent ul li').forEach((item) => {
    item.addEventListener('click', () => {
      addTag(item.textContent);
    });
  });
});

export function addTag(content) {
  const tagsContainer = document.querySelector('.addedTags');
  const newTag = document.createElement('div');
  newTag.className = 'tag';
  newTag.textContent = content;

  newTag.addEventListener('click', () => {
    newTag.remove();
  });

  tagsContainer.appendChild(newTag);
}
