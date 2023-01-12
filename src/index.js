import BasicTableData from "./BasicTableData/main.js";

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
		sortable: true,
		type: 'numeric',
	},
	name: {
		header: 'Artículo',
		prop: 'title',
		sortable: true,
		type: 'string',
		normalizer: str => str.toUpperCase(),
	},
	description: {
		header: 'Descripción',
	},
	price: {
		header: 'Precio',
		sortable: true,
		type: 'numeric',
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

table.init();

console.log(table);