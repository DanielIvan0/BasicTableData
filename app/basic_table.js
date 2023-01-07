class BasicTableData {
	constructor(config) {
		const { columns, populateFunction, nRows } = config;

		this.columns = columns;
		this.columnsEntries = Object.entries(columns);
		this.getData = populateFunction;

		this.data = [];

		this.nRows = nRows;
		this.totalRecords = 0;
		this.nPages = 1;
		this.currentPage = 1;
	}

	async populate() {
		const { data } = await this.getData();

		this.totalRecords = data.length;
		this.nPages = Math.ceil(data.length / this.nRows);

		this.saveData(data);
	}

	getPage(page) {
		const { i, limit } = this.getPageIndex(page);

		this.currentPage = page;

		return this.data.slice(i, limit);
	}

	saveData(rawData) {
		rawData.forEach(row => {
			const record = {};

			this.columnsEntries.forEach(([ field, config ]) => {
				const apiField = field;
				const recordField = config.prop;

				const value = row.hasOwnProperty(apiField) ? row[apiField] : config.default;

				if (!config.hasOwnProperty('normalizer')) record[field] = value;
				else record[field] = config.normalizer(value);
			});

			this.data.push(record);
		});
	}

	async reset() {
		this.data.splice(0, this.data.length);
		
		this.nPages = 1;
		this.currentPage = 1;
		this.totalRecords = 0;
	}

	getPageIndex(page) {
		return {
			i: (page - 1) * this.nRows,
			limit: page * this.nRows,
		};
	}
}