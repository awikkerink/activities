export const ActivityEditorContainerMixin = superclass => class extends superclass {

	constructor() {
		super();
		this.addEventListener('d2l-activity-editor-connected', this._registerEditor);
		this.addEventListener('d2l-activity-editor-save', this._save);
		this._editors = new Set();
		this._returnUrl = null;
	}

	_registerEditor(e) {
		this._editors.add(e.detail.editor);
		if (e.detail.editor.returnUrl) {
			this._returnUrl = e.detail.editor.returnUrl;
		}
		e.detail.container = this;
		e.stopPropagation();
	}

	unregisterEditor(editor) {
		this._editors.delete(editor);
	}

	async _save() {
		const validations = [];
		for (const editor of this._editors) {
			validations.push(editor.validate());
		}

		try {
			await Promise.all(validations);
		} catch (e) {
			// Skip save on vaidation error
			return;
		}

		for (const editor of this._editors) {
			// TODO - Once we decide how we want to handle errors we may want to add error handling logic
			// to the save
			await editor.save();
		}

		if (this._returnUrl) {
			window.open(this._returnUrl, "_self");
		}
	}

};
