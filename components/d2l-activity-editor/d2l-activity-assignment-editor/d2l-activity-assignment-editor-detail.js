import 'd2l-inputs/d2l-input-text.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SirenFetchMixinLit } from 'siren-sdk/src/mixin/siren-fetch-mixin-lit.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AssignmentEditorDetail extends SirenFetchMixinLit(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_name: { type: String },
		};
	}

	static get styles() {
		return [labelStyles, css`
			:host {
				display: inline-block;
				padding: 20px;
			}
			:host([hidden]) {
				display: none;
			}
		`];
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
		}
	}

	_saveName(e) {
		if (super._entity.canEditName()) {
			const action = super._entity.getSaveNameAction();
			const fields = [{ 'name': 'name', 'value': e.target.value }];
			this._performSirenAction(action, fields);
		}
	}

	_saveNameOnInput(e) {
		this._debounceJob = Debouncer.debounce(this._debounceJob,
			timeOut.after(500), () => this._saveName(e));
	}

	render() {
		return html`
			<div id="assignment-name-container">
				<label class="d2l-label-text" for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
					id="assignment-name"
					value="${this._name}"
					@change="${this._saveName}"
					@input="${this._saveNameOnInput}"
					aria-label="${this.localize('name')}"
					?disabled="${!super._entity.canEditName()}"
					prevent-submit>
				</d2l-input-text>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
