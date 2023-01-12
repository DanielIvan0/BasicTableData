export function _sortByField(field) {
	if (field === this._sorter.field) return this._reverse();
	
	this._sorter.field = field;

	const { [field]: type } = this._sorter.sortableFields;
	switch (type) {
		case 'numeric':
			this._numericSort();
			break;
		default:
			this._stringSort();
	}
}

export function _numericSort () {
	const { field } = this._sorter;

	this._rawData.sort((record1, record2) => {
		const { [field]: num1 } = record1;
		const { [field]: num2 } = record2;
	
		return parseFloat(num1) - parseFloat(num2);
	});
}

export function _stringSort() {
	const { field } = this._sorter;
	
	this._rawData.sort((record1, record2) => {
		const { [field]: str1 } = record1;
		const { [field]: str2 } = record2;
	
		const upperStr1 = String(str1).toUpperCase();
		const upperStr2 = String(str2).toUpperCase();
	
		return upperStr1.localeCompare(upperStr2);
	});
}

export function _applySorter() {
	const { field } = this._sorter;

	this._sorter.field = null;
	this._sortByField(field);
}

export function _reverse() { this._rawData.reverse(); }

export function _clearSorter() { this._sorter.field = null; }