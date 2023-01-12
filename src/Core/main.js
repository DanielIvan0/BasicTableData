import * as data from "./use_cases/data.js";
import * as filters from "./use_cases/filters.js";
import * as sorters from "./use_cases/sorters.js";
import * as getters from "./use_cases/getters.js";
import * as setters from "./use_cases/setters.js";
import * as utils from "./use_cases/utils.js";

class BasicTableDataCore {
	constructor(config) {
		const { columnsEntries, populateFunction, numberOfRows } = config;

		this._columnsEntries = columnsEntries;
		
		this._filter = {
			mainKeyword: '',
			fieldKeywords: {},
		};
		
		this._sorter = {
			sortableFields: {},
			field: null,
			sortTypes: [ 'string', 'numeric' ],
		};
		
		this._getData = populateFunction;
		this._rawData = [];
		this._data = [];

		this._numberOfRows = numberOfRows;
		this._numberOfPages = 1;
		this._currentPage = 1;
	}
}

const methods = {
	...data,
	...filters,
	...sorters,
	...setters,
	...getters,
	...utils,
};

for (const key in methods) BasicTableDataCore.prototype[key] = methods[key];

export default BasicTableDataCore;