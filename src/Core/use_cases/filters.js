export function _filterByKeyword(keyword) {
	this._filter.mainKeyword = keyword.toUpperCase();

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
		const keywordMatch = this._columnsEntries.every(([ field, ]) => {
			const value = String(record[field]).toUpperCase();
			
			if (!value.includes(mainKeyword)) return false;

			const { [field]: fieldKeyword = '' } = fieldKeywords;
			
			return value.includes(fieldKeyword);
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