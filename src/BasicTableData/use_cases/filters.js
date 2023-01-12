export function filterByKeyword(keyword) {
	if (typeof keyword !== 'string') throw new Error('Keyword must be a string.');

	this._filterByKeyword(keyword.trim());
}

export function filterByField(field, keyword) {
	if (!this._columns.hasOwnProperty(field)) throw new Error('Unrecognised field.');
	if (typeof keyword !== 'string') throw new Error('Keyword must be a string.');

	this._filterByField(field, keyword.trim());
}