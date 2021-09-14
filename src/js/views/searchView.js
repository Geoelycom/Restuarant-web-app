import { elements } from './base';
export const getInput = () => elements.inputElement.value;

export const clearInput = () => {
	elements.inputElement.value = '';
}
export const clearResult = () => {
	elements.searchResultList.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle.push(cur)
			}
			return acc + cur.length;
		}, 0)
		// return result of the acc
		return `${newTitle.join(' ')}...`
	}
	return title;
}

const renderRecipes = recipe => {
	let markup = '';
	markup += `
									<li>
									<a class="results__link" href="#${recipe.recipe_id}">
													<figure class="results__fig">
																	<img src="${recipe.image_url}" alt="${recipe.title}">
													</figure>
													<div class="results__data">
																	<h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
																	<p class="results__author">${recipe.publisher}</p>
													</div>
									</a>
								</li>
`;
	elements.searchResultList.insertAdjacentHTML('beforeend', markup);

}

export const renderResults = recipes => {
	recipes.forEach(renderRecipes)
}
