class LazyTableCore {
	constructor(config) {
		const { populateFunction, nRows, columns } = config;

		this._columns = columns;
		this._columnsEntries = Object.entries(columns);

		// if (!columns.hasOwnProperty('id')) throw new Error('columns debe tener un id...');
		this.order = columns.id;

		this._getData = populateFunction;
		this._nRows = nRows;
		
		this._nPages = 1;
		this._totalRecords = 0;
		this._data = [];
	}
	
	async _populatePage(page) {
		const { data, total } = await this._getData(page, this._nRows);

		this._totalRecords = total;
		this._nPages = Math.ceil(total / this._nRows) || 1;

		this._saveData(data);
	}

	_getPage(page) {
		const { i, limit: j } = this._getPageIndex(page);

		return this._data.slice(i, j);
	}

	_saveData(page, data) {
		const pageData = [];

		data.forEach(row => {
			const record = {};

			this._columnsEntries.forEach(([ field, config ]) => {
				if (config.hasOwnProperty('prop')) field = config.prop;

				const value = row.hasOwnProperty(field) ? row[field] : config.default;

				if (!config.hasOwnProperty('normalizer')) record[field] = value;
				else record[field] = config.normalizer(value);
			});

			pageData.push(record);
		});

		const { i: firstRecordIndex } = this._getPageIndex(page);
		for (let i = 0; i < this._nRows; i ++) {
			const index = firstRecordIndex + i;

			this._data[index] = pageData[i];
		}
	}
	
	_pageIsAvailable(page) {
		let { i, limit } = this._getPageIndex(page);

		for (i; i < limit; i ++) {
			if (this._data[i] === undefined) return false;
		}

		return true;
	}

	_getPageIndex(page) {
		return {
			i: (page - 1) * this._nRows,
			limit: page * this._nRows,
		};
	}

	_dropData() {
		this._data.splice(0, this._data.length);
		this._nPages = 1;
	}

	_setNRows(n) {
		this._nRows = n;
		this._nPages = Math.ceil(this._totalRecords / this.nRows);
	}
}