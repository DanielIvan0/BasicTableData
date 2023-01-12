export function sortByField(field) {
	if (typeof field !== 'string') throw new Error('Variable field must be string type.');
	if (!this._sorter.sortableFields.hasOwnProperty(field)) throw new Error(`${field} must be specified as a sortable field.`);

	this._sortByField(field);
	this._applyFilters();
}

export function reverse() {
	this._reverse();
	this._applyFilters();
}