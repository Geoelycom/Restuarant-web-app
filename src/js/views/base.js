export const elements = {
	form: document.querySelector('.search'),
	inputElement: document.querySelector('.search__field'),
	searchResLoader: document.querySelector('.results'),
	searchResultList: document.querySelector('.results__list'),
	searchResultPages: document.querySelector('.results__pages'),
	recipeResultPages: document.querySelector('.recipe'),
	shoppingRecipeList: document.querySelector('.shopping__list'),
	likesMenu: document.querySelector('.likes__field'),
	likesList : document.querySelector('.likes__list')
};

export const elementStrings = {
	loader: 'loader',
};

export const renderLoader = parent => {
	const loader = `
	<div class="${elementStrings.loader}">
	   <svg>
	    <use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) {
		loader.parentElement.removeChild(loader);
	}
};