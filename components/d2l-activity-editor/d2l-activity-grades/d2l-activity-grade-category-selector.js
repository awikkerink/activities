import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from '../state/activity-store.js';

class ActivityGradeCategorySelector extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {
	static get properties() {
		return {};
	}

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-label-text {
				display: block;
			}
			#d2l-activity-grade-category-selector {
				margin-top: 1rem;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	_setSelected() {
	}

	render() {
		const gradeCategories = [{name: 'test category', value: 123}] //temporary.

		return html`
			<div id="d2l-activity-grade-category-selector">
				<label class="d2l-label-text">${this.localize('newGradeItemCategory')}</label>
				<select
					id="grade-categories"
					class="d2l-input-select"
					@change="${this._setSelected}"
					>
					${gradeCategories.map(gc => html`
						<option value="${gc.value}">
							${gc.name}
						</option>`)};
				</select>
			<div>
		`;
	}
}

customElements.define('d2l-activity-grade-category-selector', ActivityGradeCategorySelector);

						
						
	