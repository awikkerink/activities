import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizDisableRightClickEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			checkboxStyles,
			css`
				d2l-input-checkbox {
					margin-top: 0.8em;
					padding-right: 0;
				}

				.d2l-checkbox-container {
					display: flex;
					align-items: center;
					height: 1.2rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			<d2l-input-checkbox-spacer
				class="d2l-body-small">
			</d2l-input-checkbox-spacer>

			<div class="d2l-checkbox-container">
				<d2l-input-checkbox
					?checked="${entity.isDisableRightClickEnabled}"
					@change="${this._setDisableRightClick}"
					ariaLabel="${this.localize('disableRightClickDescription')}"
					?disabled="${!entity.canEditDisableRightClick}">
				</d2l-input-checkbox>

				<label class="d2l-input-checkbox-text d2l-body-small">${this.localize('disableRightClickDescription')}</label>

				<d2l-button-icon
					text="${this.localize('disableRightClickAccessibleHelpText')}"
					icon="tier1:help"
					@click="${this.open}">
				</d2l-button-icon>
			</div>

		`;
	}

	_setDisableRightClick(event) {
		const entity = store.get(this.href);
		entity.setDisableRightClick(event.target.checked);
	}
}

customElements.define(
	'd2l-activity-quiz-disable-right-click-editor',
	ActivityQuizDisableRightClickEditor
);
