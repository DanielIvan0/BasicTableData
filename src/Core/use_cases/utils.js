export function _validatePage(page) {
	return (
		Number.isInteger(page) &&
		page >= 1 &&
		page <= this._numberOfPages
	);
}

export function _validateNumberOfRows(numberOfRows) {
	return (
		Number.isInteger(numberOfRows) &&
		numberOfRows >= 1
	);
}

export function _updatePagesProps() {
	const numberOfRecords = this._data.length;

	this._numberOfPages = Math.ceil(numberOfRecords / this._numberOfRows) || 1;
	this._currentPage = 1;
}