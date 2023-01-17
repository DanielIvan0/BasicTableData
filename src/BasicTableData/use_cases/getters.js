export function getPage(page = this._currentPage) {
	if (!this._validatePage(page)) throw new Error('Invalid page.');

	return this._getPage(page);
}

export function getNextPage() { return this.getPage(this._currentPage + 1); }

export function getPreviousPage() { return this.getPage(this._currentPage - 1); }

export function getLastPage() { return this.getPage(this._numberOfPages); }

export function getFirstPage() { return this.getPage(1); }

export function getData() { return this._data; }

export function getRawData() { return this._rawData; }

export function getRecord(index) {
	if (!Number.isInteger(index)) throw new Error('Record index must be a integer.');

	return this._data.at(index);
}

export function getRecordFromRawData(index) {
	if (!Number.isInteger(index)) throw new Error('Record index must be a integer.');

	return this._rawData.at(index);
}

export function getPageIndex(page = this._currentPage) {
	if (!this._validatePage(page)) throw new Error('Invalid page.');

	const { i, limit: lastIndex } = this._getPageIndex(page);

	return {
		firstIndex: i + 1,
		lastIndex: page === this.getNumberOfPages() ? this.getNumberOfRecords() : lastIndex,
	};
}

export function getNumberOfRecords() { return this._data.length; }

export function getNumberOfRawRecords() { return this._rawData.length; }

export function getNumberOfPages() { return this._numberOfPages; }

export function getCurrentPage() { return this._currentPage; }