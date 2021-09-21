import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async fetchRecipeId() {
		try {
			const recipeId = await axios('https://forkify-api.herokuapp.com/api/get', {
				params: {
					rId: this.id
				}
			});
			// this.title = recipeId.data.recipe.title;
			// this.author = recipeId.data.recipe.publisher;
			// this.img = recipeId.data.recipe.img_url;
			// this.url = recipeId.data.recipe.source_url;
			// this.ingredients = recipeId.data.recipe.ingredients;
			let { title, image_url, source_url, ingredients, publisher } = recipeId.data.recipe;
			Object.assign(this, { title, image_url, source_url, ingredients, publisher })
			//console.log(title)
		} catch (error) {
			console.log('wrong response data')
			alert('wrong key')
		}
	}
	calcTime() {
		const numIngredients = this.ingredients.length;
		const periods = Math.ceil(numIngredients / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}
}
