import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async fetchData() {
		try {
			const response = await axios('https://forkify-api.herokuapp.com/api/search', {
				params: {
					q: this.query
				}
			});
			this.result = response.data.recipes;
			console.log(this.result)
		}
		catch (error) {
			alert('wrong url or data')
		}
	}

}


