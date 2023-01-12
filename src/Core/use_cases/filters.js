export function _filterByKeyword(keyword) {
	this._filter.mainKeyword = !!keyword.length ? keyword.toUpperCase() : null;

	this._applyFilters();
}

export function _filterByField(field, keyword) {
	if (keyword.length) this._filter.fieldKeywords[field] = keyword.toUpperCase();
	else delete this._filter.fieldKeywords[field];
	
	this._applyFilters();
}

export function _applyFilters() {
	const { mainKeyword, fieldKeywords } = this._filter;
	
	const filteredData = this._rawData.filter(record => {
		const keywordMatch = this._columnsEntries.some(([ field, ]) => {
			// const value = String(record[field]).toUpperCase();

			// if (mainKeyword && value.includes(mainKeyword)) return true;

			// const { [field]: fieldKeyword } = fieldKeywords;

			// return !!fieldKeyword && value.includes(fieldKeyword);
			const value = String(record[field]).toUpperCase();
			const { [field]: fieldKeyword } = fieldKeywords;

			const mainMatch = mainKeyword ? value.includes(mainKeyword) : true;
			const fieldMatch = fieldKeyword ? value.includes(fieldKeyword) : false;

			return mainMatch && fieldMatch;
		});
		
		return keywordMatch;
	});
	
	this._data.splice(0, this._data.length, ...filteredData);
	this._updatePagesProps();
}

export function _clearFilters() {
	this._filter.mainKeyword = '';
	for (const field in this._filter.fieldKeywords) delete this._filter.fieldKeywords[field];

	this._data.splice(0, this._data.length, ...this._rawData);
}