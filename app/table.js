class Table {
	constructor(config) {
		const { columns, pages, controllers, container } = config;

		// columns
		this.columns = columns;
		this.columnsEntries = Object.entries(columns);
		
		// data
		this._getData = pages.populateFunction;
		this.data = [];
	
		// pages
		this.nRows = pages.nRows;
		this.nPages = null;
		this.currentPage = null;
	}
	async init() {
		await this._populatePage(1);
		
		if (this.nPages) this.currentPage = 1;
		else throw new Error('data not available');
	}

	// flexible getters
	getRecord(index) { return this.data.at(index); }
	
	getNext() {
		if (this.currentPage === this.nPages) return this.getPage(1);

		return this.getPage(this.currentPage + 1);
	}

	getPrevious() {
		if (this.currentPage <= 1) return this.getLast();

		return this.getPage(this.currentPage - 1);
	}

	getLast() {
		return this.getPage(this.nPages);
	}

	// validates and retrieve data
	getPage(page = this.currentPage) {
		if (!Number.isInteger(page)) throw new TypeError('page debe ser tipo int.');
		if (page < 1 || page > this.nPages) throw new Error('page fuera de rango.');

		return this._getPage(page);
	}

	populatePage(page) {
		if (!Number.isInteger(page)) throw new TypeError('page debe ser tipo int positivo.');
		if (page < 1 || page > this.nPages) throw new Error('page fuera de rango');
		if (this._dataIsStored(page)) return;

		return this._populatePage(page);
	}

	// use cases
	async _getPage(page) {
		if (!this._dataIsStored(page)) await this._populatePage(page);

		this.currentPage = page;
		
		const { i, limit: j } = this._getPageIndex(page);

		return this.data.slice(i, j);
	}
	
	async _populatePage(page) {
		const { data, total } = await this._getData(page, this.nRows);
	
		this.nPages = Math.ceil(total / this.nRows);

		this._saveData(page, data);
	}

	_getPageIndex(page = this.currentPage) {
		return {
			i: (page - 1) * this.nRows,
			limit: page * this.nRows,
		};
	}

	_dataIsStored(page) {
		let { i, limit } = this._getPageIndex(page);

		for (i; i < limit; i ++) {
			if (this.data[i] === undefined) return false;
		}

		return true;
	}

	_saveData(page, data) {
		const pageData = [];

		data.forEach(row => {
			const record = {};

			this.columnsEntries.forEach(([ field, config ]) => {
				if (config.hasOwnProperty('prop')) field = config.prop;

				let value = row.hasOwnProperty(field) ? row[field] : config.default;

				if (config.hasOwnProperty('normalizer')) value = config.normalizer(value);

				record[field] = value;
			});

			pageData.push(record);
		});

		const { i: firstRecordIndex } = this._getPageIndex(page);
		for (let i = 0; i < this.nRows; i ++) {
			const dataIndex = firstRecordIndex + i;

			this.data[dataIndex] = pageData[i];
		}
	}
}