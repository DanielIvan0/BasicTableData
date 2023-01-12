export function _getPage(page) {
	this._currentPage = page;
	
	const { i, limit } = this._getPageIndex(page);
	
	const slice = this._data.slice(i, limit);

	return slice.filter(Boolean);
}

export function _getPageIndex(page) {
	return {
		i: (page - 1) * this._numberOfRows,
		limit: page * this._numberOfRows,
	};
}