export function _getPage(page) {
	this._currentPage = page;
	
	const { i, limit } = this._getPageIndex(page);
	
	const slice = this._data.slice(i, limit)
		.filter(Boolean)
		.map(row => ({ ...row }));

	for (const key in this._getters) {
		const { [key]: getter } = this._getters;

		slice.forEach(row => {
			const value = row[key];

			row[key] = getter(value);
		});
	}

	return slice;
}

export function _getPageIndex(page) {
	return {
		i: (page - 1) * this._numberOfRows,
		limit: page * this._numberOfRows,
	};
}