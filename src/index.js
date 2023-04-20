import BasicTableData from "./BasicTableData/main.js";

const baseUrl = new URL('https://dummyjson.com/products');
const populateFunction = async () => {
	const url = baseUrl.href;
	const response = await fetch(url);

	const data = await response.json();

	const { products } = data;

	return products;
};

let i = 1;
const currentTime = new Date().getTime();
const columns = {
	folio: {
		prop: 'id',
		default: '0',
		sortable: true,
		type: 'numeric',
	},
	name: {
		prop: 'title',
		sortable: true,
		type: 'string',
		normalizer: str => str.toUpperCase(),
	},
	description: {
		header: 'Descripción',
	},
	price: {
		sortable: true,
		type: 'numeric',
		get(price) {
			console.log(price);

			return price.toFixed(2);
		}
	},
	date: {
		sortable: true,
		type: 'date',
		normalizer: () => {
			const proportion = (i % 100) / 100;
			const time = currentTime * proportion;
			const date = new Date(time);

			i ++;

			return date;
		},
		get(date) {
			console.dir(date);
			return date.toLocaleString();
		}
	},
};

const numberOfRows = 10;

const config = {
	columns,
	populateFunction,
	numberOfRows,
};

const table = new BasicTableData(config);

table.init().then(() => {
	const data1 = table.getPage();
	console.table(data1);

	table.sortByField('date');

	const data2 = table.getPage();
	console.table(data2);

	table.sortByField('date');

	const data3 = table.getPage();
	console.table(data3);
});