import { LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

function initActivity(entity) {
	return {
		dueDate: entity.dueDate(),
	}
}

export const ActivityEditorMixin = superclass => class extends superclass {

	static get properties() {
		return {
			_activity: { type: Object }
		};
	}

	_onActivityChange(entity) {
		this._activityEntity = entity;
		this._activity = initActivity(entity);
	}

	_update(e) {
		this._activity = Object.assign({}, this._activity);
		this._activity[e.detail.prop] = e.detail.value;
	}

	async _saveActivity() {
		return this._activityEntity.update(this._activity);
	}
}
