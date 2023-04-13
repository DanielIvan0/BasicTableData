export async function populate() {
	this._reset();

	return this._populate(...arguments);
}

export function reset() { return this._reset(); }