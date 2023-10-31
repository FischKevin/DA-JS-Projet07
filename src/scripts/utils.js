export function updateRecipeCount() {
  const e = document.querySelector('.recipesNumber'),
    t = document.querySelectorAll('.recipeSection .recipe');
  0 === t.length
    ? (e.textContent = '0 recette')
    : 1 === t.length
    ? (e.textContent = '1 recette')
    : (e.textContent = t.length + ' recettes');
}
export function clearSearchFields(e) {
  e.forEach((e) => {
    const t = document.getElementById(e);
    t && (t.value = '');
  });
}
export function capitalizeFirstLetter(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
