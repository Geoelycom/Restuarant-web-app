import Search from './models/Search.js';
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
	// console.log(query)

	if (query) {
		//2) search new object and add to state
		state.searchItem = new Search(query)

		//3) prepare UI for results
		searchView.clearInput()
		searchView.clearResult()
		renderLoader(elements.searchResLoader)
		//4) search for recipes from user inputs
		await state.searchItem.fetchData()


		//5) Render results to the UI
		clearLoader()
		searchView.renderResults(state.searchItem.result);


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


