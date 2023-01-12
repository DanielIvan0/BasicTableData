export function _setNumberOfRows(numberOfRows) {
	const { first: firstRecordIndex } = this._getPageIndex(this._currentPage);
	const proportionality = firstRecordIndex / this._data.length;

	this._numberOfRows = numberOfRows;
	this._numberOfPages = Math.ceil(this._data.length / this.numberOfRows);
	this._currentPage = Math.ceil(proportionality * this._numberOfPages);
}

export function _setCurrentPage(page) { this._currentPage = page; }