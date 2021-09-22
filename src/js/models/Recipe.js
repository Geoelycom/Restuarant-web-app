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

			let { title, image_url, source_url, ingredients, publisher } = recipeId.data.recipe;
			Object.assign(this, { title, image_url, source_url, ingredients, publisher })
		} catch (error) {
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

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
		const unitsShorts = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
		const units = [...unitsShorts, 'kg', 'g']

		const newIngredients = this.ingredients.map(el => {
			// create uniform ingredients
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShorts[i]);
			});
			//remove parenthes from unitsShorts
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			//parse Ingredients into count, unit and ingredient
			const arrIngredients = ingredient.split(' ');
			const unitIndex = arrIngredients.findIndex(elementIng => units.includes(elementIng))

			let objIngredient;
			//there is a unit

			if (unitIndex > -1) {
				const arrCount = arrIngredients.slice(0, unitIndex);
				let count;

				if (arrCount.length === 1) {
					count = eval(arrIngredients[0].replace('-', '+'));
				} else {
					count = eval(arrIngredients.slice(0, unitIndex).join('+'));
				}
				objIngredient = {
					count,
					unit: arrIngredients[unitIndex],
					ingredient: arrIngredients.slice(unitIndex + 1).join(' ')
				};
			}

			else if (parseInt(arrIngredients[0], 10)) {
				//there is no unit but 1st elemet in array is a number
				objIngredient = {
					count: parseInt(arrIngredients[0], 10),
					unit: '',
					ingredient: arrIngredients.slice(1).join(' ')
				}
			}

			else if (unitIndex === -1) {
				// there is no unit and no number in 1st position
				objIngredient = {
					count: 1,
					unit: '',
					ingredient
				}
			}

			return objIngredient;
		});

		this.ingredients = newIngredients;
	}
}