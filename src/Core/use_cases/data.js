export async function _populate() {
	const data = await this._getData();

	this._saveData(data);

	this._updatePagesProps();
}

export function _saveData(rawData) {
	const data = rawData.map(row => {
		const record = {};

		this._columnsEntries.forEach(([field, config]) => {
			const { prop = field } = config;
			const value = row.hasOwnProperty(prop) ? row[prop] : config.default;

			record[field] = config.hasOwnProperty('normalizer') ? config.normalizer(value) : value;
		});

		return record;
	});

	this._rawData.splice(0, this._rawData.length, ...data);
	this._data.splice(0, this._data.length, ...data);
}

export function _reset() {
	this._rawData.splice(0, this._rawData.length);
	this._data.splice(0, this._data.length);

	this._clearFilters();
	this._clearSorter();

	this._numberOfPages = 1;
	this._currentPage = 1;
}