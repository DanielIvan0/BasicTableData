export function setNumberOfRows(numberOfRows) {
	if (!this._validateNumberOfRows(numberOfRows)) throw new Error('Invalid number of rows.');

	return this._setNumberOfRows(numberOfRows);
}

export function setCurrentPage(page) {
	if (!this._validatePage(page)) throw new Error('Invalid page.');

	return this._setCurrentPage(page);
}