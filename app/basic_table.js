class BasicTableData {
	constructor(config) {
		const { columns, populateFunction, numberOfRows } = config;

		this._columns = columns;
		this._columnsEntries = Object.entries(columns);
		this._getData = populateFunction;

		this.data = [];
		this.numberOfRows = numberOfRows;
		this.totalRecords = 0;
		this.numberOfPages = 1;
		this.currentPage = 1;
	}

	populate() {
		if (!!this.data.length) return Promise.resolve();

		return this._populate();
	}
	
	getPage(page) {
		if (!this._validatePage(page)) throw new Error('Invalid page.');

		return this._getPage(page);
	}

	getNext() { return this.getPage(this.currentPage + 1); }

	getPrevious() { return this.getPage(this.currentPage - 1); }

	reset() { return this._reset(); }

	getPageIndex(page) {
		if (!this._validatePage(page)) throw new Error('Invalid page.');

		const { i, limit } = this._getPageIndex(page);

		return { first: i + 1, last: limit };
	}

	setNumberOfRows(numberOfRows) {
		if (!Number.isInteger(numberOfRows)) throw new Error('Invalid number of rows.');


		return this._setNumberOfRows(numberOfRows);
	}
	
	async _populate() {
		const data = await this._getData();
		
		this.totalRecords = data.length;
		this.numberOfPages = Math.ceil(data.length / this.numberOfRows);
		
		this._saveData(data);
	}
	
	_getPage(page) {
		const { i, limit } = this._getPageIndex(page);

		this.currentPage = page;

		const slice = this.data.slice(i, limit);

		return slice.filter(record => !!record);
	}

	_saveData(rawData) {
		this.data.splice(0, this.data.length);

		rawData.forEach(row => {
			const record = {};

			this._columnsEntries.forEach(([ field, config ]) => {
				const { prop = field } = config;
				const value = row.hasOwnProperty(prop) ? row[prop] : config.default;

				record[field] = config.hasOwnProperty('normalizer') ? config.normalizer(value) : value;
			});

			this.data.push(record);
		});
	}

	_reset() {
		this.data.splice(0, this.data.length);
		
		this.numberOfPages = 1;
		this.currentPage = 1;
		this.totalRecords = 0;
	}

	_getPageIndex(page) {
		return {
			i: (page - 1) * this.numberOfRows,
			limit: page * this.numberOfRows,
		};
	}

	_validatePage(page) {
		return (
			Number.isInteger(page) &&
			page >= 1 &&
			page <= this.numberOfPages
		);
	}

	_setNumberOfRows(numberOfRows) {
		const { first: firstRecordIndex } = this.getPageIndex(this.currentPage);
		const proportionality = (firstRecordIndex / this.data.length);

		this.numberOfRows = numberOfRows;
		this.numberOfPages = Math.ceil(this.data.length / this.numberOfRows);
		this.currentPage = Math.ceil(proportionality * (this.numberOfPages));
	}
}