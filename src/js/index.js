import Search from './models/Search.js';
import Recipe from './models/Recipe.js'
import * as searchView from './views/searchView.js';
import { elements, renderLoader, clearLoader } from './views/base'
// Global app controller
/** Global state of the App
	* - Search object
	*- current recipe object
	*- shopping list object
	*- liked recipes
	*/

const state = {};




const controlSearch = async () => {
	// 1) get query from view
	const query = searchView.getInput() //todo later
	if (query) {
		//2) search new object and add to state
		state.searchItem = new Search(query)
		//3) prepare UI for results
		searchView.clearInput()
		searchView.clearResult()
		renderLoader(elements.searchResLoader)
		//4) search for recipes from user inputs
		try {
			await state.searchItem.fetchData()
			//5) Render results to the UI
			clearLoader()
			searchView.renderResults(state.searchItem.result);
		} catch (error) {
			alert('error processing main recipe data')
			clearLoader()
		}
	}

}


elements.form.addEventListener('submit', (e) => {
	e.preventDefault()
	controlSearch()
})

elements.searchResultPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline')
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10)
		searchView.clearResult()
		searchView.renderResults(state.searchItem.result, goToPage);
	}
})

/** Recipe controller */

const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	console.log(id)
	if (id) {
		//prepare UI for Id

		//create a new object based on id
		state.recipe = new Recipe(id);

		try {
			//get recipe data and Parse Ingredients
			await state.recipe.fetchRecipeId()
			console.log(state.recipe.ingredients)
			state.recipe.parseIngredients()


			//calc time and servings
			state.recipe.calcTime()
			state.recipe.calcServings()


			// render recipe
			console.log(state.recipe)
		} catch (error) {
			alert('error processing recipe')
		}

	}
};

//using same event function for multiple clicks event
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));