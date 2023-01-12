export function setNumberOfRows(numberOfRows) {
	if (!this._validateNumberOfRows(numberOfRows)) throw new Error('Invalid number of rows.');

	this._setNumberOfRows(numberOfRows);
}

export function setCurrentPage(page) {
	if (!this._validatePage(page)) throw new Error('Invalid page.');

	this._setCurrentPage(page);
}