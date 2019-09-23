import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import 'd2l-inputs/d2l-input-text.js';

class AssignmentEditorDetail extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_name: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
				padding: 20px;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('./lang/en.js');
					break;
			}

			if (translations && translations.assignment) {
				return {
					language: lang,
					resources: translations.assignment
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
		this.name = 'Untitled';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (assignment) {
			this._name = assignment.name();

			if (assignment.canEditName()) {
				this.shadowRoot.getElementById('assignment-name').removeAttribute('disabled', '');
			} else {
				this.shadowRoot.getElementById('assignment-name').setAttribute('disabled', '');
			}
		}
	}

	_saveName() {

	}

	_saveNameOnInput() {

	}

	render() {
		return html`
			<div id="assignment-name-container">
				<label for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
					id="assignment-name"
					value="${this._name}"
					on-change="${this._saveName()}"
					on-input="${this._saveNameOnInput()}"
					aria-label="${this.localize('name')}"
					prevent-submit>
				</d2l-input-text>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
