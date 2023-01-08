// const container = document.querySelector('#container');
// const baseUrl = new URL('https://dummyjson.com/products');

// const init = async (page, pageLimit, fieldSorter) => {
// 	const params = new URLSearchParams();
// 	params.append('limit', pageLimit);
// 	params.append('skip', (page - 1) * pageLimit);

// 	const url = `${baseUrl.href}?${params.toString()}`;
// 	const response = await fetch(url);

// 	const data = await response.json();

// 	const { products, total } = data;

// 	return { data: products, total };
// };

// const columns = {
// 	id: {
// 		prop: 'folio',
// 		default: '0',
// 	},
// 	name: {
// 		header: 'Artículo',
// 		prop: 'title',
// 		// default: '',
// 		normalizer: str => str.toUpperCase(),
// 	},
// 	description: {
// 		sortable: true,
// 		header: 'Descripción',
// 	},
// 	price: {
// 		header: 'Precio',
// 		normalizer: price => price.toFixed(2),
// 	},
// 	stock: {
// 		header: 'Stock',
// 	}
// };

// const pages = {
// 	nRows: 10, // Records per page
// 	populateFunction: init,
// };

// // const controllers = {
// 	// pagination: {
// 	// 	previous: 'Al anterior',
// 	// }
// // };

// const config = {
// 	container,
// 	columns,
// 	pages,
// 	// controllers,
// };

// const table = new Table(config);

// table.init();

const baseUrl = new URL('https://dummyjson.com/products');
const populateFunction = async () => {
	const url = baseUrl.href;
	const response = await fetch(url);

	const data = await response.json();

	const { products } = data;

	return products;
};

const columns = {
	folio: {
		prop: 'id',
		default: '0',
	},
	name: {
		header: 'Artículo',
		prop: 'title',
		// default: '',
		normalizer: str => str.toUpperCase(),
	},
	description: {
		sortable: true,
		header: 'Descripción',
	},
	price: {
		header: 'Precio',
		normalizer: price => price.toFixed(2),
	},
	stock: {
		header: 'Stock',
	}
};

const numberOfRows = 10;

const config = {
	columns,
	populateFunction,
	numberOfRows,
};

const table = new BasicTableData(config);

table.populate().then(() => console.dir(table.data));