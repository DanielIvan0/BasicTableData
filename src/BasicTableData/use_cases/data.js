export async function populate() {
	this._reset();

	return this._populate();
}

export function reset() { return this._reset(); }