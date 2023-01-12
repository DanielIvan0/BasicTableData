import BasicTableDataCore from "../Core/main.js";
import * as data from "./use_cases/data.js";
import * as filters from "./use_cases/filters.js";
import * as sorters from "./use_cases/sorters.js";
import * as getters from "./use_cases/getters.js";
import * as setters from "./use_cases/setters.js";
import * as errors from "./use_cases/errors.js";

class BasicTableData extends BasicTableDataCore {
	constructor(config) {
		const { columns, populateFunction, numberOfRows } = config;

		if (typeof columns !== 'object' || columns === null) throw new Error('columns must be an object.'); 
		const columnsEntries = Object.entries(columns);

		if (typeof populateFunction !== 'function') throw new Error('populateFunction must be a function.');

		if (!Number.isInteger(numberOfRows)) throw new Error('numberOfRows must be an integer.');
		if (numberOfRows < 1) throw new Error('numberOfRows must be more than 1.');

		super({ columnsEntries, populateFunction, numberOfRows });

		this._columns = columns;
	}

	init() {
		const { sortTypes } = this._sorter;
		this._columnsEntries.forEach(([ field, config ]) => {
			const { sortable, type } = config;
	
			if (sortable === true) {
				if (!sortTypes.includes(type)) throw new Error(`${type} is not a valid sort type.`);
	
				this._sorter.sortableFields[field] = type;
			}
		});

		this.populate();
	}
};

const methods = {
	...data,
	...filters,
	...sorters,
	...setters,
	...getters,
	...errors,
};

for (const key in methods) BasicTableData.prototype[key] = methods[key];

export default BasicTableData;