import { elements } from './base';
export const getInput = () => elements.inputElement.value;

export const clearInput = () => {
	elements.inputElement.value = '';
}
export const clearResult = () => {
	elements.searchResultList.innerHTML = '';
	elements.searchResultPages.innerHTML = '';
}


export const highlightSelected = id => {
	document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
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

const createButton = (page, type) => `
						<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
										<svg class="search__icon">
														<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
										</svg>
															<span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
							</button>

`;

const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);

	let buttons;
	if (page === 1 && pages > 1) {
		buttons = createButton(page, 'next')
	} else if (page < pages) {

		buttons = `
						${createButton(page, 'prev')}
						${createButton(page, 'next')}
						`;

	} else if (page === pages && pages > 1) {
		buttons = createButton(page, 'prev')
	}
	elements.searchResultPages.insertAdjacentHTML('afterbegin', buttons)
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipes)
	renderButtons(page, recipes.length, resPerPage)
};
