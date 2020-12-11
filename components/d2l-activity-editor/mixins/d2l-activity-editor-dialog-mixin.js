export const ActivityEditorDialogMixin = superclass => class extends superclass {

	static get properties() {
		return {
			_opened: { type: Boolean }
		};
	}

	constructor() {
		super();
		this._opened = false;
	}

	_handleClose() {
		this._opened = false;
	}

	_open() {
		this._opened = true;
	}
};
