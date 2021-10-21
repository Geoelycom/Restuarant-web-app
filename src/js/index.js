import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import List from './models/List.js';
import Likes from './models/Likes';
import * as listView from './views/listView.js';
import * as searchView from './views/searchView.js';
import * as recipeView from './views/recipeView.js';
import {
	elements,
	renderLoader,
	clearLoader
} from './views/base';

// Global app controller
/** Global state of the App
 * - Search object
 *- current recipe object
 *- shopping list object
 *- liked recipes
 */

const state = {};
window.state = state;


/*** Search controller ****/
const controlSearch = async () => {
	// 1) get query from view
	const query = searchView.getInput(); //todo later
	if (query) {
		//2) search new object and add to state
		state.searchItem = new Search(query);
		//3) prepare UI for results
		searchView.clearInput();
		searchView.clearResult();
		renderLoader(elements.searchResLoader);
		//4) search for recipes from user inputs
		try {
			await state.searchItem.fetchData();
			//5) Render results to the UI
			clearLoader();
			searchView.renderResults(state.searchItem.result);
		} catch (error) {
			alert('error processing main recipe data');
			clearLoader();
		}
	}

};


elements.form.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResultPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResult();
		searchView.renderResults(state.searchItem.result, goToPage);
	}
});

/** Recipe controller */

const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	if (id) {
		//prepare UI for Id
		recipeView.clearRecipeResult();
		renderLoader(elements.recipeResultPages);

		//Highlight selected from recipe
		if (state.recipeView) searchView.highlightSelected(id);

		//create a new object based on id
		state.recipe = new Recipe(id);
		//get recipe data and Parse Ingredients
		try {
			await state.recipe.fetchRecipeId();

			state.recipe.parseIngredients();

			//calc time and servings
			state.recipe.calcTime();
			state.recipe.calcServings();

			// render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			alert('wrong recipe data');
		}
	}
};

//using same event function for multiple clicks event
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

/** shoppingList controller */

const controlList = () => {
	if (!state.list)
		state.list = new List();

	//add each item to the list and user interface
	state.recipe.ingredients.forEach(el => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderShoppingListItem(item);
	});
};
//Handle delete and update element in shopping list

elements.shoppingRecipeList.addEventListener('click', e => {
	const id = e.target.closest('.shopping__item').dataset.itemid;
	// Handle delete button
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		state.list.deleteItem(id);
		listView.deleteShoppingItem(id);
		//Handle count update
	} else if (e.target.matches('.shopping__count-value')) {
		const val = parseFloat(e.target.value, 10);
		state.list.updateCount(id, val);
	}
});



/** Likes controller */

const controlLike = () => {
	if (!state.likes)
		state.likes = new Likes();
	const currentId = state.recipe.id;

	if (!state.likes.isLiked(currentId)) {
		const newLike = state.likes.addLike(
			currentId,
			state.recipe.title,
			state.recipe.source_url,
			state.recipe.image_url
		);
		console.log(state.likes);

	} else {
		state.likes.deleteLike(currentId); 
		console.log(state.likes);

	}
};







//Handling recipe button clicks
elements.recipeResultPages.addEventListener('click', e => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		//add ingredients to shopping List
		controlList();
	} else if (e.target.matches('.recipe__love, .recipe__love *')) {
		//Like controller function
		controlLike();
	}
	console.log(state.recipe);
});

window.l = new List();